"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { ShoppingCart, Menu, X, Laptop, Mouse, Monitor } from "lucide-react";
import { useState } from "react";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ui/curtain-theme-toggle";
import { Navbar1 } from "@/components/ui/shadcnblocks-com-navbar1";

export default function Navbar() {
  const { totalItems } = useCartStore();
  const { isSignedIn, user } = useUser();
  const count = totalItems();

  const menuData = [
    { title: "Beranda", url: "/" },
    {
      title: "Produk",
      url: "/products",
      items: [
        {
          title: "Laptop",
          description: "Laptop terbaru untuk kerja dan gaming",
          icon: <Laptop className="size-5 shrink-0" />,
          url: "/products?category=laptop",
        },
        {
          title: "Aksesoris",
          description: "Keyboard, mouse, dan periferal lainnya",
          icon: <Mouse className="size-5 shrink-0" />,
          url: "/products?category=aksesoris",
        },
        {
          title: "PC Desktop",
          description: "PC Rakitan performa tinggi",
          icon: <Monitor className="size-5 shrink-0" />,
          url: "/products?category=pc-desktop",
        },
      ],
    },
    { title: "Tentang Kami", url: "/about" },
    { title: "Blog", url: "/blog" },
  ];

  const authData = isSignedIn ? null : {
    login: { text: "Masuk", url: "/sign-in" },
    signup: { text: "Daftar", url: "/sign-up" },
  };

  return (
    <header className="border-b-2 border-foreground bg-background sticky top-0 z-50 font-sans">
      <Navbar1 
        logo={{
          url: "/",
          src: "/logo.svg", // Fallback, but the component uses the title too
          alt: "Java Computer",
          title: "JAVA COMPUTER"
        }}
        menu={menuData}
        auth={authData as any}
      />
      
      {/* Overlay extra project-specific UI elements onto the Navbar1 structure or wrap it */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-4 z-[60]">
        <ThemeToggle variant="icon" />
        <Link href="/cart" className="relative p-2 hover:text-secondary transition-colors">
          <ShoppingCart className="w-5 h-5" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center">
              {count > 9 ? "9+" : count}
            </span>
          )}
        </Link>
        {isSignedIn && user?.emailAddresses.some(e => e.emailAddress === "arjilham17@gmail.com") && (
          <Link 
            href="/admin" 
            className="hidden xl:block px-4 py-2 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-foreground transition-all border-2 border-secondary"
          >
            Admin Panel
          </Link>
        )}
        {isSignedIn && <UserButton />}
      </div>
    </header>
  );
}
