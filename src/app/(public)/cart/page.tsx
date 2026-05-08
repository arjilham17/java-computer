"use client";

import { useCartStore } from "@/store/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCartStore();
  const total = totalPrice();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="font-heading text-4xl uppercase mb-4">Keranjang Kosong</p>
        <p className="text-muted-foreground mb-8">Belum ada produk yang ditambahkan.</p>
        <Link
          href="/products"
          className="inline-block px-6 py-3 bg-foreground text-background text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-colors border-2 border-foreground"
        >
          Belanja Sekarang
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="font-heading text-4xl uppercase border-b-2 border-foreground pb-6 mb-8">
        Keranjang Belanja
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Item list */}
        <div className="md:col-span-2 border-2 border-foreground">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`p-5 flex gap-4 items-start ${idx !== items.length - 1 ? "border-b-2 border-foreground" : ""}`}
            >
              {/* Image Container */}
              <div className="relative w-20 h-20 bg-muted border-2 border-border shrink-0 flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[10px] text-muted-foreground font-bold uppercase">Foto</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.slug}`}
                  className="font-heading text-sm uppercase leading-tight hover:text-secondary transition-colors block mb-1"
                >
                  {item.name}
                </Link>
                <p className="text-sm font-bold">
                  Rp{item.price.toLocaleString("id-ID")}
                </p>
              </div>

              <div className="flex flex-col items-end gap-3 shrink-0">
                {/* Qty */}
                <div className="flex items-center border-2 border-foreground">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-muted border-r-2 border-foreground"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-10 h-8 flex items-center justify-center text-sm font-bold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-muted border-l-2 border-foreground"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-muted-foreground hover:text-secondary transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="border-2 border-foreground p-6 h-fit sticky top-20">
          <p className="text-xs font-bold uppercase tracking-widest mb-6 pb-3 border-b-2 border-foreground">
            Ringkasan Pesanan
          </p>

          <div className="space-y-2 mb-6 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between gap-2">
                <span className="text-muted-foreground truncate">{item.name} ×{item.quantity}</span>
                <span className="font-bold shrink-0">
                  Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-baseline border-t-2 border-foreground pt-4 mb-6">
            <span className="font-bold uppercase tracking-widest text-sm">Total</span>
            <span className="font-heading text-xl">Rp{total.toLocaleString("id-ID")}</span>
          </div>

          <Link
            href="/checkout"
            className="w-full block text-center px-6 py-3 bg-foreground text-background text-sm font-bold uppercase tracking-widest hover:bg-secondary hover:border-secondary transition-colors border-2 border-foreground mb-3"
          >
            Checkout
          </Link>
          <button
            onClick={clearCart}
            className="w-full text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-secondary transition-colors py-2"
          >
            Kosongkan Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
