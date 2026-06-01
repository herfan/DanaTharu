import { useState } from 'react'
import { Card } from '../components/ui/Card'

const faqItems = [
  {
    q: 'Apa itu Danatharu?',
    a: 'Danatharu adalah platform aggregator deposito digital yang membantu Anda mencari, membandingkan, dan menempatkan dana pada produk deposito BPR terpercaya secara aman dan 100% digital.',
  },
  {
    q: 'Apa itu BPR?',
    a: 'BPR (Bank Perkreditan Rakyat) adalah lembaga keuangan bank yang melayani masyarakat dengan produk simpanan dan pinjaman. BPR diawasi oleh OJK dan simpanan nasabah dijamin oleh LPS hingga Rp 2 miliar.',
  },
  {
    q: 'Apakah deposito di BPR aman?',
    a: 'Ya, deposito di BPR yang terdaftar di Danatharu aman karena: (1) Terdaftar dan diawasi OJK, (2) Dijamin LPS hingga Rp 2 miliar per nasabah per bank, (3) BPR mitra memiliki track record yang baik.',
  },
  {
    q: 'Bagaimana cara mendaftar deposito?',
    a: 'Cukup 3 langkah mudah: (1) Pilih BPR dan produk deposito yang sesuai, (2) Bandingkan suku bunga dan tenor, (3) Daftar melalui form online dengan mengisi data diri dan upload dokumen.',
  },
  {
    q: 'Berapa minimal setoran deposito?',
    a: 'Minimal setoran bervariasi per produk, mulai dari Rp 500.000 hingga Rp 5.000.000. Anda bisa melihat informasi lengkap di halaman detail masing-masing produk.',
  },
  {
    q: 'Apa perbedaan deposito Konvensional dan Syariah?',
    a: 'Deposito Konvensional menggunakan sistem bunga, sedangkan deposito Syariah menggunakan sistem bagi hasil (mudharabah). Deposito Syariah tidak dikenakan pajak bunga.',
  },
  {
    q: 'Bagaimana cara menghitung bunga deposito?',
    a: 'Gunakan fitur Kalkulator di Danatharu. Masukkan nominal, pilih produk, dan tenor untuk melihat estimasi bunga per bulan, per tahun, serta total dana yang akan diterima.',
  },
  {
    q: 'Apakah ada biaya tambahan?',
    a: 'Tidak ada biaya tambahan untuk mendaftar melalui Danatharu. Platform kami gratis untuk digunakan. Biaya administrasi akan diinformasikan oleh BPR terkait saat proses pembukaan rekening.',
  },
]

export default function BantuanPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggleFaq(index: number) {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-danatharu-green to-danatharu-blue text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Bantuan
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Pertanyaan yang sering diajukan tentang deposito BPR dan Danatharu
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <div className="divide-y divide-gray-200">
              {faqItems.map((item, index) => (
                <div key={index}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between py-4 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-danatharu-gold rounded-lg px-2"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openIndex === index}
                  >
                    <span className="text-base font-semibold text-danatharu-blue pr-4">
                      {item.q}
                    </span>
                    <svg
                      className={`w-5 h-5 text-danatharu-green flex-shrink-0 transition-transform duration-200 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div className="pb-4 px-2 text-gray-600 leading-relaxed text-sm">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">
              Masih Punya Pertanyaan?
            </h2>
            <p className="text-gray-600 mb-6">
              Hubungi tim dukungan kami untuk bantuan lebih lanjut
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@danatharu.id"
                className="inline-flex items-center gap-2 px-6 py-3 bg-danatharu-green text-white font-semibold rounded-lg hover:bg-danatharu-blue transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@danatharu.id
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
