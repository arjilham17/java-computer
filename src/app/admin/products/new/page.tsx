import { getCategories } from "@/actions/products";
import ProductForm from "../ProductForm";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl uppercase mb-2">Tambah Produk</h1>
        <p className="text-muted-foreground text-sm">Buat produk baru di katalog Java Computer.</p>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
