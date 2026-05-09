import { getUserProfile } from "@/actions/user";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";

export default async function ProfilePage() {
  const profile = await getUserProfile();

  if (!profile) return null;

  const infoItems = [
    { label: "Nama Lengkap", value: profile.full_name, icon: User },
    { label: "Email", value: profile.email, icon: Mail },
    { label: "Nomor Telepon", value: profile.phone || "Belum diisi", icon: Phone },
    { label: "WhatsApp", value: profile.whatsapp || "Belum diisi", icon: Phone },
    { label: "Tanggal Bergabung", value: new Date(profile.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }), icon: Calendar },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-heading text-2xl uppercase mb-1">Profil Saya</h1>
          <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">
            Kelola informasi pribadi Anda.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {infoItems.map((item, idx) => (
          <div key={idx} className="flex flex-col md:flex-row md:items-center border-2 border-foreground p-4 md:p-6 group hover:bg-muted/10 transition-colors">
            <div className="flex items-center gap-4 md:w-64 shrink-0 mb-4 md:mb-0">
              <item.icon className="w-4 h-4 text-muted-foreground" />
              <p className="text-[10px] font-black uppercase tracking-widest">{item.label}</p>
            </div>
            <p className="font-bold text-sm uppercase truncate">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="p-6 border-2 border-dashed border-foreground/20 bg-muted/5">
        <div className="flex items-start gap-4">
          <MapPin className="w-5 h-5 mt-1 text-muted-foreground" />
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest">Alamat Pengiriman Utama</p>
            <p className="text-sm font-bold uppercase leading-relaxed">
              {profile.address || "Anda belum melengkapi alamat pengiriman."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
