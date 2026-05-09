"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { Download, FileText, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

type AdminDashboardStatsProps = {
  bestSellingProducts: { name: string; sales: number }[];
  revenueTrend: { date: string; amount: number }[];
  totalRevenue: number;
  productCount: number;
  orderCount: number;
  userCount: number;
  recentOrders: any[];
};

export default function AdminDashboardStats({ 
  bestSellingProducts, 
  revenueTrend,
  totalRevenue,
  productCount,
  orderCount,
  userCount,
  recentOrders
}: AdminDashboardStatsProps) {

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Laporan Penjualan Java Computer", 14, 15);
    doc.setFontSize(10);
    doc.text(`Total Pendapatan: Rp${totalRevenue.toLocaleString("id-ID")}`, 14, 25);
    doc.text(`Total Produk: ${productCount}`, 14, 30);
    doc.text(`Total Pesanan: ${orderCount}`, 14, 35);

    autoTable(doc, {
      startY: 45,
      head: [["ID Pesanan", "Pelanggan", "Total", "Status"]],
      body: recentOrders.map(o => [
        `#${o.id.slice(0, 8)}`,
        o.user.full_name,
        `Rp${Number(o.total_price).toLocaleString("id-ID")}`,
        o.payment_status
      ]),
    });

    doc.save("laporan-penjualan.pdf");
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(recentOrders.map(o => ({
      ID_Pesanan: o.id,
      Pelanggan: o.user.full_name,
      Total: Number(o.total_price),
      Status: o.payment_status,
      Tanggal: new Date(o.created_at).toLocaleDateString("id-ID")
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pesanan");
    XLSX.writeFile(wb, "laporan-penjualan.xlsx");
  };

  return (
    <div className="space-y-8">
      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="border-2 border-foreground p-6 bg-card">
          <h3 className="font-heading text-lg uppercase mb-6">Tren Pendapatan</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10, fontWeight: 'bold' }} 
                  axisLine={{ stroke: '#000', strokeWidth: 2 }}
                />
                <YAxis 
                  tick={{ fontSize: 10, fontWeight: 'bold' }} 
                  axisLine={{ stroke: '#000', strokeWidth: 2 }}
                  tickFormatter={(value) => `Rp${(value / 1000000).toFixed(1)}jt`}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '0', 
                    border: '2px solid black',
                    fontWeight: 'bold'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#EF4444" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#EF4444', strokeWidth: 2, stroke: '#000' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border-2 border-foreground p-6 bg-card">
          <h3 className="font-heading text-lg uppercase mb-6">Produk Terlaris</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bestSellingProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E5E5" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fontSize: 10, fontWeight: 'bold' }} 
                  width={100}
                  axisLine={{ stroke: '#000', strokeWidth: 2 }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  contentStyle={{ 
                    borderRadius: '0', 
                    border: '2px solid black',
                    fontWeight: 'bold'
                  }} 
                />
                <Bar 
                  dataKey="sales" 
                  fill="#0A0A0A" 
                  stroke="#000"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="flex flex-wrap gap-4 pt-4">
        <Button onClick={exportToPDF} className="gap-2 rounded-none">
          <FileText className="w-4 h-4" />
          Export PDF
        </Button>
        <Button onClick={exportToExcel} variant="outline" className="gap-2 rounded-none border-2">
          <TableIcon className="w-4 h-4" />
          Export Excel
        </Button>
      </div>
    </div>
  );
}
