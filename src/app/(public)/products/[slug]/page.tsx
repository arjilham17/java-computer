import { getProductBySlug, getFeaturedProducts } from "@/actions/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import ProductCard from "@/components/ProductCard";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Java Computer`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [product, { products: related }] = await Promise.all([
    getProductBySlug(slug),
    getFeaturedProducts(),
  ]);

  if (!product) notFound();

  const price = Number(product.price);
  const discounted = price * (1 - product.discount / 100);
  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-0 border-2 border-foreground mb-16">
        {/* Image */}
        <div className="relative border-r-2 border-foreground min-h-[400px] bg-muted">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-bold uppercase tracking-widest text-sm">
              No Image
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
            {product.category.name}
          </p>
          <h1 className="font-heading text-3xl md:text-4xl uppercase leading-tight mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          {product.reviews.length > 0 && (
            <p className="text-sm text-muted-foreground mb-4">
              ★ {avgRating.toFixed(1)} ({product.reviews.length} ulasan)
            </p>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6 pb-6 border-b-2 border-foreground">
            <span className="font-heading text-3xl">
              Rp{discounted.toLocaleString("id-ID")}
            </span>
            {product.discount > 0 && (
              <>
                <span className="text-muted-foreground line-through text-lg">
                  Rp{price.toLocaleString("id-ID")}
                </span>
                <span className="bg-secondary text-white text-xs font-bold px-2 py-0.5">
                  -{product.discount}%
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <p className="text-sm mb-4">
            Stok:{" "}
            <span className={`font-bold ${product.stock === 0 ? "text-secondary" : ""}`}>
              {product.stock === 0 ? "Habis" : `${product.stock} tersedia`}
            </span>
          </p>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest mb-2">Spesifikasi</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {product.variants[0].processor && (
                  <div className="col-span-2 border border-border p-2">
                    <span className="text-muted-foreground">Processor: </span>
                    {product.variants[0].processor}
                  </div>
                )}
                {product.variants[0].ram && (
                  <div className="border border-border p-2">
                    <span className="text-muted-foreground">RAM: </span>
                    {product.variants[0].ram}
                  </div>
                )}
                {product.variants[0].storage && (
                  <div className="border border-border p-2">
                    <span className="text-muted-foreground">Storage: </span>
                    {product.variants[0].storage}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Add to cart */}
          <AddToCartButton
            product={{
              id: product.id,
              name: product.name,
              price: discounted,
              discount: product.discount,
              image: product.image ?? "",
              slug: product.slug,
            }}
            stock={product.stock}
          />
        </div>
      </div>

      {/* Description */}
      <div className="mb-16 border-2 border-foreground p-8">
        <p className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-border">
          Deskripsi Produk
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{product.description}</p>
      </div>

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <div className="mb-16 border-2 border-foreground">
          <div className="p-6 border-b-2 border-foreground">
            <p className="text-xs font-bold uppercase tracking-widest">Ulasan Pembeli</p>
          </div>
          {product.reviews.map((review) => (
            <div key={review.id} className="p-6 border-b border-border last:border-0">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-sm">{review.user.full_name}</p>
                <p className="text-xs text-secondary font-bold">{"★".repeat(review.rating)}</p>
              </div>
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      {/* Related */}
      <div>
        <p className="font-heading text-2xl uppercase mb-6">Produk Lainnya</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border-l-2 border-t-2 border-foreground">
          {related.filter((p) => p.slug !== slug).slice(0, 4).map((p) => (
            <div key={p.id} className="border-r-2 border-b-2 border-foreground">
              <ProductCard product={p as any} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
