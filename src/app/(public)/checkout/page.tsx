"use client";

import { useCartStore } from "@/store/cart";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const { user } = useUser();
  const [form, setForm] = useState({
    name: user?.fullName ?? "",
    email: user?.primaryEmailAddress?.emailAddress ?? "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
    courier: "jne",
    notes: "",
  });

  const total = totalPrice();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="font-heading text-4xl uppercase mb-4">Keranjang Kosong</p>
        <Link href="/products" className="inline-block px-6 py-3 bg-foreground text-background text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-colors border-2 border-foreground">
          Belanja Sekarang
        </Link>
      </div>
    );
  }

  const couriers = [
    { value: "jne", label: "JNE" },
    { value: "jnt", label: "J&T Express" },
    { value: "sicepat", label: "SiCepat" },
    { value: "ninja", label: "Ninja Xpress" },
    { value: "anteraja", label: "Anteraja" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate Midtrans & Biteship when API keys are ready
    alert("Fitur pembayaran akan segera tersedia. Silakan hubungi admin untuk melanjutkan pemesanan.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="font-heading text-4xl uppercase border-b-2 border-foreground pb-6 mb-8">
        Checkout
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left — Shipping Info */}
          <div className="md:col-span-2 space-y-6">

            {/* Shipping Address */}
            <div className="border-2 border-foreground">
              <div className="border-b-2 border-foreground px-6 py-4">
                <p className="text-xs font-bold uppercase tracking-widest">Informasi Pengiriman</p>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5">Nama Lengkap *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full h-11 border-2 border-border px-3 text-sm focus:border-foreground focus:outline-none"
                    placeholder="Nama penerima"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5">Email *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full h-11 border-2 border-border px-3 text-sm focus:border-foreground focus:outline-none"
                    placeholder="email@contoh.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5">No. HP / WhatsApp *</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full h-11 border-2 border-border px-3 text-sm focus:border-foreground focus:outline-none"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5">Alamat Lengkap *</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full border-2 border-border px-3 py-2.5 text-sm focus:border-foreground focus:outline-none resize-none"
                    placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5">Kota *</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="w-full h-11 border-2 border-border px-3 text-sm focus:border-foreground focus:outline-none"
                    placeholder="Jakarta Selatan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5">Provinsi *</label>
                  <input
                    name="province"
                    value={form.province}
                    onChange={handleChange}
                    required
                    className="w-full h-11 border-2 border-border px-3 text-sm focus:border-foreground focus:outline-none"
                    placeholder="DKI Jakarta"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5">Kode Pos *</label>
                  <input
                    name="postal_code"
                    value={form.postal_code}
                    onChange={handleChange}
                    required
                    className="w-full h-11 border-2 border-border px-3 text-sm focus:border-foreground focus:outline-none"
                    placeholder="12345"
                  />
                </div>
              </div>
            </div>

            {/* Courier Selection */}
            <div className="border-2 border-foreground">
              <div className="border-b-2 border-foreground px-6 py-4">
                <p className="text-xs font-bold uppercase tracking-widest">Pilih Kurir</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {couriers.map((c) => (
                    <label
                      key={c.value}
                      className={`flex items-center gap-3 border-2 p-4 cursor-pointer transition-colors ${
                        form.courier === c.value
                          ? "border-foreground bg-muted"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      <input
                        type="radio"
                        name="courier"
                        value={c.value}
                        checked={form.courier === c.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="font-bold text-sm uppercase">{c.label}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  * Ongkos kirim otomatis akan dihitung setelah integrasi Biteship tersedia.
                </p>
              </div>
            </div>

            {/* Notes */}
            <div className="border-2 border-foreground">
              <div className="border-b-2 border-foreground px-6 py-4">
                <p className="text-xs font-bold uppercase tracking-widest">Catatan (Opsional)</p>
              </div>
              <div className="p-6">
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border-2 border-border px-3 py-2.5 text-sm focus:border-foreground focus:outline-none resize-none"
                  placeholder="Instruksi khusus untuk pengiriman..."
                />
              </div>
            </div>
          </div>

          {/* Right — Order Summary */}
          <div className="border-2 border-foreground h-fit sticky top-20">
            <div className="border-b-2 border-foreground px-6 py-4">
              <p className="text-xs font-bold uppercase tracking-widest">Ringkasan Pesanan</p>
            </div>

            <div className="p-6 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-2 text-sm">
                  <span className="text-muted-foreground truncate">
                    {item.name} <span className="font-bold text-foreground">×{item.quantity}</span>
                  </span>
                  <span className="font-bold shrink-0">
                    Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-6 py-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold">Rp{total.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ongkir</span>
                <span className="text-muted-foreground italic text-xs">Akan dihitung</span>
              </div>
            </div>

            <div className="border-t-2 border-foreground px-6 py-4 flex justify-between items-baseline">
              <span className="font-bold uppercase tracking-widest text-sm">Total</span>
              <span className="font-heading text-xl">Rp{total.toLocaleString("id-ID")}</span>
            </div>

            {/* Payment methods preview */}
            <div className="border-t border-border px-6 py-4">
              <p className="text-xs font-bold uppercase tracking-widest mb-3 text-muted-foreground">Metode Pembayaran</p>
              <div className="grid grid-cols-3 gap-2">
                {["QRIS", "Transfer", "E-Wallet"].map((m) => (
                  <div key={m} className="border-2 border-border p-2 text-center text-xs font-bold uppercase text-muted-foreground">
                    {m}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">* Powered by Midtrans (segera hadir)</p>
            </div>

            <div className="p-6 pt-0">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-foreground text-background text-sm font-bold uppercase tracking-widest hover:bg-secondary hover:border-secondary transition-colors border-2 border-foreground"
              >
                Buat Pesanan
              </button>
              <Link href="/cart" className="block text-center text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-secondary transition-colors mt-3">
                ← Kembali ke Keranjang
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
