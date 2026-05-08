"use server";

import { db } from "@/lib/db";

export async function getAdminStats() {
  const [
    productCount,
    orderCount,
    userCount,
    revenue,
    recentOrders
  ] = await Promise.all([
    db.product.count(),
    db.order.count(),
    db.user.count(),
    db.order.aggregate({
      where: { payment_status: "PAID" },
      _sum: { total_price: true }
    }),
    db.order.findMany({
      orderBy: { created_at: "desc" },
      take: 5,
      include: { user: { select: { full_name: true } } }
    })
  ]);

  return {
    productCount,
    orderCount,
    userCount,
    totalRevenue: Number(revenue._sum.total_price || 0),
    recentOrders: recentOrders.map(o => ({ ...o, total_price: Number(o.total_price) }))
  };
}

export async function createProduct(data: any) {
  const product = await db.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      brand: data.brand,
      price: Number(data.price),
      stock: Number(data.stock),
      discount: Number(data.discount),
      image: data.image,
      status: data.status,
      category_id: data.category_id,
      variants: {
        create: data.variants
      }
    }
  });

  return { ...product, price: Number(product.price) };
}

export async function updateProduct(id: string, data: any) {
  const product = await db.product.update({
    where: { id },
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      brand: data.brand,
      price: Number(data.price),
      stock: Number(data.stock),
      discount: Number(data.discount),
      image: data.image,
      status: data.status,
      category_id: data.category_id,
    }
  });

  return { ...product, price: Number(product.price) };
}

export async function deleteProduct(id: string) {
  return db.product.delete({ where: { id } });
}

export async function getOrders() {
  const orders = await db.order.findMany({
    include: {
      user: { select: { full_name: true, email: true } },
      items: { include: { product: { select: { name: true } } } }
    },
    orderBy: { created_at: "desc" }
  });

  return orders.map(o => ({ ...o, total_price: Number(o.total_price) }));
}

export async function updateOrderStatus(id: string, payment_status: any, shipping_status: any) {
  return db.order.update({
    where: { id },
    data: { payment_status, shipping_status }
  });
}


