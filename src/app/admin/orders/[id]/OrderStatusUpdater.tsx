"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/actions/admin";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";

type Props = {
  orderId: string;
  currentPayment: string;
  currentShipping: string;
};

export default function OrderStatusUpdater({ orderId, currentPayment, currentShipping }: Props) {
  const [payment, setPayment] = useState(currentPayment);
  const [shipping, setShipping] = useState(currentShipping);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateOrderStatus(orderId, payment, shipping);
      router.refresh();
      alert("Status pesanan berhasil diperbarui.");
    } catch (error) {
      console.error(error);
      alert("Gagal memperbarui status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-muted-foreground">Status Pembayaran</label>
          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="w-full h-12 border-2 border-border px-4 text-xs font-bold uppercase tracking-widest focus:border-foreground focus:outline-none bg-background appearance-none"
          >
            <option value="UNPAID">Unpaid</option>
            <option value="PAID">Paid</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-muted-foreground">Status Pengiriman</label>
          <select
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
            className="w-full h-12 border-2 border-border px-4 text-xs font-bold uppercase tracking-widest focus:border-foreground focus:outline-none bg-background appearance-none"
          >
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="w-full h-14 bg-foreground text-background text-xs font-bold uppercase tracking-widest hover:bg-secondary hover:border-secondary transition-colors border-2 border-foreground flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Check className="w-4 h-4" />
        )}
        Simpan Perubahan Status
      </button>
    </div>
  );
}
