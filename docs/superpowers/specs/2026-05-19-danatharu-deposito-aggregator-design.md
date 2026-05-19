# Danatharu - Platform Aggregator Deposito BPR

**Tanggal:** 2026-05-19  
**Status:** Draft  
**Versi:** 1.0

## Ringkasan

Danatharu adalah platform aggregator perbankan berbasis web responsif yang dirancang untuk membantu Milenial dan Gen Z (usia 20-35 tahun) dalam mencari, membandingkan, dan menempatkan dana pada produk deposito BPR/Konvensional secara aman, mudah, dan 100% digital. Platform ini bertindak sebagai perantara antara calon nasabah dan bank BPR.

**Brand Concept:** Danatharu merepresentasikan pohon keuangan yang menumbuhkan kekayaan dan menyebarkan kebaikan melalui ekosistem BPR.

MVP tahap pertama adalah **frontend-only** dengan mock data statis, siap untuk integrasi API di tahap selanjutnya.

## Brand Guidelines

### Logo

- File logo: `public/danatharu-logo.png` (sumber: `C:/herfan-data/work/jsm/projects/AGGREGATOR-DEPOSITO/image/danatharu-logo.png`)
- Versi background putih untuk dokumen dan light interfaces
- Versi background biru untuk presentasi dan dark layouts
- Maintain clear space equal to height of letter 'D' around logo
- Do not distort, rotate, or recolor the logo

### Core Colors

| Warna | Hex | Simbol |
|-------|-----|--------|
| Gold | `#D4AF37` | Value, prosperity, financial growth |
| Deep Green | `#0B5A3C` | Trust, stability, sustainability |
| Blue (alternate) | `#0E3A66` | Financial credibility |

### Typography

- Primary Font: **Lora** (serif)
- Usage: 'Dana' dalam green, 'tharu' dalam gold

### Implementasi Tailwind

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      danatharu: {
        gold: '#D4AF37',
        green: '#0B5A3C',
        blue: '#0E3A66',
      }
    },
    fontFamily: {
      serif: ['Lora', 'serif'],
    }
  }
}
```

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS + komponen custom
- **Routing:** React Router v6
- **State Management:** Context API + localStorage
- **Data:** Mock data statis (simulasi API)
- **Linting:** ESLint + typescript-eslint

## Arsitektur Project

### Struktur Folder (Feature-based)

```
src/
├── features/
│   ├── landing/          # Homepage, hero carousel, value proposition
│   ├── catalog/          # Katalog BPR, filter, search, sorting
│   ├── comparison/       # Perbandingan side-by-side BPR/produk
│   ├── calculator/       # Simulasi kalkulator bunga deposito
│   └── enrollment/       # Form multi-step KYC + upload dokumen
├── components/           # Shared UI components (Button, Input, Card, Modal, Badge, dll)
├── contexts/             # React Context (ComparisonContext, EnrollmentContext)
├── services/             # Mock data & API simulation layer
├── types/                # TypeScript interfaces & types
├── hooks/                # Custom hooks shared (useLocalStorage, dll)
├── routes/               # Route definitions
├── App.tsx
└── main.tsx
```

### Routing

| Path | Fitur | Deskripsi |
|------|-------|-----------|
| `/` | Landing | Homepage dengan hero carousel, layanan, produk unggulan, cara kerja, FAQ |
| `/marketplace` | Katalog | Daftar BPR dengan filter, search, sorting |
| `/bpr/:id` | Detail BPR | Profil BPR dan tabel produk deposito |
| `/bandingkan` | Perbandingan | Tabel perbandingan side-by-side 2-4 BPR/produk |
| `/kalkulator` | Kalkulator | Simulasi perhitungan bunga deposito |
| `/daftar/:bprId/:produkId` | Enrollment | Form multi-step pendaftaran deposito |

## Data Model

### BPR (Bank Perkreditan Rakyat)

```typescript
interface BPR {
  id: string;
  nama: string;
  kota: string;
  provinsi: string;
  logo: string;
  rating: number;
  jumlahNasabah: number;
  terdaftarOJK: boolean;
  dijaminLPS: boolean;
  produkDeposito: ProdukDeposito[];
}
```

### Produk Deposito

```typescript
interface ProdukDeposito {
  id: string;
  bprId: string;
  tenor: number; // dalam bulan (1, 3, 6, 12)
  sukuBunga: number; // % per tahun
  minimalSetoran: number; // Rp
  maksimalSetoran: number; // Rp
  jenis: 'Konvensional' | 'Syariah';
  catatan: string; // info tambahan
}
```

### Filter

- Kota (dropdown, multi-select)
- Tenor (1, 3, 6, 12 bulan - checkbox)
- Suku bunga (range slider min-max)
- Jenis (Konvensional / Syariah - toggle)
- Minimal setoran (range)

## Fitur Detail

### 1. Landing Page (`/`)

- **Hero carousel** - Slider 3-4 slide dengan auto-rotate, navigasi dot + arrow prev/next:
  - Slide 1: Headline utama + value proposition + CTA "Mulai Sekarang"
  - Slide 2: Keunggulan (bunga tinggi, dijamin LPS, 100% digital)
  - Slide 3: Cara kerja (3 langkah mudah)
  - Slide 4: Trust signal (terdaftar OJK, dijamin LPS)
- **Section layanan** - Card grid: Deposito BPR, Deposito Konvensional, Kalkulator
- **Section produk unggulan** - BPR dengan bunga tertinggi / rating terbaik
- **Section cara kerja** - 3 langkah: Pilih → Bandingkan → Tempatkan Dana
- **Section FAQ** - Pertanyaan umum tentang deposito BPR
- **Footer** - Info OJK, LPS, kontak, link penting

### 2. Katalog BPR (`/marketplace`)

- Grid/card list BPR dengan info: nama, kota, bunga tertinggi, tenor tersedia, badge LPS/OJK
- Sidebar filter: kota, tenor, bunga (range), jenis (konvensional/syariah), minimal setoran
- Sorting: bunga tertinggi, rating, nama A-Z
- Search bar
- Pagination

### 3. Detail BPR (`/bpr/:id`)

- Profil BPR: logo, nama, kota, rating, status OJK/LPS
- Tabel produk deposito: tenor, bunga, min/max setoran, jenis
- Tombol "Ajukan Deposito" per produk → redirect ke `/daftar/:bprId/:produkId`

### 4. Perbandingan (`/bandingkan`)

- User bisa pilih 2-4 BPR/produk untuk dibandingkan
- Tabel perbandingan side-by-side: bunga, tenor, min setoran, rating, dll
- Data disimpan di ComparisonContext API

### 5. Kalkulator (`/kalkulator`)

- Input: nominal, pilih BPR/produk, tenor
- Output: bunga bruto, pajak 20%, bunga netto, total diterima
- Hasil bisa disimpan ke localStorage

### 6. Enrollment (`/daftar/:bprId/:produkId`)

Multi-step form dengan progress bar dan validasi per step:

- **Step 1: Data Pribadi** - nama, NIK, tanggal lahir, no HP, email
- **Step 2: Data Kontak & Pekerjaan** - alamat, kota, pekerjaan, penghasilan
- **Step 3: Upload Dokumen** - KTP, selfie dengan KTP
- **Step 4: Konfirmasi & Ringkasan** - review semua data yang diisi
- **Step 5: Sukses** - konfirmasi simulasi berhasil

Data disimpan di localStorage via EnrollmentContext.

## Komponen Shared

### UI Components (`src/components/`)

- `Button` - Primary, secondary, outline, ghost variants
- `Input` - Text, number, email, password dengan label dan error state
- `Select` - Dropdown select
- `Checkbox` - Checkbox dengan label
- `RangeSlider` - Range slider untuk filter
- `Card` - Container card dengan shadow dan border
- `Badge` - Label badge (LPS, OJK, Syariah, dll)
- `Modal` - Modal dialog
- `ProgressBar` - Progress indicator untuk multi-step form
- `Carousel` - Hero carousel dengan auto-rotate dan navigasi
- `Table` - Data table untuk perbandingan dan daftar produk
- `Toast` - Notification toast

### Custom Hooks (`src/hooks/`)

- `useLocalStorage` - Hook untuk persist data ke localStorage
- `useDebounce` - Hook untuk debounce input search

## Context API

### ComparisonContext

- State: array BPR/produk yang dipilih untuk dibandingkan
- Actions: `addToComparison`, `removeFromComparison`, `clearComparison`
- Max 4 items

### EnrollmentContext

- State: data form multi-step, current step, validation errors
- Actions: `nextStep`, `prevStep`, `updateStepData`, `submitEnrollment`
- Persist ke localStorage

## Error Handling

- Validasi form di setiap step enrollment
- Error state pada komponen input
- Fallback UI untuk data yang tidak ditemukan (404)
- Loading state saat simulasi API call

## Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Sidebar filter menjadi drawer/modal di mobile
- Grid layout adaptif (1 kolom mobile, 2-3 kolom desktop)
