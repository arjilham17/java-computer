import { getAdminStats } from "@/actions/admin";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  ArrowUpRight,
  TrendingUp,
  Layers,
  BarChart3
} from "lucide-react";
import Link from "next/link";
import AdminDashboardStats from "@/components/admin/AdminDashboardStats";

export default async function AdminDashboard() {
  const stats = await getAdminStats();

  const cards = [
    { 
      label: "Total Produk", 
      value: stats.productCount, 
      icon: Package, 
      color: "bg-blue-500" 
    },
    { 
      label: "Total Pesanan", 
      value: stats.orderCount, 
      icon: ShoppingCart, 
      color: "bg-green-500" 
    },
    { 
      label: "Total Pelanggan", 
      value: stats.userCount, 
      icon: Users, 
      color: "bg-purple-500" 
    },
    { 
      label: "Pendapatan", 
      value: `Rp${Number(stats.totalRevenue).toLocaleString("id-ID")}`, 
      icon: DollarSign, 
      color: "bg-orange-500" 
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl uppercase mb-2">Ikhtisar Dashboard</h1>
        <p className="text-muted-foreground text-sm">Pantau performa toko Java Computer Anda.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="border-2 border-foreground p-6 bg-card flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 border-2 border-foreground bg-foreground text-background`}>
                <card.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-secondary" />
                Live
              </span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{card.label}</p>
              <p className="font-heading text-2xl truncate">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <AdminDashboardStats 
        bestSellingProducts={stats.bestSellingProducts}
        revenueTrend={stats.revenueTrend}
        totalRevenue={stats.totalRevenue}
        productCount={stats.productCount}
        orderCount={stats.orderCount}
        userCount={stats.userCount}
        recentOrders={stats.recentOrders}
      />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 border-2 border-foreground bg-card">
          <div className="p-6 border-b-2 border-foreground flex justify-between items-center">
            <h3 className="font-heading text-lg uppercase">Pesanan Terbaru</h3>
            <Link href="/admin/orders" className="text-xs font-bold uppercase tracking-widest hover:text-secondary flex items-center gap-1">
              Semua <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-foreground bg-muted/50">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">ID Pesanan</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Pelanggan</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Total</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {stats.recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic">
                      Belum ada pesanan terbaru.
                    </td>
                  </tr>
                ) : (
                  stats.recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs">#{order.id.slice(0, 8)}</td>
                      <td className="px-6 py-4 font-bold">{order.user.full_name}</td>
                      <td className="px-6 py-4">Rp{Number(order.total_price).toLocaleString("id-ID")}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 border border-foreground ${
                          order.payment_status === "PAID" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                        }`}>
                          {order.payment_status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-2 border-foreground p-6 h-fit bg-foreground text-background">
          <h3 className="font-heading text-lg uppercase mb-6 border-b border-background/20 pb-4">Aksi Cepat</h3>
          <div className="space-y-4">
            <Link 
              href="/admin/products/new" 
              className="flex items-center justify-between w-full p-4 border-2 border-background text-xs font-bold uppercase tracking-widest hover:bg-secondary hover:border-secondary transition-colors"
            >
              Tambah Produk Baru
              <Package className="w-4 h-4" />
            </Link>
            <Link 
              href="/admin/categories/new" 
              className="flex items-center justify-between w-full p-4 border-2 border-background text-xs font-bold uppercase tracking-widest hover:bg-background hover:text-foreground transition-colors"
            >
              Tambah Kategori
              <Layers className="w-4 h-4" />
            </Link>
            <Link 
              href="/admin/orders" 
              className="flex items-center justify-between w-full p-4 border-2 border-background text-xs font-bold uppercase tracking-widest hover:bg-background hover:text-foreground transition-colors"
            >
              Kelola Pesanan
              <ShoppingCart className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
