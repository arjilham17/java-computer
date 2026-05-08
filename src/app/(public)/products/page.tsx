import { getProducts, getCategories } from "@/actions/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

type PageProps = {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: "price_asc" | "price_desc" | "newest";
    page?: string;
  }>;
};

export const metadata = {
  title: "Produk | Java Computer",
  description: "Temukan laptop, PC, sparepart, dan aksesoris komputer terbaik.",
};

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const [{ products, total, totalPages }, categories] = await Promise.all([
    getProducts({
      category: params.category,
      search: params.search,
      sort: params.sort,
      page,
    }),
    getCategories(),
  ]);

  const sortOptions = [
    { label: "Terbaru", value: "newest" },
    { label: "Harga Terendah", value: "price_asc" },
    { label: "Harga Tertinggi", value: "price_desc" },
  ];

  const buildUrl = (overrides: Record<string, string | undefined>) => {
    const p = { ...params, ...overrides };
    const q = new URLSearchParams();
    Object.entries(p).forEach(([k, v]) => v && q.set(k, v));
    return `/products?${q.toString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="border-b-2 border-foreground pb-6 mb-8">
        <h1 className="font-heading text-4xl md:text-5xl uppercase mb-2">Semua Produk</h1>
        <p className="text-muted-foreground text-sm">{total} produk ditemukan</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-56 shrink-0">
          <div className="border-2 border-foreground p-4 sticky top-20">
            <p className="text-xs font-bold uppercase tracking-widest mb-4 pb-2 border-b border-border">
              Kategori
            </p>
            <ul className="space-y-1">
              <li>
                <Link
                  href={buildUrl({ category: undefined, page: undefined })}
                  className={`block text-sm py-1 font-bold uppercase tracking-wide hover:text-secondary transition-colors ${
                    !params.category ? "text-secondary" : "text-muted-foreground"
                  }`}
                >
                  Semua
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={buildUrl({ category: cat.slug, page: undefined })}
                    className={`block text-sm py-1 font-bold uppercase tracking-wide hover:text-secondary transition-colors ${
                      params.category === cat.slug ? "text-secondary" : "text-muted-foreground"
                    }`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {sortOptions.map((opt) => (
              <Link
                key={opt.value}
                href={buildUrl({ sort: opt.value, page: undefined })}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest border-2 transition-colors ${
                  (params.sort ?? "newest") === opt.value
                    ? "bg-foreground text-background border-foreground"
                    : "border-border hover:border-foreground"
                }`}
              >
                {opt.label}
              </Link>
            ))}
          </div>

          {/* Grid */}
          {products.length === 0 ? (
            <div className="border-2 border-dashed border-border py-24 text-center text-muted-foreground">
              <p className="font-bold uppercase tracking-widest">Produk tidak ditemukan</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-0 border-l-2 border-t-2 border-foreground">
              {products.map((product) => (
                <div key={product.id} className="border-r-2 border-b-2 border-foreground">
                  <ProductCard product={product as any} />
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={buildUrl({ page: String(p) })}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                    page === p
                      ? "bg-foreground text-background border-foreground"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
