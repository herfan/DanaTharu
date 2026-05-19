import { Routes, Route } from 'react-router-dom'
import { ComparisonProvider } from './contexts/ComparisonContext'
import { EnrollmentProvider } from './contexts/EnrollmentContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import LandingPage from './pages/LandingPage'
import CatalogPage from './pages/CatalogPage'
import BprDetailPage from './pages/BprDetailPage'
import ComparisonPage from './pages/ComparisonPage'
import CalculatorPage from './pages/CalculatorPage'
import EnrollmentPage from './pages/EnrollmentPage'

function App() {
  return (
    <ComparisonProvider>
      <EnrollmentProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/marketplace" element={<CatalogPage />} />
              <Route path="/bpr/:id" element={<BprDetailPage />} />
              <Route path="/bandingkan" element={<ComparisonPage />} />
              <Route path="/kalkulator" element={<CalculatorPage />} />
              <Route path="/daftar/:bprId/:produkId" element={<EnrollmentPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </EnrollmentProvider>
    </ComparisonProvider>
  )
}

export default App
