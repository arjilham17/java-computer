import { getOrders } from "@/actions/admin";
import { 
  ShoppingCart, 
  Search, 
  Eye, 
  Filter,
  CreditCard,
  Truck
} from "lucide-react";
import Link from "next/link";

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl uppercase mb-2">Manajemen Pesanan</h1>
        <p className="text-muted-foreground text-sm">Pantau dan kelola pesanan pelanggan Java Computer.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Cari ID Pesanan atau nama pelanggan..." 
            className="w-full h-12 pl-10 pr-4 border-2 border-foreground text-sm focus:outline-none bg-background"
          />
        </div>
        <button className="h-12 px-6 border-2 border-foreground flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-muted transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Orders Table */}
      <div className="border-2 border-foreground overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-foreground bg-muted/50 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-6 py-4">ID Pesanan</th>
                <th className="px-6 py-4">Pelanggan</th>
                <th className="px-6 py-4">Produk</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Pembayaran</th>
                <th className="px-6 py-4">Pengiriman</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground italic">
                    Belum ada pesanan masuk.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4 font-mono text-xs whitespace-nowrap">
                      #{order.id.slice(0, 8)}
                      <p className="text-[8px] text-muted-foreground mt-1">
                        {new Date(order.created_at).toLocaleDateString("id-ID")}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-bold">{order.user.full_name}</p>
                      <p className="text-[10px] text-muted-foreground">{order.user.email}</p>
                    </td>
                    <td className="px-6 py-4 min-w-[200px]">
                      <div className="text-xs space-y-1">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="truncate">
                            <span className="font-bold">{item.quantity}x</span> {item.product.name}
                          </p>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-bold">Rp{Number(order.total_price).toLocaleString("id-ID")}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 border border-foreground flex items-center gap-1 w-fit ${
                          order.payment_status === "PAID" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                        }`}>
                          <CreditCard className="w-3 h-3" />
                          {order.payment_status}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 border border-foreground flex items-center gap-1 w-fit ${
                          order.shipping_status === "DELIVERED" ? "bg-blue-100 text-blue-700" : "bg-muted text-muted-foreground"
                        }`}>
                          <Truck className="w-3 h-3" />
                          {order.shipping_status}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                       <Link 
                          href={`/admin/orders/${order.id}`}
                          className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-foreground text-[10px] font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                          Detail
                        </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
