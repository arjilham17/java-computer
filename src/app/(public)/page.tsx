import Link from "next/link";
import { getFeaturedProducts, getCategories } from "@/actions/products";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const [featuredResult, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);
  const products = featuredResult.products;

  return (
    <div>
      {/* Hero */}
      <section className="border-b-2 border-foreground bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">
              Toko Komputer Terpercaya
            </p>
            <h1 className="font-heading text-5xl md:text-7xl leading-none uppercase mb-6">
              Upgrade Your Setup.
            </h1>
            <p className="text-background/70 text-lg mb-8 max-w-md leading-relaxed">
              Laptop, PC, sparepart, monitor, dan aksesoris komputer terbaik. Harga kompetitif, garansi resmi.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/products" className="px-6 py-3 bg-secondary text-white text-sm font-bold uppercase tracking-widest hover:bg-red-700 transition-colors border-2 border-secondary">
                Lihat Produk
              </Link>
              <Link href="/categories" className="px-6 py-3 text-background text-sm font-bold uppercase tracking-widest hover:bg-background hover:text-foreground transition-colors border-2 border-background">
                Kategori
              </Link>
            </div>
          </div>

          {/* Hero right — placeholder visual */}
          <div className="hidden md:flex h-64 border-2 border-background/20 items-center justify-center text-background/30 font-heading text-xl uppercase">
            Hero Visual
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="border-b-2 border-foreground">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-6">Kategori</p>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  className="px-4 py-2 border-2 border-border text-xs font-bold uppercase tracking-widest hover:border-foreground hover:bg-muted transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <p className="font-heading text-3xl uppercase">Produk Terbaru</p>
          <Link href="/products" className="text-xs font-bold uppercase tracking-widest hover:text-secondary transition-colors">
            Lihat Semua →
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="border-2 border-dashed border-border py-24 text-center text-muted-foreground">
            <p className="font-bold uppercase tracking-widest">Belum ada produk</p>
            <p className="text-sm mt-1">Tambahkan produk melalui dashboard Admin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 border-l-2 border-t-2 border-foreground">
            {products.map((product) => (
              <div key={product.id} className="border-r-2 border-b-2 border-foreground">
                <ProductCard product={product as any} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
