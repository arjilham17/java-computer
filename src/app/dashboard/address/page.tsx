import { getUserProfile } from "@/actions/user";
import AddressForm from "./address-form";
import { MapPin } from "lucide-react";

export default async function AddressPage() {
  const profile = await getUserProfile();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-heading text-2xl uppercase mb-1">Alamat Pengiriman</h1>
          <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">
            Lengkapi alamat Anda untuk mempermudah proses pengiriman.
          </p>
        </div>
      </div>

      <div className="bg-muted/10 p-6 md:p-8 border-2 border-dashed border-muted-foreground/20">
        <AddressForm initialData={profile} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="p-4 border-2 border-foreground bg-secondary/5">
          <h3 className="font-bold text-[10px] uppercase tracking-widest mb-2 text-secondary">Tips Pengiriman</h3>
          <p className="text-xs text-muted-foreground leading-relaxed uppercase">
            Pastikan nomor telepon yang Anda masukkan aktif agar kurir dapat menghubungi Anda saat pengiriman berlangsung.
          </p>
        </div>
        <div className="p-4 border-2 border-foreground bg-muted/5">
          <h3 className="font-bold text-[10px] uppercase tracking-widest mb-2">Keamanan Data</h3>
          <p className="text-xs text-muted-foreground leading-relaxed uppercase">
            Data alamat Anda disimpan dengan aman dan hanya digunakan untuk kepentingan pengiriman pesanan Anda.
          </p>
        </div>
      </div>
    </div>
  );
}
