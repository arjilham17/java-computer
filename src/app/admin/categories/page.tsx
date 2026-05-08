import { db } from "@/lib/db";
import { 
  Layers, 
  Plus, 
  Edit, 
  Trash2,
  Package
} from "lucide-react";
import Link from "next/link";

export default async function AdminCategoriesPage() {
  const categories = await db.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" }
  });

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl uppercase mb-2">Manajemen Kategori</h1>
          <p className="text-muted-foreground text-sm">Kelola kategori produk Java Computer.</p>
        </div>
        <button 
          className="flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-colors border-2 border-foreground"
        >
          <Plus className="w-4 h-4" />
          Kategori Baru
        </button>
      </div>

      <div className="grid gap-4">
        {categories.length === 0 ? (
          <div className="border-2 border-dashed border-border py-12 text-center text-muted-foreground italic">
            Belum ada kategori.
          </div>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="border-2 border-foreground p-5 bg-card flex items-center justify-between group hover:border-secondary transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 border-2 border-foreground bg-muted group-hover:bg-foreground group-hover:text-background transition-colors">
                   <Layers className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-heading text-lg uppercase">{cat.name}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Slug: {cat.slug}</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-secondary">
                      <Package className="w-3 h-3" />
                      {cat._count.products} Produk
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 border-2 border-foreground hover:bg-secondary hover:text-white transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
