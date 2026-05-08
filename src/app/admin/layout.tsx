import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/lib/user-sync";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingCart, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings,
  Home,
  LogOut
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  const internalUser = await syncUser();

  // For development, we allow if user exists. 
  // In production, check for internalUser.role === 'ADMIN' or 'SUPER_ADMIN'
  if (!userId) {
    redirect("/sign-in");
  }

  const sidebarLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Produk", icon: Package },
    { href: "/admin/categories", label: "Kategori", icon: Layers },
    { href: "/admin/orders", label: "Pesanan", icon: ShoppingCart },
    { href: "/admin/users", label: "User", icon: Users },
    { href: "/admin/reviews", label: "Ulasan", icon: MessageSquare },
    { href: "/admin/reports", label: "Laporan", icon: BarChart3 },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r-2 border-foreground hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b-2 border-foreground">
          <Link href="/" className="font-heading text-xl font-black tracking-tight uppercase">
            Java<span className="text-secondary">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t-2 border-foreground space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-widest hover:text-secondary transition-colors"
          >
            <Home className="w-5 h-5" />
            Toko
          </Link>
          <div className="flex items-center gap-3 px-4 py-3">
             <UserButton showName />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b-2 border-foreground bg-background flex items-center justify-between px-6 md:px-8 sticky top-0 z-40">
          <h2 className="font-heading text-lg uppercase">Sistem Manajemen</h2>
          <div className="flex items-center gap-4">
             <span className="text-xs font-bold bg-secondary text-white px-2 py-1 uppercase tracking-widest">Administrator</span>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
