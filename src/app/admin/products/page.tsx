import { db } from "@/lib/db";
import { 
  Package, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Filter
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    include: { category: true },
    orderBy: { created_at: "desc" }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl uppercase mb-2">Manajemen Produk</h1>
          <p className="text-muted-foreground text-sm">Kelola katalog produk, stok, dan harga.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-colors border-2 border-foreground"
        >
          <Plus className="w-4 h-4" />
          Produk Baru
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Cari nama produk, SKU, atau brand..." 
            className="w-full h-12 pl-10 pr-4 border-2 border-foreground text-sm focus:outline-none bg-background"
          />
        </div>
        <button className="h-12 px-6 border-2 border-foreground flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-muted transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Product Table */}
      <div className="border-2 border-foreground overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-foreground bg-muted/50 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-6 py-4">Produk</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Stok</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground italic">
                    Belum ada produk. Klik "Produk Baru" untuk memulai.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4 min-w-[300px]">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 bg-muted border-2 border-foreground shrink-0 flex items-center justify-center overflow-hidden">
                          {product.image ? (
                            <Image 
                              src={product.image} 
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <span className="text-[8px] font-bold uppercase">Foto</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold truncate">{product.name}</p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{product.brand || "Tanpa Brand"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs font-bold uppercase tracking-widest bg-muted px-2 py-1">
                        {product.category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-bold">Rp{Number(product.price).toLocaleString("id-ID")}</p>
                      {product.discount > 0 && (
                        <p className="text-[10px] text-secondary font-black">-{product.discount}% OFF</p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-mono font-bold ${product.stock < 5 ? "text-secondary" : ""}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 border border-foreground ${
                          product.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                        }`}>
                          {product.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/products/${product.slug}`} 
                          target="_blank"
                          className="p-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link 
                          href={`/admin/products/${product.id}`}
                          className="p-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button className="p-2 border-2 border-foreground hover:bg-secondary hover:text-white transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
