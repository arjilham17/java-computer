import { db } from "@/lib/db";
import { getCategories } from "@/actions/products";
import ProductForm from "../ProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    db.product.findUnique({
      where: { id },
      include: { variants: true }
    }),
    getCategories()
  ]);

  if (!product) {
    notFound();
  }

  // Serialize product decimal fields
  const serializedProduct = {
    ...product,
    price: Number(product.price)
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl uppercase mb-2">Edit Produk</h1>
        <p className="text-muted-foreground text-sm">Perbarui informasi produk {product.name}.</p>
      </div>

      <ProductForm initialData={serializedProduct} categories={categories} />
    </div>
  );
}
