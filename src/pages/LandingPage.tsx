import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { getAllBpr } from '../data/mockData'

function getTopBprsByRate(count: number) {
  const allBprs = getAllBpr()
  return allBprs
    .map((bpr) => {
      const highestRate = Math.max(...bpr.produkDeposito.map((p) => p.sukuBunga))
      return { ...bpr, highestRate }
    })
    .sort((a, b) => b.highestRate - a.highestRate)
    .slice(0, count)
}

export default function LandingPage() {
  const topBprs = getTopBprsByRate(3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-danatharu-green to-danatharu-blue text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Simpan Dana Anda dengan Aman dan Menguntungkan
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Bandingkan suku bunga deposito dari BPR terpercaya yang terdaftar di OJK
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/marketplace">
              <Button variant="secondary" size="lg">
                Mulai Bandingkan
              </Button>
            </Link>
            <Link to="/kalkulator">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-danatharu-green">
                Hitung Bunga
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-danatharu-blue mb-12">
            Mengapa Memilih Danatharu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-danatharu-green/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-danatharu-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-danatharu-blue mb-2">Terdaftar & Diawasi OJK</h3>
              <p className="text-gray-600 text-sm">Semua BPR partner kami terdaftar resmi dan diawasi oleh Otoritas Jasa Keuangan</p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-danatharu-gold/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-danatharu-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-danatharu-blue mb-2">Dijamin LPS</h3>
              <p className="text-gray-600 text-sm">Dana Anda dijamin oleh Lembaga Penjamin Simpanan hingga Rp 2 miliar per bank</p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-danatharu-blue/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-danatharu-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-danatharu-blue mb-2">Suku Bunga Kompetitif</h3>
              <p className="text-gray-600 text-sm">Dapatkan suku bunga deposito terbaik dari berbagai BPR terpercaya di Indonesia</p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-danatharu-green/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-danatharu-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-danatharu-blue mb-2">Proses Digital Cepat</h3>
              <p className="text-gray-600 text-sm">Daftar dan buka deposito secara online tanpa perlu datang ke kantor cabang</p>
            </Card>
          </div>
        </div>
      </section>

      {/* BPR Partners Carousel Section */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider mb-8">
            Dipercaya oleh BPR-BPR Terbaik di Indonesia
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {getAllBpr().map((bpr) => (
              <div key={bpr.id} className="flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-danatharu-green">
                      {bpr.nama.split(' ').slice(0, 2).map(w => w[0]).join('')}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-danatharu-blue truncate">{bpr.nama}</p>
                  <p className="text-xs text-gray-500">{bpr.kota}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured BPRs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-danatharu-blue mb-12">
            BPR dengan Suku Bunga Tertinggi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {topBprs.map((bpr) => (
              <Card key={bpr.id} variant="interactive" className="border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-danatharu-blue">{bpr.nama}</h3>
                    <p className="text-sm text-gray-500">{bpr.kota}, {bpr.provinsi}</p>
                  </div>
                  <div className="flex items-center text-danatharu-gold">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm font-medium">{bpr.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Suku Bunga Tertinggi</p>
                    <p className="text-2xl font-bold text-danatharu-green">{bpr.highestRate}%</p>
                  </div>
                  <div className="flex gap-2">
                    {bpr.terdaftarOJK && <Badge variant="success">OJK</Badge>}
                    {bpr.dijaminLPS && <Badge variant="info">LPS</Badge>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link to="/marketplace">
              <Button variant="outline" size="lg">
                Lihat Semua
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-danatharu-blue mb-12">
            Cara Kerja
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-danatharu-green text-white rounded-full flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-danatharu-blue mb-2">Pilih BPR & Produk</h3>
              <p className="text-gray-600">Jelajahi berbagai pilihan BPR terpercaya dan produk deposito yang sesuai kebutuhan Anda</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-danatharu-gold text-white rounded-full flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-danatharu-blue mb-2">Bandingkan Suku Bunga</h3>
              <p className="text-gray-600">Bandingkan suku bunga, tenor, dan minimal setoran dari berbagai BPR untuk mendapatkan yang terbaik</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-danatharu-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-danatharu-blue mb-2">Daftar Online</h3>
              <p className="text-gray-600">Daftar dan buka deposito secara online dengan proses yang cepat dan mudah</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-16 bg-danatharu-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-serif font-bold text-danatharu-gold mb-2">50+</p>
              <p className="text-lg">BPR Partner</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-serif font-bold text-danatharu-gold mb-2">Rp 100M+</p>
              <p className="text-lg">Dana Terkelola</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-serif font-bold text-danatharu-gold mb-2">10,000+</p>
              <p className="text-lg">Nasabah</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 border-t border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-danatharu-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Terdaftar di OJK</p>
                <p className="text-sm text-white/80">Otoritas Jasa Keuangan</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-danatharu-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Dijamin oleh LPS</p>
                <p className="text-sm text-white/80">Lembaga Penjamin Simpanan</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
