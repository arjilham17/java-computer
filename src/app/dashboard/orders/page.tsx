import { getUserOrders } from "@/actions/user";
import { 
  Package, 
  ChevronRight, 
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default async function UserOrdersPage() {
  const orders = await getUserOrders();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl uppercase mb-2">Riwayat Pesanan</h1>
        <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Lacak dan lihat status pesanan Anda.</p>
      </div>

      {orders.length === 0 ? (
        <div className="border-2 border-dashed border-border py-20 text-center">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
          <p className="font-bold uppercase tracking-widest text-muted-foreground">Anda belum memiliki pesanan.</p>
          <Link href="/products" className="inline-block mt-6 text-xs font-bold uppercase tracking-widest text-secondary hover:underline">
            Mulai Belanja →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border-2 border-foreground group hover:border-secondary transition-colors">
              <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border bg-muted/20">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">ID Pesanan</p>
                  <p className="font-mono text-sm uppercase">#{order.id.slice(0, 8)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tanggal</p>
                  <p className="text-sm font-bold">{new Date(order.created_at).toLocaleDateString("id-ID")}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total</p>
                  <p className="text-sm font-black">Rp{Number(order.total_price).toLocaleString("id-ID")}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                   <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 border border-foreground flex items-center gap-1 ${
                      order.payment_status === "PAID" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {order.payment_status === "PAID" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {order.payment_status}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 border border-foreground bg-muted text-muted-foreground">
                      {order.shipping_status}
                    </span>
                </div>
              </div>

              <div className="p-4 md:p-6 space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-muted border border-border shrink-0 flex items-center justify-center text-[8px] font-bold uppercase">
                      Foto
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link 
                        href={`/products/${item.product.slug}`}
                        className="text-sm font-bold uppercase truncate block hover:text-secondary transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{item.quantity} Barang</p>
                    </div>
                    <p className="text-sm font-bold whitespace-nowrap">
                      Rp{Number(item.subtotal).toLocaleString("id-ID")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border bg-muted/10 flex justify-end">
                 <Link 
                  href={`/dashboard/orders/${order.id}`}
                  className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-secondary transition-colors"
                 >
                   Lihat Detail Pesanan <ExternalLink className="w-3 h-3" />
                 </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
