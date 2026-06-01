import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ComparisonProvider } from './contexts/ComparisonContext'
import { EnrollmentProvider } from './contexts/EnrollmentContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import LandingPage from './pages/LandingPage'

const CatalogPage = lazy(() => import('./pages/CatalogPage'))
const BprDetailPage = lazy(() => import('./pages/BprDetailPage'))
const ComparisonPage = lazy(() => import('./pages/ComparisonPage'))
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'))
const EnrollmentPage = lazy(() => import('./pages/EnrollmentPage'))
const TentangKamiPage = lazy(() => import('./pages/TentangKamiPage'))
const KebijakanPrivasiPage = lazy(() => import('./pages/KebijakanPrivasiPage'))
const SyaratKetentuanPage = lazy(() => import('./pages/SyaratKetentuanPage'))
const BantuanPage = lazy(() => import('./pages/BantuanPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-danatharu-green border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Memuat...</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <ComparisonProvider>
      <EnrollmentProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/marketplace" element={<Suspense fallback={<PageLoader />}><CatalogPage /></Suspense>} />
              <Route path="/bpr/:id" element={<Suspense fallback={<PageLoader />}><BprDetailPage /></Suspense>} />
              <Route path="/bandingkan" element={<Suspense fallback={<PageLoader />}><ComparisonPage /></Suspense>} />
              <Route path="/kalkulator" element={<Suspense fallback={<PageLoader />}><CalculatorPage /></Suspense>} />
              <Route path="/daftar/:bprId/:produkId" element={<Suspense fallback={<PageLoader />}><EnrollmentPage /></Suspense>} />
              <Route path="/tentang" element={<Suspense fallback={<PageLoader />}><TentangKamiPage /></Suspense>} />
              <Route path="/privasi" element={<Suspense fallback={<PageLoader />}><KebijakanPrivasiPage /></Suspense>} />
              <Route path="/syarat" element={<Suspense fallback={<PageLoader />}><SyaratKetentuanPage /></Suspense>} />
              <Route path="/bantuan" element={<Suspense fallback={<PageLoader />}><BantuanPage /></Suspense>} />
              <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </EnrollmentProvider>
    </ComparisonProvider>
  )
}

export default App
