import { getOrderById } from "@/actions/user";
import { 
  ArrowLeft, 
  Package, 
  CreditCard, 
  Truck, 
  Calendar, 
  Hash,
  MapPin,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  const steps = [
    { label: "Pesanan Dibuat", status: "COMPLETED", date: order.created_at, icon: Calendar },
    { 
      label: "Pembayaran", 
      status: order.payment_status === "PAID" ? "COMPLETED" : "PENDING", 
      icon: CreditCard 
    },
    { 
      label: "Pengiriman", 
      status: order.shipping_status === "DELIVERED" ? "COMPLETED" : (order.shipping_status === "PENDING" ? "PENDING" : "PROCESSING"), 
      icon: Truck 
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link 
          href="/dashboard/orders" 
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-secondary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <div className="flex gap-2">
           <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 border-2 border-foreground flex items-center gap-1 ${
              order.payment_status === "PAID" ? "bg-green-100" : "bg-orange-100"
            }`}>
              {order.payment_status}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 border-2 border-foreground bg-muted">
              {order.shipping_status}
            </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center">
          <Package className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-heading text-2xl uppercase mb-1">Detail Pesanan</h1>
          <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold font-mono">
            ID: #{order.id}
          </p>
        </div>
      </div>

      {/* Order Status Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step, idx) => (
          <div key={idx} className={`p-4 border-2 border-foreground ${step.status === "COMPLETED" ? "bg-muted/10" : "opacity-50"}`}>
            <div className="flex items-center gap-3 mb-2">
              <step.icon className="w-4 h-4" />
              <p className="text-[10px] font-black uppercase tracking-widest">{step.label}</p>
            </div>
            <div className="flex items-center gap-2">
              {step.status === "COMPLETED" ? (
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              ) : (
                <Clock className="w-4 h-4 text-orange-500" />
              )}
              <p className="text-xs font-bold uppercase">
                {step.status === "COMPLETED" ? "Selesai" : "Menunggu"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-bold text-xs uppercase tracking-widest border-b-2 border-foreground pb-2">Item Pesanan</h2>
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-4 border-2 border-foreground hover:border-secondary transition-colors group">
                <div className="relative w-20 h-20 bg-muted border border-border shrink-0 flex items-center justify-center overflow-hidden">
                  {item.product.image ? (
                    <Image 
                      src={item.product.image} 
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-[8px] font-bold uppercase">No Image</span>
                  )}
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <Link 
                      href={`/products/${item.product.slug}`}
                      className="font-bold uppercase text-sm hover:text-secondary transition-colors block truncate"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">
                      Rp{item.product.price.toLocaleString("id-ID")} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-black text-sm uppercase">
                    Rp{item.subtotal.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary & Shipping */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="font-bold text-xs uppercase tracking-widest border-b-2 border-foreground pb-2">Ringkasan</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-xs uppercase font-bold">
                <span className="text-muted-foreground">Subtotal</span>
                <span>Rp{(order.total_price - order.shipping_cost).toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-xs uppercase font-bold">
                <span className="text-muted-foreground">Biaya Pengiriman</span>
                <span>Rp{order.shipping_cost.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-sm uppercase font-black pt-2 border-t border-dashed border-foreground">
                <span>Total</span>
                <span className="text-secondary">Rp{order.total_price.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-bold text-xs uppercase tracking-widest border-b-2 border-foreground pb-2">Alamat Pengiriman</h2>
            <div className="p-4 border-2 border-foreground bg-muted/5 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                <div className="space-y-1">
                   <p className="text-xs font-black uppercase">{order.user.full_name}</p>
                   <p className="text-[10px] font-bold text-muted-foreground uppercase">{order.user.phone}</p>
                   <p className="text-[10px] leading-relaxed uppercase font-bold pt-2">
                     {order.user.address || "Alamat tidak tersedia"}
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
