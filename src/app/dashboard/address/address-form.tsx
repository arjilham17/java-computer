"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateUserProfile } from "@/actions/user";
import { Check, Loader2 } from "lucide-react";

export default function AddressForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      full_name: formData.get("full_name") as string,
      phone: formData.get("phone") as string,
      whatsapp: formData.get("whatsapp") as string,
      address: formData.get("address") as string,
    };

    try {
      await updateUserProfile(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Gagal memperbarui alamat. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="full_name" className="text-[10px] font-bold uppercase tracking-widest">
            Nama Penerima
          </Label>
          <Input
            id="full_name"
            name="full_name"
            placeholder="Contoh: John Doe"
            defaultValue={initialData?.full_name || ""}
            required
            className="border-2 border-foreground rounded-none focus-visible:ring-0 focus-visible:border-secondary transition-colors"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest">
            Nomor Telepon
          </Label>
          <Input
            id="phone"
            name="phone"
            placeholder="Contoh: 08123456789"
            defaultValue={initialData?.phone || ""}
            required
            className="border-2 border-foreground rounded-none focus-visible:ring-0 focus-visible:border-secondary transition-colors"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="text-[10px] font-bold uppercase tracking-widest">
            WhatsApp (Opsional)
          </Label>
          <Input
            id="whatsapp"
            name="whatsapp"
            placeholder="Contoh: 08123456789"
            defaultValue={initialData?.whatsapp || ""}
            className="border-2 border-foreground rounded-none focus-visible:ring-0 focus-visible:border-secondary transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-[10px] font-bold uppercase tracking-widest">
          Alamat Lengkap
        </Label>
        <Textarea
          id="address"
          name="address"
          placeholder="Jalan, No. Rumah, RT/RW, Kecamatan, Kota, Kode Pos"
          defaultValue={initialData?.address || ""}
          required
          className="min-h-[120px] border-2 border-foreground rounded-none focus-visible:ring-0 focus-visible:border-secondary transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full sm:w-auto h-12 px-8 text-xs font-bold uppercase tracking-widest border-2 border-foreground hover:translate-x-1 hover:-translate-y-1 transition-transform"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            "Simpan Alamat"
          )}
        </Button>

        {success && (
          <div className="flex items-center gap-2 text-green-600 font-bold text-xs uppercase tracking-widest">
            <Check className="w-4 h-4" />
            Alamat berhasil disimpan!
          </div>
        )}

        {error && (
          <div className="text-destructive font-bold text-xs uppercase tracking-widest">
            {error}
          </div>
        )}
      </div>
    </form>
  );
}
