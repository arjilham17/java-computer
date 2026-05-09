import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
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
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="h-[80vh] relative w-full overflow-hidden bg-foreground flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-foreground z-20 [mask-image:radial-gradient(transparent,black)] pointer-events-none" />

        <Boxes />
        
        <div className="relative z-30 text-center px-4 max-w-5xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-secondary mb-6">
            Java Computer — Est. 2024
          </p>
          <h1 className="font-heading text-5xl md:text-8xl text-background mb-8 uppercase leading-[1.05] tracking-[-0.03em]">
            Upgrade Your <br /> 
            <span className="text-secondary italic">Digital Setup</span>
          </h1>
          <p className="text-center mt-2 text-background/70 max-w-xl mx-auto mb-12 text-lg font-medium leading-relaxed">
            Laptop, PC, sparepart, monitor, dan aksesoris komputer terbaik. 
            Harga kompetitif, garansi resmi.
          </p>
          
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/products" className="px-10 py-4 bg-background text-foreground text-sm font-bold uppercase tracking-[0.06em] hover:bg-secondary hover:text-white transition-all border-2 border-background">
              Lihat Produk
            </Link>
            <Link href="/about" className="px-10 py-4 text-background text-sm font-bold uppercase tracking-[0.06em] hover:bg-background hover:text-foreground transition-all border-2 border-background/30">
              Tentang Kami
            </Link>
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
                  className="px-4 py-2 border-2 border-border text-xs font-bold uppercase tracking-widest hover:border-foreground hover:bg-muted transition-colors text-foreground"
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
