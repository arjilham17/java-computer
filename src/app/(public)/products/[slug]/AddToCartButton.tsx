"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  price: number;
  discount: number;
  image: string;
  slug: string;
};

export default function AddToCartButton({ product, stock }: { product: Product; stock: number }) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCartStore();
  const router = useRouter();

  const handleAdd = () => {
    addItem({ ...product, quantity: qty });
    router.push("/cart");
  };

  if (stock === 0) {
    return (
      <div className="border-2 border-border p-4 text-center text-muted-foreground font-bold uppercase tracking-widest text-sm">
        Stok Habis
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Quantity */}
      <div className="flex items-center gap-0 w-fit border-2 border-foreground">
        <button
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="w-10 h-10 flex items-center justify-center hover:bg-muted border-r-2 border-foreground transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-12 h-10 flex items-center justify-center font-bold text-sm">
          {qty}
        </span>
        <button
          onClick={() => setQty(Math.min(stock, qty + 1))}
          className="w-10 h-10 flex items-center justify-center hover:bg-muted border-l-2 border-foreground transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleAdd}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-bold uppercase tracking-widest hover:bg-secondary hover:border-secondary transition-colors border-2 border-foreground"
        >
          <ShoppingCart className="w-4 h-4" />
          Beli Sekarang
        </button>
        <button
          onClick={() => addItem({ ...product, quantity: qty })}
          className="px-4 py-3 border-2 border-foreground text-sm font-bold uppercase hover:bg-muted transition-colors"
        >
          + Keranjang
        </button>
      </div>
    </div>
  );
}
