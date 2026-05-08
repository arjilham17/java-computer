"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { totalItems } = useCartStore();
  const { isSignedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const count = totalItems();

  const navLinks = [
    { href: "/products", label: "Produk" },
    { href: "/categories", label: "Kategori" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header className="border-b-2 border-foreground bg-background sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="font-heading text-xl font-black tracking-tight uppercase shrink-0">
          Java<span className="text-secondary">Computer</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-bold uppercase tracking-widest text-foreground hover:text-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative p-2 hover:text-secondary transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>

          {isSignedIn ? (
            <UserButton />
          ) : (
            <SignInButton mode="modal">
              <button className="hidden md:block px-4 py-2 bg-foreground text-background text-xs font-bold uppercase tracking-widest hover:bg-secondary hover:border-secondary transition-colors border-2 border-foreground">
                Masuk
              </button>
            </SignInButton>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t-2 border-foreground bg-background">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-sm font-bold uppercase tracking-widest border-b border-border hover:bg-muted transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
