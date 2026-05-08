"use server";

import { db } from "@/lib/db";

export async function getProducts(params?: {
  category?: string;
  search?: string;
  sort?: "price_asc" | "price_desc" | "newest";
  page?: number;
  limit?: number;
}) {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 12;
  const skip = (page - 1) * limit;

  const where = {
    status: "PUBLISHED" as const,
    ...(params?.category && { category: { slug: params.category } }),
    ...(params?.search && {
      name: { contains: params.search },
    }),
  };

  const orderBy =
    params?.sort === "price_asc"
      ? { price: "asc" as const }
      : params?.sort === "price_desc"
      ? { price: "desc" as const }
      : { created_at: "desc" as const };

  const [products, total] = await Promise.all([
    db.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: { category: true },
    }),
    db.product.count({ where }),
  ]);

  return { 
    products: products.map(p => ({ ...p, price: Number(p.price) })), 
    total, 
    page, 
    limit, 
    totalPages: Math.ceil(total / limit) 
  };
}

export async function getProductBySlug(slug: string) {
  const product = await db.product.findUnique({
    where: { slug },
    include: {
      category: true,
      variants: true,
      reviews: {
        where: { approved: true },
        include: { user: { select: { full_name: true } } },
        orderBy: { created_at: "desc" },
        take: 10,
      },
    },
  });

  if (!product) return null;

  return {
    ...product,
    price: Number(product.price)
  };
}

export async function getCategories() {
  return db.category.findMany({ orderBy: { name: "asc" } });
}

export async function getFeaturedProducts() {
  const products = await db.product.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { created_at: "desc" },
    take: 8,
    include: { category: true },
  });
  
  return { 
    products: products.map(p => ({ ...p, price: Number(p.price) })) 
  };
}
