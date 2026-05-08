import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { syncUser } from "@/lib/user-sync";
import Link from "next/link";
import { 
  Package, 
  Heart, 
  User, 
  MapPin,
  LogOut,
  Home
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await syncUser();

  const sidebarLinks = [
    { href: "/dashboard/orders", label: "Pesanan Saya", icon: Package },
    { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
    { href: "/dashboard/profile", label: "Profil Saya", icon: User },
    { href: "/dashboard/address", label: "Alamat", icon: MapPin },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-64 shrink-0">
              <div className="border-2 border-foreground bg-background p-6 sticky top-24">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
                  <UserButton />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Selamat Datang,</p>
                    <p className="font-heading text-sm uppercase truncate">Pelanggan</p>
                  </div>
                </div>

                <nav className="space-y-1">
                  {sidebarLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors border-2 border-transparent hover:border-foreground"
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <div className="border-2 border-foreground bg-background p-6 md:p-8 min-h-[500px]">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
