import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-2 border-foreground mt-auto bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <p className="font-heading text-2xl font-black uppercase mb-3">
            Java<span className="text-secondary">Computer</span>
          </p>
          <p className="text-sm text-background/70 leading-relaxed max-w-xs">
            Platform e-commerce modern untuk kebutuhan laptop, PC, sparepart, dan aksesoris komputer terpercaya.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-4 text-secondary">Navigasi</p>
          <ul className="space-y-2 text-sm">
            {["Produk", "Blog", "Tentang Kami"].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase().replace(" ", "-")}`} className="text-background/70 hover:text-secondary transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-4 text-secondary">Kebijakan</p>
          <ul className="space-y-2 text-sm">
            {["Syarat & Ketentuan", "Kebijakan Privasi", "Garansi", "Retur & Refund"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-background/70 hover:text-secondary transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-background/20 max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-xs text-background/50">© {new Date().getFullYear()} Java Computer. All rights reserved.</p>
        <p className="text-xs text-background/50">Powered by Next.js & Prisma</p>
      </div>
    </footer>
  );
}
