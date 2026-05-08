import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CreditCard, 
  User, 
  Calendar,
  MapPin,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { updateOrderStatus } from "@/actions/admin";
import OrderStatusUpdater from "./OrderStatusUpdater";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await db.order.findUnique({
    where: { id },
    include: {
      user: true,
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if (!order) {
    notFound();
  }

  const serializedOrder = {
    ...order,
    total_price: Number(order.total_price),
    items: order.items.map(item => ({
      ...item,
      subtotal: Number(item.subtotal),
      product: {
        ...item.product,
        price: Number(item.product.price)
      }
    }))
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/orders"
          className="p-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-heading text-3xl uppercase mb-1">Detail Pesanan</h1>
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">ID: #{order.id}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Col — Items & Status */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status Card */}
          <div className="border-2 border-foreground p-6 bg-card">
            <h3 className="font-heading text-lg uppercase mb-6 flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Status Pemrosesan
            </h3>
            <OrderStatusUpdater orderId={order.id} currentPayment={order.payment_status} currentShipping={order.shipping_status} />
          </div>

          {/* Items Table */}
          <div className="border-2 border-foreground overflow-hidden">
            <div className="p-4 border-b-2 border-foreground bg-muted/30">
              <p className="text-xs font-bold uppercase tracking-widest">Daftar Barang</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-foreground bg-muted/10 text-[10px] font-bold uppercase tracking-widest">
                    <th className="px-6 py-4">Produk</th>
                    <th className="px-6 py-4">Harga Unit</th>
                    <th className="px-6 py-4 text-center">Jumlah</th>
                    <th className="px-6 py-4 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {serializedOrder.items.map((item) => (
                    <tr key={item.id} className="border-b border-border">
                      <td className="px-6 py-4">
                        <p className="font-bold uppercase text-xs">{item.product.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.product.brand}</p>
                      </td>
                      <td className="px-6 py-4">Rp{item.product.price.toLocaleString("id-ID")}</td>
                      <td className="px-6 py-4 text-center font-bold">{item.quantity}</td>
                      <td className="px-6 py-4 text-right font-black">Rp{item.subtotal.toLocaleString("id-ID")}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                   <tr className="bg-muted/50 font-bold">
                    <td colSpan={3} className="px-6 py-4 text-right uppercase text-xs tracking-widest">Total Pesanan</td>
                    <td className="px-6 py-4 text-right text-lg font-heading">Rp{serializedOrder.total_price.toLocaleString("id-ID")}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col — Customer Info */}
        <div className="space-y-6">
          <div className="border-2 border-foreground p-6 bg-card space-y-6">
            <h3 className="font-heading text-lg uppercase flex items-center gap-2 border-b border-border pb-4">
              <User className="w-5 h-5" />
              Informasi Pelanggan
            </h3>
            
            <div className="space-y-4">
               <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Nama Pembeli</p>
                  <p className="font-bold">{order.user.full_name}</p>
               </div>
               <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                  <p className="text-sm">{order.user.email}</p>
               </div>
               <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">No. HP / WA</p>
                  <p className="text-sm">{order.user.phone || "-"}</p>
               </div>
            </div>

            <div className="pt-4 border-t border-border space-y-4">
               <h4 className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                 <MapPin className="w-3 h-3" />
                 Alamat Pengiriman
               </h4>
               <p className="text-xs leading-relaxed italic bg-muted p-3 border border-border">
                  {order.user.address || "Alamat belum diatur."}
               </p>
            </div>
          </div>

          <div className="border-2 border-foreground p-6 bg-foreground text-background space-y-4">
            <h3 className="font-heading text-lg uppercase flex items-center gap-2 border-b border-background/20 pb-4">
              <CreditCard className="w-5 h-5" />
              Pembayaran
            </h3>
            <div className="flex justify-between items-center">
               <span className="text-xs font-bold uppercase tracking-widest opacity-70">Metode</span>
               <span className="text-xs font-bold uppercase">Transfer Bank</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-xs font-bold uppercase tracking-widest opacity-70">Status</span>
               <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 border border-background ${
                  order.payment_status === "PAID" ? "bg-green-500 text-white" : "bg-orange-500 text-white"
                }`}>
                  {order.payment_status}
               </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
