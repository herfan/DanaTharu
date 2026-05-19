# Danatharu MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive web frontend for Danatharu - a BPR deposit aggregator platform with catalog, comparison, calculator, and enrollment features.

**Architecture:** Feature-based folder structure with React + TypeScript + Vite. Tailwind CSS for styling. React Router for navigation. Context API + localStorage for state. Mock data for BPR products.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind CSS, React Router v6, Context API

---

## File Structure Overview

```
src/
├── types/index.ts
├── services/mockData.ts
├── hooks/useLocalStorage.ts
├── hooks/useDebounce.ts
├── contexts/ComparisonContext.tsx
├── contexts/EnrollmentContext.tsx
├── components/ui/ (Button, Input, Select, Checkbox, RangeSlider, Card, Badge, Modal, ProgressBar, Carousel, Table, Toast)
├── components/layout/ (Header, Footer)
├── features/landing/ (LandingPage, HeroCarousel, ServicesSection, FeaturedBPRSection, HowItWorksSection, FAQSection)
├── features/catalog/ (CatalogPage, BPRCard, BPRDetailPage, FilterSidebar, SearchBar, SortDropdown)
├── features/comparison/ (ComparisonPage, ComparisonTable)
├── features/calculator/ (CalculatorPage, CalculatorForm)
├── features/enrollment/ (EnrollmentPage, StepPersonalData, StepContactWork, StepDocuments, StepReview, StepSuccess)
├── routes/AppRoutes.tsx
├── App.tsx
└── main.tsx
```

---

## Task 1: Project Setup & Foundation

Create project scaffolding: TypeScript types, Tailwind config, base CSS, index.html, main.tsx, App.tsx. Install react-router-dom and tailwindcss.

**Key files to create:**
- `src/types/index.ts` - BPR, ProdukDeposito, ComparisonItem, EnrollmentData, EnrollmentStep interfaces
- `tailwind.config.js` - Brand colors (danatharu.gold: #D4AF37, danatharu.green: #0B5A3C, danatharu.blue: #0E3A66), Lora serif font
- `src/index.css` - Font imports (Inter + Lora), Tailwind directives, .container-danatharu utility
- `index.html` - HTML entry with logo favicon
- `src/main.tsx` - React entry with BrowserRouter
- `src/App.tsx` - Root component with Routes wrapper

**Types (src/types/index.ts):**
```typescript
export interface BPR {
  id: string; nama: string; kota: string; provinsi: string; logo: string;
  rating: number; jumlahNasabah: number; terdaftarOJK: boolean; dijaminLPS: boolean;
  produkDeposito: ProdukDeposito[];
}
export interface ProdukDeposito {
  id: string; bprId: string; tenor: number; sukuBunga: number;
  minimalSetoran: number; maksimalSetoran: number;
  jenis: 'Konvensional' | 'Syariah'; catatan: string;
}
export interface ComparisonItem { bpr: BPR; produk: ProdukDeposito; }
export interface EnrollmentData {
  step1: { nama: string; nik: string; tanggalLahir: string; noHP: string; email: string; };
  step2: { alamat: string; kota: string; pekerjaan: string; penghasilan: number; };
  step3: { ktpFile: File | null; selfieFile: File | null; };
  bprId: string; produkId: string;
}
export type EnrollmentStep = 1 | 2 | 3 | 4 | 5;
```

**Tailwind config:** Extend colors with danatharu.{gold,green,blue}, fontFamily with serif: ['Lora', 'serif'].

**CSS:** Import Inter + Lora from Google Fonts, @tailwind base/components/utilities, .container-danatharu = max-w-7xl mx-auto px-4 sm:px-6 lg:px-8.

**Verify:** `npm run build` succeeds.

---

## Task 2: Mock Data Service

Create `src/services/mockData.ts` with 5 mock BPRs (3 conventional, 2 syariah) across different cities (Jakarta, Bandung, Surabaya, Yogyakarta, Semarang). Each BPR has 4 produk with tenors 1, 3, 6, 12 months and varying interest rates (5.25%-7.25%).

**Helper functions:**
- `getBPRById(id)` - find BPR by id
- `getProdukById(bprId, produkId)` - find produk by bprId and produkId
- `getAllUniqueCities()` - sorted unique city names
- `getHighestRate(bpr)` - max sukuBunga across produk
- `getAvailableTenors(bpr)` - sorted unique tenors

**Verify:** `npm run build` succeeds.

---

## Task 3: Custom Hooks

**useLocalStorage (src/hooks/useLocalStorage.ts):** Generic hook that reads/writes to localStorage with JSON serialization. Returns [value, setValue]. Handles parse errors gracefully.

**useDebounce (src/hooks/useDebounce.ts):** Generic hook that debounces a value by specified delay (ms). Returns debounced value.

**Verify:** `npm run build` succeeds.

---

## Task 4: Context Providers

**ComparisonContext (src/contexts/ComparisonContext.tsx):**
- State: items (ComparisonItem[]) persisted to localStorage
- Actions: addToComparison (max 4), removeFromComparison, clearComparison, isInComparison
- Provider + useComparison hook

**EnrollmentContext (src/contexts/EnrollmentContext.tsx):**
- State: currentStep (1-5), formData (EnrollmentData), errors (Record<string, string>)
- Actions: nextStep, prevStep, updateStepData, submitEnrollment (validates all fields), resetEnrollment
- Provider takes bprId + produkId props
- Persist formData to localStorage
- Provider + useEnrollment hook

**Verify:** `npm run build` succeeds.

---

## Task 5: UI Components - Basic

Create in `src/components/ui/`:

**Button.tsx:** forwardRef, variants (primary=green, secondary=gold, outline, ghost), sizes (sm/md/ld), disabled state.

**Input.tsx:** forwardRef, label, error state (red border + message), focus ring danatharu-green.

**Select.tsx:** forwardRef, label, options array ({value, label}), error state.

**Checkbox.tsx:** forwardRef, label, danatharu-green check color.

**Card.tsx:** forwardRef, variants (default, elevated=shadow, bordered=border).

**Badge.tsx:** variants (lps=green, ojk=blue, syariah=emerald, konvensional=gray, default).

**Verify:** `npm run build` succeeds.

---

## Task 6: UI Components - Complex

Create in `src/components/ui/`:

**RangeSlider.tsx:** Dual range slider with min/max handles, label, formatValue callback.

**Modal.tsx:** isOpen/onClose, title, backdrop click to close, scrollable content.

**ProgressBar.tsx:** current/total, optional labels array, green progress bar.

**Carousel.tsx:** slides array, autoRotate with interval, prev/next arrows, dot navigation, smooth transition.

**Table.tsx:** Generic with columns (header, accessor as key or function), data array, keyField, alternating row colors.

**Toast.tsx:** message, type (success/error/info), auto-dismiss with duration, manual close.

**Verify:** `npm run build` succeeds.

---

## Task 7: Layout Components

**Header (src/components/layout/Header.tsx):** Sticky top, logo + "Danatharu" text (green+gold), nav links (Beranda, Marketplace, Kalkulator), comparison icon with badge count. Uses useLocation for active state.

**Footer (src/components/layout/Footer.tsx):** Dark blue background, logo, description, OJK/LPS badges, service links, contact info, copyright.

**Verify:** `npm run build` succeeds.

---

## Task 8: Landing Page Feature

**Files:**
- Create: `src/features/landing/LandingPage.tsx`
- Create: `src/features/landing/HeroCarousel.tsx`
- Create: `src/features/landing/ServicesSection.tsx`
- Create: `src/features/landing/FeaturedBPRSection.tsx`
- Create: `src/features/landing/HowItWorksSection.tsx`
- Create: `src/features/landing/FAQSection.tsx`

- [ ] **Step 1: Create HeroCarousel component**

Create `src/features/landing/HeroCarousel.tsx`:
```typescript
import Carousel from '../../components/ui/Carousel'
import Button from '../../components/ui/Button'
import { Link } from 'react-router-dom'

function HeroCarousel() {
  const slides = [
    <div key="slide-1" className="bg-gradient-to-r from-danatharu-green to-danatharu-blue text-white py-20 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Temukan Deposito BPR Terbaik</h1>
        <p className="text-lg md:text-xl mb-8 text-white/90">Bandingkan suku bunga dari ratusan BPR terpercaya di seluruh Indonesia. Aman, mudah, dan 100% digital.</p>
        <Link to="/marketplace"><Button variant="secondary" size="lg">Mulai Sekarang</Button></Link>
      </div>
    </div>,
    <div key="slide-2" className="bg-gradient-to-r from-danatharu-gold to-danatharu-green text-white py-20 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Keunggulan Danatharu</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-lg p-6"><div className="text-3xl font-bold text-danatharu-gold mb-2">s/d 7%</div><p className="text-sm">Bunga lebih tinggi dari bank umum</p></div>
          <div className="bg-white/10 rounded-lg p-6"><div className="text-3xl font-bold text-danatharu-gold mb-2">LPS</div><p className="text-sm">Dijamin Lembaga Penjamin Simpanan</p></div>
          <div className="bg-white/10 rounded-lg p-6"><div className="text-3xl font-bold text-danatharu-gold mb-2">100%</div><p className="text-sm">Proses digital tanpa ke bank</p></div>
        </div>
      </div>
    </div>,
    <div key="slide-3" className="bg-gradient-to-r from-danatharu-blue to-danatharu-green text-white py-20 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">3 Langkah Mudah</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <div className="flex flex-col items-center"><div className="w-12 h-12 bg-danatharu-gold rounded-full flex items-center justify-center text-xl font-bold mb-3">1</div><p className="text-sm">Pilih BPR</p></div>
          <div className="hidden md:block w-16 h-0.5 bg-white/30 self-center" />
          <div className="flex flex-col items-center"><div className="w-12 h-12 bg-danatharu-gold rounded-full flex items-center justify-center text-xl font-bold mb-3">2</div><p className="text-sm">Bandingkan</p></div>
          <div className="hidden md:block w-16 h-0.5 bg-white/30 self-center" />
          <div className="flex flex-col items-center"><div className="w-12 h-12 bg-danatharu-gold rounded-full flex items-center justify-center text-xl font-bold mb-3">3</div><p className="text-sm">Tempatkan Dana</p></div>
        </div>
      </div>
    </div>,
    <div key="slide-4" className="bg-gradient-to-r from-danatharu-green to-danatharu-gold text-white py-20 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Terpercaya & Terjamin</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-8">
          <div className="bg-white/10 rounded-lg p-6 text-center"><div className="text-2xl font-bold mb-2">OJK</div><p className="text-sm">Terdaftar & Diawasi Otoritas Jasa Keuangan</p></div>
          <div className="bg-white/10 rounded-lg p-6 text-center"><div className="text-2xl font-bold mb-2">LPS</div><p className="text-sm">Dijamin hingga Rp 2 Miliar per nasabah</p></div>
        </div>
      </div>
    </div>,
  ]

  return <Carousel slides={slides} autoRotate interval={6000} />
}

export default HeroCarousel
```

- [ ] **Step 2: Create ServicesSection component**

Create `src/features/landing/ServicesSection.tsx`:
```typescript
import Card from '../../components/ui/Card'
import { Link } from 'react-router-dom'

function ServicesSection() {
  const services = [
    { title: 'Deposito BPR', description: 'Akses ke ratusan produk deposito BPR dengan bunga kompetitif di seluruh Indonesia.', link: '/marketplace' },
    { title: 'Deposito Konvensional', description: 'Pilihan deposito dari bank konvensional dengan berbagai tenor dan suku bunga.', link: '/marketplace' },
    { title: 'Kalkulator Deposito', description: 'Hitung estimasi bunga dan keuntungan deposito Anda sebelum berinvestasi.', link: '/kalkulator' },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-danatharu">
        <h2 className="font-serif text-3xl font-bold text-center text-gray-900 mb-4">Layanan Kami</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Temukan berbagai layanan untuk membantu Anda berinvestasi deposito dengan lebih cerdas</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={index} to={service.link}>
              <Card variant="elevated" className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
```

- [ ] **Step 3: Create FeaturedBPRSection component**

Create `src/features/landing/FeaturedBPRSection.tsx`:
```typescript
import { Link } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { mockBPRs, getHighestRate } from '../../services/mockData'

function FeaturedBPRSection() {
  const featuredBPRs = [...mockBPRs].sort((a, b) => getHighestRate(b) - getHighestRate(a)).slice(0, 3)

  return (
    <section className="py-16">
      <div className="container-danatharu">
        <h2 className="font-serif text-3xl font-bold text-center text-gray-900 mb-4">BPR Unggulan</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">BPR dengan suku bunga tertinggi dan rating terbaik pilihan kami</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredBPRs.map(bpr => (
            <Card key={bpr.id} variant="elevated" className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-gray-900">{bpr.nama}</h3>
                  <p className="text-sm text-gray-500">{bpr.kota}, {bpr.provinsi}</p>
                </div>
                <div className="flex gap-1">
                  {bpr.dijaminLPS && <Badge variant="lps">LPS</Badge>}
                  {bpr.terdaftarOJK && <Badge variant="ojk">OJK</Badge>}
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-danatharu-green">{getHighestRate(bpr)}%</span>
                  <span className="text-sm text-gray-500 ml-1">/tahun</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span className="text-sm font-medium">{bpr.rating}</span>
                </div>
              </div>
              <Link to={`/bpr/${bpr.id}`}><Button variant="outline" className="w-full">Lihat Detail</Button></Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedBPRSection
```

- [ ] **Step 4: Create HowItWorksSection component**

Create `src/features/landing/HowItWorksSection.tsx`:
```typescript
function HowItWorksSection() {
  const steps = [
    { number: '01', title: 'Pilih BPR', description: 'Jelajahi katalog BPR dan filter berdasarkan kota, tenor, atau suku bunga yang Anda inginkan.' },
    { number: '02', title: 'Bandingkan', description: 'Bandingkan hingga 4 produk deposito side-by-side untuk menemukan yang paling sesuai.' },
    { number: '03', title: 'Tempatkan Dana', description: 'Lengkapi formulir pendaftaran dan upload dokumen. Proses 100% digital tanpa perlu ke bank.' },
  ]

  return (
    <section className="py-16 bg-danatharu-green/5">
      <div className="container-danatharu">
        <h2 className="font-serif text-3xl font-bold text-center text-gray-900 mb-4">Cara Kerja</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Tiga langkah mudah untuk memulai investasi deposito BPR Anda</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-danatharu-green text-white rounded-full text-2xl font-bold mb-4">{step.number}</div>
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
```

- [ ] **Step 5: Create FAQSection component**

Create `src/features/landing/FAQSection.tsx`:
```typescript
import { useState } from 'react'
import Card from '../../components/ui/Card'

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    { question: 'Apa itu Deposito BPR?', answer: 'Deposito BPR adalah produk simpanan berjangka di Bank Perkreditan Rakyat yang menawarkan suku bunga lebih tinggi dibandingkan bank umum. Deposito BPR dijamin oleh LPS hingga Rp 2 miliar per nasabah per bank.' },
    { question: 'Apakah deposito BPR aman?', answer: 'Ya, deposito BPR aman karena dijamin oleh Lembaga Penjamin Simpanan (LPS) dan BPR terdaftar diawasi oleh Otoritas Jasa Keuangan (OJK).' },
    { question: 'Berapa minimal setoran deposito BPR?', answer: 'Minimal setoran bervariasi tergantung BPR, umumnya mulai dari Rp 1.000.000. Cek detail produk di halaman marketplace kami.' },
    { question: 'Bagaimana cara membuka deposito BPR melalui Danatharu?', answer: 'Pilih BPR dan produk deposito yang diinginkan, lengkapi formulir pendaftaran online, upload dokumen (KTP dan selfie), dan tunggu konfirmasi dari BPR.' },
    { question: 'Apakah ada biaya menggunakan Danatharu?', answer: 'Danatharu tidak membebankan biaya kepada nasabah. Kami adalah platform aggregator yang menghubungkan nasabah dengan BPR.' },
  ]

  return (
    <section className="py-16">
      <div className="container-danatharu max-w-3xl">
        <h2 className="font-serif text-3xl font-bold text-center text-gray-900 mb-4">Pertanyaan Umum</h2>
        <p className="text-center text-gray-600 mb-12">Jawaban untuk pertanyaan yang sering ditanyakan tentang deposito BPR</p>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} variant="bordered">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between p-4 text-left">
                <span className="font-medium text-gray-900">{faq.question}</span>
                <svg className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {openIndex === index && <div className="px-4 pb-4 text-gray-600 text-sm">{faq.answer}</div>}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
```

- [ ] **Step 6: Create LandingPage component**

Create `src/features/landing/LandingPage.tsx`:
```typescript
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import HeroCarousel from './HeroCarousel'
import ServicesSection from './ServicesSection'
import FeaturedBPRSection from './FeaturedBPRSection'
import HowItWorksSection from './HowItWorksSection'
import FAQSection from './FAQSection'

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroCarousel />
        <ServicesSection />
        <FeaturedBPRSection />
        <HowItWorksSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage
```

- [ ] **Step 7: Verify landing page compiles**

Run: `npm run build`
Expected: Build succeeds

---

## Task 9: Catalog Feature

**Files:**
- Create: `src/features/catalog/CatalogPage.tsx`
- Create: `src/features/catalog/BPRCard.tsx`
- Create: `src/features/catalog/BPRDetailPage.tsx`
- Create: `src/features/catalog/FilterSidebar.tsx`
- Create: `src/features/catalog/SearchBar.tsx`
- Create: `src/features/catalog/SortDropdown.tsx`

- [ ] **Step 1: Create BPRCard component**

Create `src/features/catalog/BPRCard.tsx`:
```typescript
import { Link } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { BPR } from '../../types'
import { getHighestRate, getAvailableTenors } from '../../services/mockData'
import { useComparison } from '../../contexts/ComparisonContext'

interface BPRCardProps { bpr: BPR }

function BPRCard({ bpr }: BPRCardProps) {
  const { addToComparison, removeFromComparison, isInComparison } = useComparison()
  const highestRate = getHighestRate(bpr)
  const tenors = getAvailableTenors(bpr)
  const isCompared = isInComparison(bpr.id, bpr.produkDeposito[0]?.id || '')

  const toggleComparison = () => {
    if (isCompared) {
      removeFromComparison(bpr.id, bpr.produkDeposito[0]?.id || '')
    } else {
      addToComparison({ bpr, produk: bpr.produkDeposito[0] })
    }
  }

  return (
    <Card variant="elevated" className="p-4 flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <img src={bpr.logo} alt={bpr.nama} className="w-10 h-10 object-contain" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-lg font-semibold text-gray-900 truncate">{bpr.nama}</h3>
          <p className="text-sm text-gray-500">{bpr.kota}, {bpr.provinsi}</p>
        </div>
      </div>
      <div className="flex gap-2 mb-3">
        {bpr.dijaminLPS && <Badge variant="lps">LPS</Badge>}
        {bpr.terdaftarOJK && <Badge variant="ojk">OJK</Badge>}
        {bpr.produkDeposito.some(p => p.jenis === 'Syariah') && <Badge variant="syariah">Syariah</Badge>}
      </div>
      <div className="mb-4">
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-2xl font-bold text-danatharu-green">{highestRate}%</span>
          <span className="text-sm text-gray-500">/tahun</span>
        </div>
        <p className="text-xs text-gray-500">Tenor: {tenors.map(t => `${t} bln`).join(', ')}</p>
      </div>
      <div className="mt-auto flex gap-2">
        <Link to={`/bpr/${bpr.id}`} className="flex-1"><Button variant="primary" className="w-full" size="sm">Lihat Detail</Button></Link>
        <Button variant={isCompared ? 'secondary' : 'outline'} size="sm" onClick={toggleComparison} className="px-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        </Button>
      </div>
    </Card>
  )
}

export default BPRCard
```

- [ ] **Step 2: Create SearchBar component**

Create `src/features/catalog/SearchBar.tsx`:
```typescript
interface SearchBarProps { value: string; onChange: (value: string) => void }

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <input type="text" placeholder="Cari BPR..." value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-danatharu-green/50 focus:border-danatharu-green" />
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  )
}

export default SearchBar
```

- [ ] **Step 3: Create SortDropdown component**

Create `src/features/catalog/SortDropdown.tsx`:
```typescript
import Select from '../../components/ui/Select'

type SortOption = 'rate-desc' | 'rating-desc' | 'name-asc'

interface SortDropdownProps { value: SortOption; onChange: (value: SortOption) => void }

function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value as SortOption)}
      options={[{ value: 'rate-desc', label: 'Bunga Tertinggi' }, { value: 'rating-desc', label: 'Rating Tertinggi' }, { value: 'name-asc', label: 'Nama A-Z' }]} />
  )
}

export default SortDropdown
```

- [ ] **Step 4: Create FilterSidebar component**

Create `src/features/catalog/FilterSidebar.tsx`:
```typescript
import Card from '../../components/ui/Card'
import Checkbox from '../../components/ui/Checkbox'
import RangeSlider from '../../components/ui/RangeSlider'
import Button from '../../components/ui/Button'
import { getAllUniqueCities } from '../../services/mockData'

interface FilterState { cities: string[]; tenors: number[]; rateRange: [number, number]; jenis: string[] }

interface FilterSidebarProps { filters: FilterState; onChange: (filters: FilterState) => void; onReset: () => void; isOpen: boolean; onClose: () => void }

function FilterSidebar({ filters, onChange, onReset, isOpen, onClose }: FilterSidebarProps) {
  const cities = getAllUniqueCities()
  const tenors = [1, 3, 6, 12]

  const toggleCity = (city: string) => {
    const newCities = filters.cities.includes(city) ? filters.cities.filter(c => c !== city) : [...filters.cities, city]
    onChange({ ...filters, cities: newCities })
  }

  const toggleTenor = (tenor: number) => {
    const newTenors = filters.tenors.includes(tenor) ? filters.tenors.filter(t => t !== tenor) : [...filters.tenors, tenor]
    onChange({ ...filters, tenors: newTenors })
  }

  const toggleJenis = (jenis: string) => {
    const newJenis = filters.jenis.includes(jenis) ? filters.jenis.filter(j => j !== jenis) : [...filters.jenis, jenis]
    onChange({ ...filters, jenis: newJenis })
  }

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold">Filter</h3>
        <Button variant="ghost" size="sm" onClick={onReset}>Reset</Button>
      </div>
      <div>
        <h4 className="font-medium text-sm text-gray-700 mb-2">Kota</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {cities.map(city => <Checkbox key={city} label={city} checked={filters.cities.includes(city)} onChange={() => toggleCity(city)} />)}
        </div>
      </div>
      <div>
        <h4 className="font-medium text-sm text-gray-700 mb-2">Tenor (bulan)</h4>
        <div className="space-y-2">
          {tenors.map(tenor => <Checkbox key={tenor} label={`${tenor} bulan`} checked={filters.tenors.includes(tenor)} onChange={() => toggleTenor(tenor)} />)}
        </div>
      </div>
      <div>
        <RangeSlider label="Suku Bunga (%/tahun)" min={4} max={8} step={0.25} value={filters.rateRange} onChange={(value) => onChange({ ...filters, rateRange: value })} formatValue={(v) => `${v}%`} />
      </div>
      <div>
        <h4 className="font-medium text-sm text-gray-700 mb-2">Jenis</h4>
        <div className="space-y-2">
          <Checkbox label="Konvensional" checked={filters.jenis.includes('Konvensional')} onChange={() => toggleJenis('Konvensional')} />
          <Checkbox label="Syariah" checked={filters.jenis.includes('Syariah')} onChange={() => toggleJenis('Syariah')} />
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="hidden lg:block"><Card variant="bordered" className="p-4 sticky top-24">{content}</Card></div>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={onClose} />
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-semibold">Filter</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              {content}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FilterSidebar
```

- [ ] **Step 5: Create CatalogPage component**

Create `src/features/catalog/CatalogPage.tsx`:
```typescript
import { useState, useMemo } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import BPRCard from './BPRCard'
import FilterSidebar from './FilterSidebar'
import SearchBar from './SearchBar'
import SortDropdown from './SortDropdown'
import Button from '../../components/ui/Button'
import { mockBPRs, getHighestRate, getAvailableTenors } from '../../services/mockData'
import { useDebounce } from '../../hooks/useDebounce'

type SortOption = 'rate-desc' | 'rating-desc' | 'name-asc'
interface FilterState { cities: string[]; tenors: number[]; rateRange: [number, number]; jenis: string[] }
const initialFilters: FilterState = { cities: [], tenors: [], rateRange: [4, 8], jenis: [] }

function CatalogPage() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const [sort, setSort] = useState<SortOption>('rate-desc')
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [filterOpen, setFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const filteredBPRs = useMemo(() => {
    let result = [...mockBPRs]
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase()
      result = result.filter(bpr => bpr.nama.toLowerCase().includes(searchLower) || bpr.kota.toLowerCase().includes(searchLower))
    }
    if (filters.cities.length > 0) result = result.filter(bpr => filters.cities.includes(bpr.kota))
    if (filters.tenors.length > 0) result = result.filter(bpr => filters.tenors.some(tenor => getAvailableTenors(bpr).includes(tenor)))
    if (filters.rateRange[0] > 4 || filters.rateRange[1] < 8) {
      result = result.filter(bpr => { const rate = getHighestRate(bpr); return rate >= filters.rateRange[0] && rate <= filters.rateRange[1] })
    }
    if (filters.jenis.length > 0) result = result.filter(bpr => filters.jenis.some(jenis => bpr.produkDeposito.some(p => p.jenis === jenis)))
    switch (sort) {
      case 'rate-desc': result.sort((a, b) => getHighestRate(b) - getHighestRate(a)); break
      case 'rating-desc': result.sort((a, b) => b.rating - a.rating); break
      case 'name-asc': result.sort((a, b) => a.nama.localeCompare(b.nama)); break
    }
    return result
  }, [debouncedSearch, sort, filters])

  const totalPages = Math.ceil(filteredBPRs.length / itemsPerPage)
  const paginatedBPRs = filteredBPRs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const resetFilters = () => { setFilters(initialFilters); setSearch(''); setSort('rate-desc'); setCurrentPage(1) }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container-danatharu py-8">
        <div className="mb-6">
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">Marketplace Deposito</h1>
          <p className="text-gray-600">Temukan BPR terbaik untuk deposito Anda</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-72 flex-shrink-0">
            <FilterSidebar filters={filters} onChange={setFilters} onReset={resetFilters} isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1"><SearchBar value={search} onChange={setSearch} /></div>
              <div className="w-full sm:w-48"><SortDropdown value={sort} onChange={setSort} /></div>
              <Button variant="outline" size="md" onClick={() => setFilterOpen(true)} className="lg:hidden">Filter</Button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Menampilkan {filteredBPRs.length} BPR</p>
            {paginatedBPRs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {paginatedBPRs.map(bpr => <BPRCard key={bpr.id} bpr={bpr} />)}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button key={page} variant={currentPage === page ? 'primary' : 'outline'} size="sm" onClick={() => setCurrentPage(page)}>{page}</Button>
                    ))}
                    <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Tidak ada BPR yang sesuai dengan filter Anda</p>
                <Button variant="ghost" onClick={resetFilters} className="mt-4">Reset Filter</Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CatalogPage
```

- [ ] **Step 6: Create BPRDetailPage component**

Create `src/features/catalog/BPRDetailPage.tsx`:
```typescript
import { useParams, Link } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Table from '../../components/ui/Table'
import { getBPRById } from '../../services/mockData'
import { useComparison } from '../../contexts/ComparisonContext'

function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

function BPRDetailPage() {
  const { id } = useParams<{ id: string }>()
  const bpr = id ? getBPRById(id) : undefined
  const { addToComparison, removeFromComparison, isInComparison } = useComparison()

  if (!bpr) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header /><main className="flex-1 container-danatharu py-16 text-center">
          <h1 className="font-serif text-2xl font-bold text-gray-900 mb-4">BPR Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-8">BPR yang Anda cari tidak tersedia</p>
          <Link to="/marketplace"><Button variant="primary">Kembali ke Marketplace</Button></Link>
        </main><Footer />
      </div>
    )
  }

  const columns = [
    { header: 'Tenor', accessor: (p: any) => `${p.tenor} bulan` },
    { header: 'Suku Bunga', accessor: (p: any) => `${p.sukuBunga}% /tahun` },
    { header: 'Min. Setoran', accessor: (p: any) => formatRupiah(p.minimalSetoran) },
    { header: 'Max. Setoran', accessor: (p: any) => formatRupiah(p.maksimalSetoran) },
    { header: 'Jenis', accessor: (p: any) => <Badge variant={p.jenis === 'Syariah' ? 'syariah' : 'konvensional'}>{p.jenis}</Badge> },
    {
      header: 'Aksi',
      accessor: (p: any) => (
        <div className="flex gap-2">
          <Link to={`/daftar/${bpr.id}/${p.id}`}><Button variant="primary" size="sm">Ajukan</Button></Link>
          <Button variant={isInComparison(bpr.id, p.id) ? 'secondary' : 'outline'} size="sm" onClick={() => {
            if (isInComparison(bpr.id, p.id)) { removeFromComparison(bpr.id, p.id) } else { addToComparison({ bpr, produk: p }) }
          }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container-danatharu py-8">
        <Link to="/marketplace" className="inline-flex items-center text-danatharu-green hover:underline mb-6">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>Kembali ke Marketplace
        </Link>
        <Card variant="elevated" className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <img src={bpr.logo} alt={bpr.nama} className="w-20 h-20 object-contain" />
            </div>
            <div className="flex-1">
              <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">{bpr.nama}</h1>
              <p className="text-gray-600 mb-4">{bpr.kota}, {bpr.provinsi}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {bpr.dijaminLPS && <Badge variant="lps">Dijamin LPS</Badge>}
                {bpr.terdaftarOJK && <Badge variant="ojk">Terdaftar OJK</Badge>}
                {bpr.produkDeposito.some(p => p.jenis === 'Syariah') && <Badge variant="syariah">Tersedia Syariah</Badge>}
              </div>
              <div className="flex gap-8">
                <div><span className="text-sm text-gray-500">Rating</span><div className="flex items-center gap-1"><svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg><span className="font-semibold">{bpr.rating}</span></div></div>
                <div><span className="text-sm text-gray-500">Jumlah Nasabah</span><p className="font-semibold">{bpr.jumlahNasabah.toLocaleString('id-ID')}</p></div>
              </div>
            </div>
          </div>
        </Card>
        <Card variant="elevated" className="p-6">
          <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">Produk Deposito</h2>
          <Table columns={columns} data={bpr.produkDeposito} keyField="id" />
        </Card>
      </main>
      <Footer />
    </div>
  )
}

export default BPRDetailPage
```

- [ ] **Step 7: Verify catalog compiles**

Run: `npm run build`
Expected: Build succeeds

---

## Task 10: Comparison Feature

**Files:**
- Create: `src/features/comparison/ComparisonPage.tsx`
- Create: `src/features/comparison/ComparisonTable.tsx`

- [ ] **Step 1: Create ComparisonTable component**

Create `src/features/comparison/ComparisonTable.tsx`:
```typescript
import { ComparisonItem } from '../../types'

interface ComparisonTableProps { items: ComparisonItem[]; onRemove: (bprId: string, produkId: string) => void }

function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

function ComparisonTable({ items, onRemove }: ComparisonTableProps) {
  if (items.length === 0) return null

  const rows = [
    { label: 'Nama BPR', getValue: (item: ComparisonItem) => item.bpr.nama },
    { label: 'Kota', getValue: (item: ComparisonItem) => `${item.bpr.kota}, ${item.bpr.provinsi}` },
    { label: 'Rating', getValue: (item: ComparisonItem) => item.bpr.rating.toString() },
    { label: 'Tenor', getValue: (item: ComparisonItem) => `${item.produk.tenor} bulan` },
    { label: 'Suku Bunga', getValue: (item: ComparisonItem) => `${item.produk.sukuBunga}% /tahun` },
    { label: 'Min. Setoran', getValue: (item: ComparisonItem) => formatRupiah(item.produk.minimalSetoran) },
    { label: 'Max. Setoran', getValue: (item: ComparisonItem) => formatRupiah(item.produk.maksimalSetoran) },
    { label: 'Jenis', getValue: (item: ComparisonItem) => item.produk.jenis },
    { label: 'Catatan', getValue: (item: ComparisonItem) => item.produk.catatan },
    { label: 'Dijamin LPS', getValue: (item: ComparisonItem) => item.bpr.dijaminLPS ? 'Ya' : 'Tidak' },
    { label: 'Terdaftar OJK', getValue: (item: ComparisonItem) => item.bpr.terdaftarOJK ? 'Ya' : 'Tidak' },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b bg-gray-50 w-40">Spesifikasi</th>
            {items.map((item, index) => (
              <th key={index} className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b bg-gray-50 min-w-[200px]">
                <div className="flex items-center justify-between">
                  <span>Produk {index + 1}</span>
                  <button onClick={() => onRemove(item.bpr.id, item.produk.id)} className="text-gray-400 hover:text-red-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-3 text-sm font-medium text-gray-700 border-b">{row.label}</td>
              {items.map((item, colIndex) => (
                <td key={colIndex} className="px-4 py-3 text-sm text-gray-700 border-b">{row.getValue(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ComparisonTable
```

- [ ] **Step 2: Create ComparisonPage component**

Create `src/features/comparison/ComparisonPage.tsx`:
```typescript
import { Link } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import ComparisonTable from './ComparisonTable'
import { useComparison } from '../../contexts/ComparisonContext'

function ComparisonPage() {
  const { items, removeFromComparison, clearComparison } = useComparison()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header /><main className="flex-1 container-danatharu py-16 text-center">
          <h1 className="font-serif text-2xl font-bold text-gray-900 mb-4">Belum Ada Perbandingan</h1>
          <p className="text-gray-600 mb-8">Pilih produk dari marketplace untuk dibandingkan</p>
          <Link to="/marketplace"><Button variant="primary">Ke Marketplace</Button></Link>
        </main><Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container-danatharu py-8">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">Bandingkan Produk</h1><p className="text-gray-600">Membandingkan {items.length} produk</p></div>
          <Button variant="outline" onClick={clearComparison}>Hapus Semua</Button>
        </div>
        <Card variant="elevated" className="p-6"><ComparisonTable items={items} onRemove={removeFromComparison} /></Card>
        <div className="mt-6 flex justify-center"><Link to="/marketplace"><Button variant="outline">Tambah Produk Lain</Button></Link></div>
      </main>
      <Footer />
    </div>
  )
}

export default ComparisonPage
```

- [ ] **Step 3: Verify comparison compiles**

Run: `npm run build`
Expected: Build succeeds

---

## Task 11: Calculator Feature

**Files:**
- Create: `src/features/calculator/CalculatorPage.tsx`
- Create: `src/features/calculator/CalculatorForm.tsx`

- [ ] **Step 1: Create CalculatorForm component**

Create `src/features/calculator/CalculatorForm.tsx`:
```typescript
import { useState } from 'react'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import { mockBPRs } from '../../services/mockData'
import { useLocalStorage } from '../../hooks/useLocalStorage'

interface CalculationResult { nominal: number; tenor: number; sukuBunga: number; bungaBruto: number; pajak: number; bungaNetto: number; totalDiterima: number }

function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

function CalculatorForm() {
  const [nominal, setNominal] = useState('')
  const [selectedBpr, setSelectedBpr] = useState('')
  const [selectedProduk, setSelectedProduk] = useState('')
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [savedResults, setSavedResults] = useLocalStorage<CalculationResult[]>('danatharu-calculator', [])

  const bprOptions = mockBPRs.map(bpr => ({ value: bpr.id, label: bpr.nama }))
  const currentBpr = mockBPRs.find(bpr => bpr.id === selectedBpr)
  const produkOptions = currentBpr ? currentBpr.produkDeposito.map(p => ({ value: p.id, label: `${p.tenor} bulan - ${p.sukuBunga}%` })) : []
  const currentProduk = currentBpr?.produkDeposito.find(p => p.id === selectedProduk)

  const calculate = () => {
    if (!nominal || !selectedProduk || !currentProduk) return
    const amount = Number(nominal)
    const bungaBruto = amount * (currentProduk.sukuBunga / 100) * (currentProduk.tenor / 12)
    const pajak = bungaBruto * 0.2
    const bungaNetto = bungaBruto - pajak
    setResult({ nominal: amount, tenor: currentProduk.tenor, sukuBunga: currentProduk.sukuBunga, bungaBruto, pajak, bungaNetto, totalDiterima: amount + bungaNetto })
  }

  const saveResult = () => { if (result) setSavedResults(prev => [...prev, result]) }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card variant="elevated" className="p-6">
        <h2 className="font-serif text-xl font-semibold text-gray-900 mb-6">Simulasi Deposito</h2>
        <div className="space-y-4">
          <Input label="Nominal (Rp)" type="number" placeholder="Masukkan nominal" value={nominal} onChange={(e) => setNominal(e.target.value)} />
          <Select label="Pilih BPR" value={selectedBpr} onChange={(e) => { setSelectedBpr(e.target.value); setSelectedProduk('') }} options={[{ value: '', label: 'Pilih BPR' }, ...bprOptions]} />
          <Select label="Pilih Produk" value={selectedProduk} onChange={(e) => setSelectedProduk(e.target.value)} options={[{ value: '', label: 'Pilih Produk' }, ...produkOptions]} disabled={!selectedBpr} />
          <Button variant="primary" className="w-full" onClick={calculate} disabled={!nominal || !selectedProduk}>Hitung</Button>
        </div>
      </Card>
      <div>
        {result && (
          <Card variant="elevated" className="p-6 mb-6">
            <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">Hasil Simulasi</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b"><span className="text-gray-600">Nominal</span><span className="font-medium">{formatRupiah(result.nominal)}</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-600">Tenor</span><span className="font-medium">{result.tenor} bulan</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-600">Suku Bunga</span><span className="font-medium">{result.sukuBunga}% /tahun</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-600">Bunga Bruto</span><span className="font-medium">{formatRupiah(result.bungaBruto)}</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-600">Pajak (20%)</span><span className="font-medium text-red-600">-{formatRupiah(result.pajak)}</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-600">Bunga Netto</span><span className="font-medium text-danatharu-green">{formatRupiah(result.bungaNetto)}</span></div>
              <div className="flex justify-between py-2"><span className="text-gray-600 font-semibold">Total Diterima</span><span className="font-bold text-danatharu-green text-lg">{formatRupiah(result.totalDiterima)}</span></div>
            </div>
            <Button variant="secondary" className="w-full mt-4" onClick={saveResult}>Simpan Hasil</Button>
          </Card>
        )}
        {savedResults.length > 0 && (
          <Card variant="bordered" className="p-6">
            <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">Riwayat Simulasi</h3>
            <div className="space-y-2">
              {savedResults.map((r, index) => (
                <div key={index} className="flex justify-between text-sm py-2 border-b last:border-0">
                  <span>{formatRupiah(r.nominal)} - {r.tenor} bln</span>
                  <span className="text-danatharu-green font-medium">{formatRupiah(r.totalDiterima)}</span>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="mt-4" onClick={() => setSavedResults([])}>Hapus Riwayat</Button>
          </Card>
        )}
      </div>
    </div>
  )
}

export default CalculatorForm
```

- [ ] **Step 2: Create CalculatorPage component**

Create `src/features/calculator/CalculatorPage.tsx`:
```typescript
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import CalculatorForm from './CalculatorForm'

function CalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container-danatharu py-8">
        <div className="mb-8"><h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">Kalkulator Deposito</h1><p className="text-gray-600">Hitung estimasi keuntungan deposito Anda</p></div>
        <CalculatorForm />
      </main>
      <Footer />
    </div>
  )
}

export default CalculatorPage
```

- [ ] **Step 3: Verify calculator compiles**

Run: `npm run build`
Expected: Build succeeds

---

## Task 12: Enrollment Feature

**Files:**
- Create: `src/features/enrollment/EnrollmentPage.tsx`
- Create: `src/features/enrollment/StepPersonalData.tsx`
- Create: `src/features/enrollment/StepContactWork.tsx`
- Create: `src/features/enrollment/StepDocuments.tsx`
- Create: `src/features/enrollment/StepReview.tsx`
- Create: `src/features/enrollment/StepSuccess.tsx`

- [ ] **Step 1: Create StepPersonalData component**

Create `src/features/enrollment/StepPersonalData.tsx`:
```typescript
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useEnrollment } from '../../contexts/EnrollmentContext'

function StepPersonalData() {
  const { formData, updateStepData, errors, nextStep } = useEnrollment()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!formData.step1.nama) newErrors.nama = 'Nama wajib diisi'
    if (!formData.step1.nik || formData.step1.nik.length !== 16) newErrors.nik = 'NIK harus 16 digit'
    if (!formData.step1.tanggalLahir) newErrors.tanggalLahir = 'Tanggal lahir wajib diisi'
    if (!formData.step1.noHP) newErrors.noHP = 'No HP wajib diisi'
    if (!formData.step1.email) newErrors.email = 'Email wajib diisi'
    if (Object.keys(newErrors).length === 0) nextStep()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">Data Pribadi</h2>
      <Input label="Nama Lengkap" value={formData.step1.nama} onChange={(e) => updateStepData('step1', { nama: e.target.value })} error={errors.nama} placeholder="Sesuai KTP" />
      <Input label="NIK" value={formData.step1.nik} onChange={(e) => updateStepData('step1', { nik: e.target.value.replace(/\D/g, '').slice(0, 16) })} error={errors.nik} placeholder="16 digit NIK" maxLength={16} />
      <Input label="Tanggal Lahir" type="date" value={formData.step1.tanggalLahir} onChange={(e) => updateStepData('step1', { tanggalLahir: e.target.value })} error={errors.tanggalLahir} />
      <Input label="No. HP" type="tel" value={formData.step1.noHP} onChange={(e) => updateStepData('step1', { noHP: e.target.value })} error={errors.noHP} placeholder="08xxxxxxxxxx" />
      <Input label="Email" type="email" value={formData.step1.email} onChange={(e) => updateStepData('step1', { email: e.target.value })} error={errors.email} placeholder="email@contoh.com" />
      <div className="flex justify-end pt-4"><Button variant="primary" type="submit">Selanjutnya</Button></div>
    </form>
  )
}

export default StepPersonalData
```

- [ ] **Step 2: Create StepContactWork component**

Create `src/features/enrollment/StepContactWork.tsx`:
```typescript
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useEnrollment } from '../../contexts/EnrollmentContext'

function StepContactWork() {
  const { formData, updateStepData, errors, nextStep, prevStep } = useEnrollment()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!formData.step2.alamat) newErrors.alamat = 'Alamat wajib diisi'
    if (!formData.step2.kota) newErrors.kota = 'Kota wajib diisi'
    if (!formData.step2.pekerjaan) newErrors.pekerjaan = 'Pekerjaan wajib diisi'
    if (Object.keys(newErrors).length === 0) nextStep()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">Data Kontak & Pekerjaan</h2>
      <Input label="Alamat Lengkap" value={formData.step2.alamat} onChange={(e) => updateStepData('step2', { alamat: e.target.value })} error={errors.alamat} placeholder="Jalan, RT/RW, Kelurahan, Kecamatan" />
      <Input label="Kota" value={formData.step2.kota} onChange={(e) => updateStepData('step2', { kota: e.target.value })} error={errors.kota} placeholder="Kota domisili" />
      <Input label="Pekerjaan" value={formData.step2.pekerjaan} onChange={(e) => updateStepData('step2', { pekerjaan: e.target.value })} error={errors.pekerjaan} placeholder="Jenis pekerjaan" />
      <Input label="Penghasilan per Bulan (Rp)" type="number" value={formData.step2.penghasilan || ''} onChange={(e) => updateStepData('step2', { penghasilan: Number(e.target.value) })} placeholder="Contoh: 5000000" />
      <div className="flex justify-between pt-4">
        <Button variant="outline" type="button" onClick={prevStep}>Kembali</Button>
        <Button variant="primary" type="submit">Selanjutnya</Button>
      </div>
    </form>
  )
}

export default StepContactWork
```

- [ ] **Step 3: Create StepDocuments component**

Create `src/features/enrollment/StepDocuments.tsx`:
```typescript
import { useRef } from 'react'
import Button from '../../components/ui/Button'
import { useEnrollment } from '../../contexts/EnrollmentContext'

function StepDocuments() {
  const { formData, updateStepData, errors, nextStep, prevStep } = useEnrollment()
  const ktpRef = useRef<HTMLInputElement>(null)
  const selfieRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (field: 'ktpFile' | 'selfieFile', file: File | null) => {
    updateStepData('step3', { [field]: file })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!formData.step3.ktpFile) newErrors.ktpFile = 'Upload KTP wajib'
    if (!formData.step3.selfieFile) newErrors.selfieFile = 'Upload selfie wajib'
    if (Object.keys(newErrors).length === 0) nextStep()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">Upload Dokumen</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Foto KTP</label>
        <div onClick={() => ktpRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-danatharu-green transition-colors">
          {formData.step3.ktpFile ? (<div><p className="text-danatharu-green font-medium">{formData.step3.ktpFile.name}</p><p className="text-sm text-gray-500 mt-1">Klik untuk mengganti</p></div>) : (<div><svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg><p className="text-gray-600">Klik untuk upload KTP</p><p className="text-sm text-gray-400 mt-1">JPG, PNG (max 5MB)</p></div>)}
        </div>
        <input ref={ktpRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('ktpFile', e.target.files?.[0] || null)} />
        {errors.ktpFile && <p className="mt-1 text-sm text-red-500">{errors.ktpFile}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Selfie dengan KTP</label>
        <div onClick={() => selfieRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-danatharu-green transition-colors">
          {formData.step3.selfieFile ? (<div><p className="text-danatharu-green font-medium">{formData.step3.selfieFile.name}</p><p className="text-sm text-gray-500 mt-1">Klik untuk mengganti</p></div>) : (<div><svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg><p className="text-gray-600">Klik untuk upload selfie</p><p className="text-sm text-gray-400 mt-1">JPG, PNG (max 5MB)</p></div>)}
        </div>
        <input ref={selfieRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('selfieFile', e.target.files?.[0] || null)} />
        {errors.selfieFile && <p className="mt-1 text-sm text-red-500">{errors.selfieFile}</p>}
      </div>
      <div className="flex justify-between pt-4">
        <Button variant="outline" type="button" onClick={prevStep}>Kembali</Button>
        <Button variant="primary" type="submit">Selanjutnya</Button>
      </div>
    </form>
  )
}

export default StepDocuments
```

- [ ] **Step 4: Create StepReview component**

Create `src/features/enrollment/StepReview.tsx`:
```typescript
import Button from '../../components/ui/Button'
import { useEnrollment } from '../../contexts/EnrollmentContext'
import { getBPRById, getProdukById } from '../../services/mockData'

function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

function StepReview() {
  const { formData, prevStep, submitEnrollment, nextStep } = useEnrollment()
  const bpr = getBPRById(formData.bprId)
  const produk = formData.bprId && formData.produkId ? getProdukById(formData.bprId, formData.produkId) : undefined

  const handleSubmit = () => {
    if (submitEnrollment()) nextStep()
  }

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">Konfirmasi Data</h2>
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Data Pribadi</h3>
          <p className="text-sm text-gray-600">Nama: {formData.step1.nama}</p>
          <p className="text-sm text-gray-600">NIK: {formData.step1.nik}</p>
          <p className="text-sm text-gray-600">Tanggal Lahir: {formData.step1.tanggalLahir}</p>
          <p className="text-sm text-gray-600">No HP: {formData.step1.noHP}</p>
          <p className="text-sm text-gray-600">Email: {formData.step1.email}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Data Kontak & Pekerjaan</h3>
          <p className="text-sm text-gray-600">Alamat: {formData.step2.alamat}</p>
          <p className="text-sm text-gray-600">Kota: {formData.step2.kota}</p>
          <p className="text-sm text-gray-600">Pekerjaan: {formData.step2.pekerjaan}</p>
          <p className="text-sm text-gray-600">Penghasilan: {formatRupiah(formData.step2.penghasilan)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Dokumen</h3>
          <p className="text-sm text-gray-600">KTP: {formData.step3.ktpFile?.name || 'Belum diupload'}</p>
          <p className="text-sm text-gray-600">Selfie: {formData.step3.selfieFile?.name || 'Belum diupload'}</p>
        </div>
        {bpr && produk && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Produk Deposito</h3>
            <p className="text-sm text-gray-600">BPR: {bpr.nama}</p>
            <p className="text-sm text-gray-600">Tenor: {produk.tenor} bulan</p>
            <p className="text-sm text-gray-600">Suku Bunga: {produk.sukuBunga}% /tahun</p>
          </div>
        )}
      </div>
      <div className="flex justify-between pt-4">
        <Button variant="outline" type="button" onClick={prevStep}>Kembali</Button>
        <Button variant="primary" type="button" onClick={handleSubmit}>Ajukan Deposito</Button>
      </div>
    </div>
  )
}

export default StepReview
```

- [ ] **Step 5: Create StepSuccess component**

Create `src/features/enrollment/StepSuccess.tsx`:
```typescript
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { useEnrollment } from '../../contexts/EnrollmentContext'

function StepSuccess() {
  const { resetEnrollment } = useEnrollment()

  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Pengajuan Berhasil!</h2>
      <p className="text-gray-600 mb-2">Pengajuan deposito Anda telah berhasil dikirim.</p>
      <p className="text-gray-600 mb-8">Tim BPR akan menghubungi Anda dalam 1x24 jam untuk proses selanjutnya.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/marketplace"><Button variant="primary">Kembali ke Marketplace</Button></Link>
        <Button variant="outline" onClick={resetEnrollment}>Ajukan Deposito Lain</Button>
      </div>
    </div>
  )
}

export default StepSuccess
```

- [ ] **Step 6: Create EnrollmentPage component**

Create `src/features/enrollment/EnrollmentPage.tsx`:
```typescript
import { useParams, Link } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import Card from '../../components/ui/Card'
import ProgressBar from '../../components/ui/ProgressBar'
import StepPersonalData from './StepPersonalData'
import StepContactWork from './StepContactWork'
import StepDocuments from './StepDocuments'
import StepReview from './StepReview'
import StepSuccess from './StepSuccess'
import { EnrollmentProvider, useEnrollment } from '../../contexts/EnrollmentContext'
import { getBPRById } from '../../services/mockData'

function EnrollmentContent() {
  const { currentStep } = useEnrollment()
  const stepLabels = ['Data Pribadi', 'Kontak', 'Dokumen', 'Konfirmasi', 'Selesai']

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <StepPersonalData />
      case 2: return <StepContactWork />
      case 3: return <StepDocuments />
      case 4: return <StepReview />
      case 5: return <StepSuccess />
      default: return <StepPersonalData />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container-danatharu py-8 max-w-2xl">
        <Link to="/marketplace" className="inline-flex items-center text-danatharu-green hover:underline mb-6">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>Kembali ke Marketplace
        </Link>
        <Card variant="elevated" className="p-6">
          {currentStep < 5 && <ProgressBar current={currentStep} total={5} labels={stepLabels} />}
          <div className="mt-6">{renderStep()}</div>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

function EnrollmentPage() {
  const { bprId, produkId } = useParams<{ bprId: string; produkId: string }>()
  const bpr = bprId ? getBPRById(bprId) : undefined

  if (!bpr || !bprId || !produkId) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header /><main className="flex-1 container-danatharu py-16 text-center">
          <h1 className="font-serif text-2xl font-bold text-gray-900 mb-4">Produk Tidak Ditemukan</h1>
          <Link to="/marketplace"><Button variant="primary">Kembali ke Marketplace</Button></Link>
        </main><Footer />
      </div>
    )
  }

  return (
    <EnrollmentProvider bprId={bprId} produkId={produkId}>
      <EnrollmentContent />
    </EnrollmentProvider>
  )
}

export default EnrollmentPage
```

- [ ] **Step 7: Verify enrollment compiles**

Run: `npm run build`
Expected: Build succeeds

---

## Task 13: Routes & App Integration

**Files:**
- Create: `src/routes/AppRoutes.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create AppRoutes component**

Create `src/routes/AppRoutes.tsx`:
```typescript
import { Routes, Route } from 'react-router-dom'
import { ComparisonProvider } from '../contexts/ComparisonContext'
import LandingPage from '../features/landing/LandingPage'
import CatalogPage from '../features/catalog/CatalogPage'
import BPRDetailPage from '../features/catalog/BPRDetailPage'
import ComparisonPage from '../features/comparison/ComparisonPage'
import CalculatorPage from '../features/calculator/CalculatorPage'
import EnrollmentPage from '../features/enrollment/EnrollmentPage'

function AppRoutes() {
  return (
    <ComparisonProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/marketplace" element={<CatalogPage />} />
        <Route path="/bpr/:id" element={<BPRDetailPage />} />
        <Route path="/bandingkan" element={<ComparisonPage />} />
        <Route path="/kalkulator" element={<CalculatorPage />} />
        <Route path="/daftar/:bprId/:produkId" element={<EnrollmentPage />} />
      </Routes>
    </ComparisonProvider>
  )
}

export default AppRoutes
```

- [ ] **Step 2: Update App.tsx**

Modify `src/App.tsx`:
```typescript
import { Routes, Route } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </div>
  )
}

export default App
```

- [ ] **Step 3: Final build verification**

Run: `npm run build`
Expected: Build succeeds without errors

Run: `npm run dev`
Expected: Dev server starts, all routes accessible
