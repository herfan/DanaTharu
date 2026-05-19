import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'

export default function SyaratKetentuanPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-danatharu-blue mb-8">
          Syarat & Ketentuan
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Terakhir diperbarui: Januari 2026. Dengan mengakses dan menggunakan platform Danatharu, Anda menyetujui syarat dan ketentuan berikut. Harap baca dengan saksama sebelum menggunakan layanan kami.
          </p>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">1. Definisi</h2>
            <div className="text-gray-600 space-y-2">
              <p><strong>"Danatharu"</strong> mengacu pada platform aggregator deposito digital yang menyediakan layanan perbandingan dan pendaftaran deposito BPR.</p>
              <p><strong>"BPR"</strong> adalah Bank Perkreditan Rakyat yang terdaftar dan diawasi oleh OJK.</p>
              <p><strong>"Deposito"</strong> adalah simpanan berjangka dengan suku bunga tertentu yang ditawarkan oleh BPR.</p>
              <p><strong>"Pengguna"</strong> adalah individu yang mengakses dan menggunakan platform Danatharu.</p>
              <p><strong>"OJK"</strong> adalah Otoritas Jasa Keuangan.</p>
              <p><strong>"LPS"</strong> adalah Lembaga Penjamin Simpanan.</p>
            </div>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">2. Layanan Platform</h2>
            <div className="text-gray-600 space-y-4">
              <p>Danatharu menyediakan layanan berikut:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Perbandingan suku bunga deposito dari berbagai BPR</li>
                <li>Kalkulator bunga deposito untuk estimasi return investasi</li>
                <li>Fitur perbandingan produk deposito side-by-side</li>
                <li>Formulir pendaftaran deposito online</li>
                <li>Informasi tentang BPR yang terdaftar di OJK</li>
              </ul>
              <p className="mt-4">
                <strong>Penting:</strong> Danatharu adalah platform aggregator dan bukan lembaga perbankan. Kami tidak menerima simpanan, memberikan kredit, atau melakukan kegiatan perbankan lainnya. Semua transaksi deposito dilakukan langsung antara Pengguna dan BPR pilihan.
              </p>
            </div>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">3. Persyaratan Pengguna</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Berkewarganegaraan Indonesia atau penduduk tetap Indonesia</li>
              <li>Berusia minimal 17 tahun atau sudah menikah</li>
              <li>Memiliki KTP atau identitas resmi yang masih berlaku</li>
              <li>Memiliki nomor telepon dan email aktif</li>
              <li>Memiliki dana yang sah secara hukum untuk deposit</li>
              <li>Memahami risiko dan ketentuan produk deposito</li>
            </ul>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">4. Pendaftaran Deposito</h2>
            <div className="text-gray-600 space-y-4">
              <p>Dalam proses pendaftaran deposito melalui platform kami:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Informasi yang Anda berikan harus akurat dan lengkap</li>
                <li>Pendaftaran akan diteruskan ke BPR pilihan Anda untuk verifikasi</li>
                <li>BPR berhak menolak pendaftaran jika persyaratan tidak terpenuhi</li>
                <li>Proses verifikasi dan aktivasi deposito tergantung pada kebijakan masing-masing BPR</li>
                <li>Danatharu tidak menjamin persetujuan pembukaan deposito oleh BPR</li>
              </ul>
            </div>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">5. Suku Bunga dan Perhitungan</h2>
            <div className="text-gray-600 space-y-4">
              <p>Mengenai suku bunga deposito:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Suku bunga yang ditampilkan bersifat informatif dan dapat berubah tanpa pemberitahuan sebelumnya</li>
                <li>Suku bunga aktual ditentukan oleh BPR pada saat pembukaan deposito</li>
                <li>Kalkulator bunga di platform kami memberikan estimasi, bukan jaminan return</li>
                <li>Pajak deposito sebesar 20% berlaku untuk deposito konvensional sesuai ketentuan pemerintah</li>
                <li>Deposito syariah menggunakan sistem bagi hasil, bukan suku bunga tetap</li>
              </ul>
            </div>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">6. Penjaminan LPS</h2>
            <div className="text-gray-600 space-y-4">
              <p>Simpanan di BPR dijamin oleh Lembaga Penjamin Simpanan (LPS) dengan ketentuan:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Simpanan dijamin hingga Rp 2 miliar per nasabah per bank</li>
                <li>BPR harus terdaftar dan menjadi peserta LPS</li>
                <li>Suku bunga tidak melebihi tingkat bunga penjaminan LPS</li>
                <li>Informasi lebih lanjut dapat diakses di www.lps.go.id</li>
              </ul>
            </div>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">7. Tanggung Jawab Pengguna</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Menjaga kerahasiaan informasi akun dan data pribadi</li>
              <li>Tidak menyalahgunakan platform untuk aktivitas ilegal</li>
              <li>Memastikan informasi yang diberikan benar dan tidak menyesatkan</li>
              <li>Memahami produk deposito sebelum melakukan investasi</li>
              <li>Melaporkan aktivitas mencurigakan kepada Danatharu</li>
            </ul>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">8. Batasan Tanggung Jawab</h2>
            <div className="text-gray-600 space-y-4">
              <p>Danatharu tidak bertanggung jawab atas:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Perubahan suku bunga yang dilakukan oleh BPR</li>
                <li>Kerugian yang timbul dari keputusan investasi Pengguna</li>
                <li>Kegagalan BPR dalam memenuhi kewajiban (dilindungi oleh LPS)</li>
                <li>Gangguan layanan akibat force majeure atau pemeliharaan sistem</li>
                <li>Ketidakakuratan informasi yang bersumber dari pihak ketiga</li>
              </ul>
            </div>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">9. Perubahan Syarat & Ketentuan</h2>
            <p className="text-gray-600">
              Danatharu berhak mengubah Syarat & Ketentuan ini kapan saja. Perubahan akan efektif setelah dipublikasikan di platform. Penggunaan berkelanjutan setelah perubahan merupakan persetujuan Anda terhadap syarat yang diperbarui.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">10. Hukum yang Berlaku</h2>
            <p className="text-gray-600">
              Syarat & Ketentuan ini diatur oleh hukum Republik Indonesia. Segala sengketa akan diselesaikan melalui musyawarah mufakat atau melalui pengadilan yang berwenang di Indonesia.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">11. Kontak</h2>
            <p className="text-gray-600">
              Untuk pertanyaan mengenai Syarat & Ketentuan ini, hubungi kami di:
            </p>
            <div className="mt-4 text-gray-600">
              <p><strong>Email:</strong> legal@danatharu.id</p>
              <p><strong>Telepon:</strong> (021) 1234-5678</p>
              <p><strong>Alamat:</strong> Jakarta, Indonesia</p>
            </div>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-danatharu-green hover:text-danatharu-gold transition-colors font-medium">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
