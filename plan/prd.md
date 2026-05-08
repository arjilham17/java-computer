# PRODUCT REQUIREMENT DOCUMENT (PRD)

# E-Commerce Komputer & Teknologi

## 1. Project Overview

### Nama Project

E-Commerce Website untuk jual beli:

- Laptop
- PC
- Sparepart komputer
- Monitor
- Printer
- Networking
- Aksesoris komputer

Nama brand, logo, dan domain akan dikelola melalui Super Admin.

---

# 2. Tujuan Project

Membangun platform e-commerce modern berbasis:

- Website responsive
- Siap dikembangkan menjadi mobile app
- SEO friendly
- Scalable untuk bisnis jangka panjang
- Mendukung penjualan produk teknologi dan komputer

Target pengguna:

- UMKM
- Customer umum
- Pembeli retail

---

# 3. Technology Stack

## Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

## Backend

- Next.js Server Actions
- REST API / Route Handlers

## Database

- MySQL

## ORM

- Prisma ORM

## Authentication

- Clerk Authentication

Login methods:

- Google Login
- Email & Password
- Nomor HP / OTP

## Payment Gateway

- Midtrans

Payment methods:

- QRIS
- Bank Transfer
- E-Wallet

## Shipping

- Biteship API

Features:

- Ongkir otomatis
- Tracking pengiriman
- Multi courier

## Hosting

- Hostinger

## AI Integration

- OpenAI API chatbot customer support

---

# 4. User Roles

## 4.1 Customer

Hak akses:

- Register/login
- Melihat katalog
- Membeli produk
- Checkout
- Wishlist
- Review & rating
- Tracking order
- Mengelola profile
- Mengelola alamat
- Melihat invoice
- Melihat notifikasi

## 4.2 Admin

Hak akses:

- Kelola produk
- Kelola kategori
- Kelola order
- Kelola stok
- Approve review
- Kelola banner
- Cetak laporan
- Export Excel
- Monitoring statistik

## 4.3 Super Admin

Hak akses:

- Semua akses Admin
- Kelola admin
- Kelola role user
- Menghapus transaksi
- Menghapus user
- Mengatur logo website
- Mengatur branding website
- Mengatur domain
- Mengatur landing page
- Mengatur homepage campaign

---

# 5. Customer Features

## 5.1 Authentication

### Register

Field wajib:

- Nama lengkap
- Email
- Password
- Nomor HP aktif
- WhatsApp
- Jenis kelamin
- Tempat lahir
- Tanggal lahir
- Alamat lengkap

### Login

Metode login:

- Google Login
- Email & password
- Nomor HP OTP

---

## 5.2 Homepage

Komponen homepage:

- Hero banner
- Promo campaign
- Flash sale
- Produk terbaru
- Produk populer
- Kategori produk
- Testimoni
- Blog terbaru
- Footer informasi

---

## 5.3 Product Catalog

Features:

- Product search
- Product filter
- Product sorting
- Pagination
- Responsive grid

Filter:

- Harga
- Brand
- Processor
- VGA
- RAM
- Storage
- Kategori
- Kondisi

---

## 5.4 Product Detail

Informasi:

- Nama produk
- Deskripsi
- Gallery gambar
- Harga
- Diskon
- Stok
- Rating
- Review
- Spesifikasi
- Variasi produk

Variasi:

- Merek
- Warna
- Processor
- VGA
- RAM
- Storage SSD/HDD
- Fitur lain

Actions:

- Add to cart
- Buy now
- Add wishlist

---

## 5.5 Shopping Cart

Features:

- Tambah produk
- Hapus produk
- Update quantity
- Voucher/diskon
- Estimasi ongkir
- Multi product checkout

---

## 5.6 Checkout System

Flow:

1. Pilih alamat
2. Pilih kurir
3. Hitung ongkir otomatis
4. Pilih pembayaran
5. Redirect Midtrans
6. Konfirmasi pembayaran
7. Order dibuat

Features:

- Multi product checkout
- Auto shipping calculation
- Voucher support
- Invoice otomatis

---

## 5.7 Payment System

Integrasi Midtrans:

- QRIS
- Bank Transfer
- E-wallet

Status pembayaran:

- Pending
- Paid
- Failed
- Expired
- Refunded

---

## 5.8 Shipping System

Integrasi:

- Biteship

Features:

- Auto ongkir
- Tracking resi
- Shipping status
- Courier selection

Courier:

- JNE
- J&T
- Sicepat
- Ninja
- Anteraja

---

## 5.9 Wishlist

Features:

- Tambah wishlist
- Hapus wishlist
- Pindah ke cart

---

## 5.10 Review & Rating

Rules:

- Hanya pembeli dapat review
- Review harus diapprove admin
- Rating 1–5 bintang

Features:

- Text review
- Star rating
- Helpful review indicator

---

## 5.11 User Dashboard

Menu:

- Dashboard
- Orders
- Wishlist
- Notifications
- Profile
- Address
- Invoice
- Settings

---

## 5.12 Notifications

Jenis notifikasi:

- Order berhasil
- Pembayaran berhasil
- Order dikirim
- Promo
- Review approval

---

# 6. Admin Features

## 6.1 Admin Dashboard

Statistics:

- Total sales
- Total orders
- New customers
- Best selling products
- Low stock warning
- Revenue chart

---

## 6.2 Product Management

Features:

- CRUD product
- Upload images
- Manage stock
- Manage variants
- Manage pricing
- Manage categories

---

## 6.3 Order Management

Features:

- View orders
- Update status
- Print invoice
- Input tracking number
- Refund handling

Order status:

- Pending
- Paid
- Processing
- Shipped
- Delivered
- Cancelled
- Refunded

---

## 6.4 Review Moderation

Features:

- Approve review
- Reject review
- Hide review

---

## 6.5 Banner Management

Features:

- Upload homepage banner
- Campaign management
- Landing page management

---

## 6.6 Reports

Reports:

- Daily sales
- Monthly revenue
- Best selling products
- New customers
- Low stock

Export:

- PDF
- Excel

---

# 7. Super Admin Features

## 7.1 Role Management

Features:

- Create admin
- Delete admin
- Assign role
- Change permissions

---

## 7.2 Website Branding

Features:

- Upload logo
- Website name
- Favicon
- Color theme
- Footer settings

---

## 7.3 Website Settings

Features:

- Domain settings
- SEO settings
- Homepage settings
- Campaign settings
- Social media settings

---

# 8. Blog & SEO System

## Blog Features

- Article management
- Categories
- Tags
- SEO metadata
- Rich text editor

---

## SEO Features

- Meta title
- Meta description
- OpenGraph
- Sitemap
- Robots.txt
- Structured data
- SEO friendly URL

---

# 9. AI Chatbot

## Features

- Customer support chatbot
- FAQ automation
- Product recommendation
- AI response assistant

---

# 10. UI/UX Requirements

## Design Style

- references are in the file `c:\Users\arjil\Desktop\DEV\java-computer\plan\design.md`

## Theme

- Dark mode
- Light mode

## UI Characteristics

- Rounded cards
- Soft shadows
- Smooth animation
- Mobile first

---

# 11. Security Requirements

## Authentication Security

- JWT/session security
- Clerk authentication
- OTP verification

## Data Security

- HTTPS
- Input validation
- Rate limiting
- Secure API routes
- Environment variable encryption

---

# 12. Legal Pages

Pages:

- Terms & Conditions
- Warranty Policy
- Return & Refund Policy
- Privacy Policy

---

# 13. Performance Requirements

## Target

- Mobile responsive
- Lighthouse score 90+
- Fast loading
- Optimized image delivery

---

# 14. Database Design

## Main Tables

### Users

- id
- full_name
- email
- phone
- whatsapp
- gender
- birth_place
- birth_date
- address
- role

### Products

- id
- name
- slug
- description
- category_id
- brand
- stock
- price
- discount
- status

### Product Variants

- processor
- vga
- ram
- storage
- color

### Orders

- user_id
- total_price
- shipping_cost
- payment_status
- shipping_status

### Order Items

- order_id
- product_id
- quantity
- subtotal

### Reviews

- user_id
- product_id
- rating
- comment
- approved

### Categories

- name
- slug

### Wishlist

- user_id
- product_id

### Banners

- title
- image
- link

### Blog Posts

- title
- slug
- content

---

# 15. Suggested Folder Structure

```bash
src/
 ├── app/
 ├── components/
 ├── features/
 ├── lib/
 ├── services/
 ├── hooks/
 ├── prisma/
 ├── types/
 ├── styles/
 └── middleware/
```

---

# 16. Suggested Routes

## Public

- /
- /products
- /products/[slug]
- /categories
- /blog
- /campaign
- /about

## Auth

- /sign-in
- /sign-up

## Dashboard User

- /dashboard
- /orders
- /wishlist
- /profile
- /notifications

## Admin

- /admin
- /admin/products
- /admin/orders
- /admin/reports

## Super Admin

- /super-admin
- /super-admin/users
- /super-admin/settings

---

# 17. Development Phases

## Phase 1 — Foundation

- Setup Next.js
- Setup Tailwind
- Setup Clerk
- Setup Prisma
- Setup MySQL
- Setup UI system

---

## Phase 2 — E-Commerce Core

- Product catalog
- Cart system
- Checkout system
- Midtrans integration
- Biteship integration

---

## Phase 3 — Admin System

- Admin dashboard
- Product management
- Order management
- Reports

---

## Phase 4 — Optimization

- SEO
- Blog system
- AI chatbot
- Analytics

---

# 18. MVP Recommendation

## Wajib Saat Launching

### Customer

- Authentication
- Product catalog
- Cart
- Checkout
- Midtrans payment
- Biteship shipping
- Wishlist
- Review
- Order tracking

### Admin

- Product management
- Order management
- Reports
- Review moderation

### Super Admin

- Admin management
- Branding management

---

# 19. Future Development

## Phase 2

- Mobile app
- Push notifications
- AI recommendation
- Loyalty points
- Affiliate system

## Phase 3

- Multi warehouse
- ERP integration
- Advanced analytics
- Marketplace multi seller

---

# 20. Deployment Plan

## Production Environment

Hosting:

- Hostinger VPS

Requirements:

- Node.js
- PM2
- Nginx
- SSL
- MySQL database

---

# 21. Recommended Development Tools

## AI Development

- Google Antigravity
- Cursor AI
- v0.dev
- Bolt.new

## Coding Standards

- TypeScript strict mode
- ESLint
- Prettier
- Clean architecture

---

# 22. Success Metrics

## Business Metrics

- Conversion rate
- Monthly revenue
- Repeat customer rate
- Average order value

## Technical Metrics

- Website speed
- Error rate
- Uptime
- SEO ranking

---

# 23. Final Notes

Project ini dirancang sebagai:

- scalable modern e-commerce platform
- SEO-ready architecture
- AI-ready architecture
- mobile-first responsive system
- enterprise-ready foundation

Fokus utama:

- performa
- user experience
- keamanan
- scalability
- maintainability
