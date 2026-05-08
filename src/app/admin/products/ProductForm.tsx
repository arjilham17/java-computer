"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/actions/admin";
import { Save, X, Plus, Trash2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

type Category = {
  id: string;
  name: string;
};

type ProductFormProps = {
  initialData?: any;
  categories: Category[];
};

export default function ProductForm({ initialData, categories }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    brand: initialData?.brand || "",
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    discount: initialData?.discount || 0,
    status: initialData?.status || "DRAFT",
    category_id: initialData?.category_id || (categories[0]?.id || ""),
    image: initialData?.image || "",
  });

  const [variants, setVariants] = useState(initialData?.variants || []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Auto-slug
    if (name === "name" && !initialData) {
      setFormData((prev) => ({ 
        ...prev, 
        slug: value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") 
      }));
    }
  };

  const addVariant = () => {
    setVariants([...variants, { processor: "", ram: "", storage: "", vga: "", color: "" }]);
  };

  const updateVariant = (index: number, field: string, value: string) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_: any, i: number) => i !== index));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData) {
        await updateProduct(initialData.id, { ...formData, variants });
      } else {
        await createProduct({ ...formData, variants });
      }
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan produk. Periksa kembali data Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border-2 border-foreground p-6 bg-card space-y-4">
            <h3 className="font-heading text-lg uppercase mb-4">Informasi Utama</h3>
            
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5">Nama Produk *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full h-12 border-2 border-border px-4 text-sm focus:border-foreground focus:outline-none transition-colors"
                placeholder="Contoh: Asus ROG Strix G15"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5">Slug / URL (Otomatis)</label>
              <input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full h-12 border-2 border-border px-4 text-sm bg-muted/30 focus:border-foreground focus:outline-none transition-colors"
                placeholder="asus-rog-strix-g15"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5">Deskripsi Produk *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full border-2 border-border p-4 text-sm focus:border-foreground focus:outline-none transition-colors resize-none"
                placeholder="Tulis deskripsi lengkap produk..."
              />
            </div>
          </div>

          <div className="border-2 border-foreground p-6 bg-card space-y-4">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-heading text-lg uppercase">Spesifikasi / Varian</h3>
               <button 
                type="button"
                onClick={addVariant}
                className="text-[10px] font-bold uppercase tracking-widest bg-foreground text-background px-3 py-1.5 hover:bg-secondary transition-colors"
               >
                 + Tambah
               </button>
            </div>
            
            {variants.length === 0 ? (
              <p className="text-xs text-muted-foreground italic text-center py-4 border-2 border-dashed border-border">
                Belum ada spesifikasi. Produk laptop biasanya butuh spesifikasi.
              </p>
            ) : (
              <div className="space-y-4">
                {variants.map((v: any, index: number) => (
                  <div key={index} className="p-4 border-2 border-border space-y-3 relative">
                    <button 
                      type="button" 
                      onClick={() => removeVariant(index)}
                      className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-secondary transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                       <div>
                        <label className="block text-[8px] font-bold uppercase tracking-widest mb-1">Processor</label>
                        <input 
                          value={v.processor} 
                          onChange={(e) => updateVariant(index, "processor", e.target.value)}
                          className="w-full h-10 border border-border px-3 text-xs focus:border-foreground focus:outline-none" 
                        />
                       </div>
                       <div>
                        <label className="block text-[8px] font-bold uppercase tracking-widest mb-1">RAM</label>
                        <input 
                          value={v.ram} 
                          onChange={(e) => updateVariant(index, "ram", e.target.value)}
                          className="w-full h-10 border border-border px-3 text-xs focus:border-foreground focus:outline-none" 
                        />
                       </div>
                       <div>
                        <label className="block text-[8px] font-bold uppercase tracking-widest mb-1">Penyimpanan</label>
                        <input 
                          value={v.storage} 
                          onChange={(e) => updateVariant(index, "storage", e.target.value)}
                          className="w-full h-10 border border-border px-3 text-xs focus:border-foreground focus:outline-none" 
                        />
                       </div>
                       <div>
                        <label className="block text-[8px] font-bold uppercase tracking-widest mb-1">VGA / GPU</label>
                        <input 
                          value={v.vga} 
                          onChange={(e) => updateVariant(index, "vga", e.target.value)}
                          className="w-full h-10 border border-border px-3 text-xs focus:border-foreground focus:outline-none" 
                        />
                       </div>
                       <div>
                        <label className="block text-[8px] font-bold uppercase tracking-widest mb-1">Warna</label>
                        <input 
                          value={v.color} 
                          onChange={(e) => updateVariant(index, "color", e.target.value)}
                          className="w-full h-10 border border-border px-3 text-xs focus:border-foreground focus:outline-none" 
                        />
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="border-2 border-foreground p-6 bg-card space-y-4">
            <h3 className="font-heading text-lg uppercase mb-4">Foto Produk</h3>
            <ImageUpload 
              value={formData.image} 
              onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
              onRemove={() => setFormData(prev => ({ ...prev, image: "" }))}
            />
          </div>

          <div className="border-2 border-foreground p-6 bg-card space-y-4">
            <h3 className="font-heading text-lg uppercase mb-4">Status & Kategori</h3>
            
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5">Status Produk</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full h-12 border-2 border-border px-4 text-sm font-bold uppercase tracking-widest focus:border-foreground focus:outline-none bg-background appearance-none"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5">Kategori *</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                className="w-full h-12 border-2 border-border px-4 text-sm font-bold uppercase tracking-widest focus:border-foreground focus:outline-none bg-background appearance-none"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5">Brand</label>
              <input
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full h-12 border-2 border-border px-4 text-sm focus:border-foreground focus:outline-none"
                placeholder="Contoh: Asus, Lenovo, Acer"
              />
            </div>
          </div>

          <div className="border-2 border-foreground p-6 bg-card space-y-4">
            <h3 className="font-heading text-lg uppercase mb-4">Harga & Stok</h3>
            
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5">Harga Dasar (Rp) *</label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                min={0}
                className="w-full h-12 border-2 border-border px-4 text-sm font-mono focus:border-foreground focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5">Diskon (%)</label>
              <input
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleChange}
                min={0}
                max={100}
                className="w-full h-12 border-2 border-border px-4 text-sm font-mono focus:border-foreground focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5">Stok Awal *</label>
              <input
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
                min={0}
                className="w-full h-12 border-2 border-border px-4 text-sm font-mono focus:border-foreground focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 h-14 border-2 border-foreground text-xs font-bold uppercase tracking-widest hover:bg-muted transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] h-14 bg-foreground text-background text-xs font-bold uppercase tracking-widest hover:bg-secondary hover:border-secondary transition-colors border-2 border-foreground flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {loading ? "Menyimpan..." : "Simpan Produk"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
