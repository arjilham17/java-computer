import Image from "next/image";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number | string;
  discount: number;
  brand?: string | null;
  image?: string | null;
  category: { name: string };
};

export default function ProductCard({ product }: { product: Product }) {
  const price = Number(product.price);
  const discounted = price * (1 - product.discount / 100);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block border-2 border-border bg-card hover:border-foreground transition-colors duration-150"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-muted overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
            No Image
          </div>
        )}
        {product.discount > 0 && (
          <span className="absolute top-0 left-0 bg-secondary text-white text-[10px] font-bold uppercase px-2 py-1 z-10">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 border-t-2 border-border group-hover:border-foreground transition-colors">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
          {product.category.name} {product.brand ? `· ${product.brand}` : ""}
        </p>
        <h3 className="font-heading text-sm leading-tight mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-sm">
            Rp{discounted.toLocaleString("id-ID")}
          </span>
          {product.discount > 0 && (
            <span className="text-muted-foreground text-xs line-through">
              Rp{price.toLocaleString("id-ID")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
