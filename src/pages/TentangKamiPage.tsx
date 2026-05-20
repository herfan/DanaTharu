import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-danatharu-green to-danatharu-blue text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Tentang Danatharu
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Platform aggregator deposito digital yang menghubungkan masyarakat dengan BPR terpercaya di seluruh Indonesia
          </p>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">Visi Kami</h2>
              <p className="text-gray-600 leading-relaxed">
                Menjadi platform digital terdepan yang memudahkan masyarakat Indonesia mengakses produk deposito dengan suku bunga terbaik dari BPR yang terdaftar dan diawasi oleh Otoritas Jasa Keuangan (OJK).
              </p>
            </Card>
            <Card>
              <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">Misi Kami</h2>
              <ul className="text-gray-600 space-y-2">
                <li>• Menyediakan perbandingan suku bunga deposito yang transparan dan akurat</li>
                <li>• Meningkatkan literasi keuangan masyarakat tentang produk perbankan</li>
                <li>• Mendukung pertumbuhan BPR lokal melalui platform digital</li>
                <li>• Memastikan keamanan dana nasabah dengan standar OJK dan LPS</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Apa Itu Deposito */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-danatharu-blue text-center mb-12">
            Mengenal Deposito BPR
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <div className="w-12 h-12 bg-danatharu-green/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-danatharu-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-danatharu-blue mb-2">Suku Bunga Kompetitif</h3>
              <p className="text-gray-600 text-sm">
                BPR menawarkan suku bunga deposito yang lebih tinggi dibandingkan bank konvensional, hingga 6-8% per tahun, karena biaya operasional yang lebih efisien.
              </p>
            </Card>
            <Card>
              <div className="w-12 h-12 bg-danatharu-gold/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-danatharu-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-danatharu-blue mb-2">Dijamin LPS</h3>
              <p className="text-gray-600 text-sm">
                Deposito di BPR dijamin oleh Lembaga Penjamin Simpanan (LPS) hingga Rp 2 miliar per nasabah per bank, memberikan keamanan ekstra untuk investasi Anda.
              </p>
            </Card>
            <Card>
              <div className="w-12 h-12 bg-danatharu-blue/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-danatharu-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-danatharu-blue mb-2">Mendukung Ekonomi Lokal</h3>
              <p className="text-gray-600 text-sm">
                Dana yang Anda depositokan di BPR akan disalurkan sebagai kredit UMKM dan masyarakat lokal, mendukung pertumbuhan ekonomi daerah.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Mengapa BPR */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-danatharu-blue text-center mb-8">
            Mengapa Memilih Deposito BPR?
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-danatharu-green text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
              <div>
                <h3 className="text-lg font-semibold text-danatharu-blue mb-1">Suku Bunga Lebih Tinggi</h3>
                <p className="text-gray-600">BPR dapat menawarkan suku bunga deposito hingga 2-3% lebih tinggi dari bank konvensional karena struktur biaya operasional yang lebih ramping.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-danatharu-green text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
              <div>
                <h3 className="text-lg font-semibold text-danatharu-blue mb-1">Terdaftar dan Diawasi OJK</h3>
                <p className="text-gray-600">Semua BPR yang bermitra dengan Danatharu terdaftar resmi dan diawasi oleh Otoritas Jasa Keuangan, memastikan kepatuhan terhadap regulasi perbankan.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-danatharu-green text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
              <div>
                <h3 className="text-lg font-semibold text-danatharu-blue mb-1">Fleksibel dan Mudah</h3>
                <p className="text-gray-600">Pilihan tenor deposito mulai dari 1, 3, 6, hingga 12 bulan dengan minimal setoran yang terjangkau, mulai dari Rp 1 juta.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-danatharu-green text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
              <div>
                <h3 className="text-lg font-semibold text-danatharu-blue mb-1">Investasi Rendah Risiko</h3>
                <p className="text-gray-600">Deposito merupakan instrumen investasi berisiko rendah dengan return yang pasti, cocok untuk investor konservatif yang mengutamakan keamanan dana.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-danatharu-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Mulai Investasi Deposito Anda</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Temukan deposito dengan suku bunga terbaik dari BPR terpercaya di seluruh Indonesia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/marketplace">
              <Button variant="secondary" size="lg">
                Jelajahi Marketplace
              </Button>
            </Link>
            <Link to="/kalkulator">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-danatharu-green">
                Hitung Bunga Deposito
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
