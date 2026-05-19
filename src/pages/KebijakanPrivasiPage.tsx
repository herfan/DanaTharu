import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'

export default function KebijakanPrivasiPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-danatharu-blue mb-8">
          Kebijakan Privasi
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Terakhir diperbarui: Januari 2026. Kebijakan Privasi ini menjelaskan bagaimana Danatharu ("kami", "platform kami") mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi Anda saat menggunakan layanan kami.
          </p>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">1. Informasi yang Kami Kumpulkan</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-danatharu-green mb-1">1.1 Informasi yang Anda Berikan</h3>
                <p>Kami mengumpulkan informasi yang Anda berikan saat mendaftar deposito, termasuk:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Nama lengkap dan Nomor Induk Kependudukan (NIK)</li>
                  <li>Tanggal lahir dan nomor telepon</li>
                  <li>Alamat email dan alamat tempat tinggal</li>
                  <li>Informasi pekerjaan dan penghasilan</li>
                  <li>Dokumen identitas (KTP) dan foto selfie</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-danatharu-green mb-1">1.2 Informasi yang Dikumpulkan Secara Otomatis</h3>
                <p>Saat Anda menggunakan platform kami, kami secara otomatis mengumpulkan:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Alamat IP dan jenis browser</li>
                  <li>Halaman yang Anda kunjungi dan durasi kunjungan</li>
                  <li>Perangkat yang digunakan (desktop, mobile, tablet)</li>
                  <li>Cookie dan teknologi pelacakan serupa</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">2. Bagaimana Kami Menggunakan Informasi Anda</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Memproses pendaftaran deposito Anda di BPR pilihan</li>
              <li>Memverifikasi identitas Anda sesuai ketentuan KYC (Know Your Customer)</li>
              <li>Menghubungkan Anda dengan BPR yang sesuai dengan kebutuhan</li>
              <li>Meningkatkan pengalaman pengguna dan fungsionalitas platform</li>
              <li>Mengirimkan informasi penting terkait akun dan transaksi Anda</li>
              <li>Mematuhi kewajiban hukum dan regulasi perbankan</li>
              <li>Mencegah penipuan dan aktivitas ilegal</li>
            </ul>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">3. Berbagi Informasi dengan Pihak Ketiga</h2>
            <p className="text-gray-600 mb-4">
              Kami tidak menjual data pribadi Anda kepada pihak ketiga. Kami hanya membagikan informasi Anda dalam kondisi berikut:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>BPR Partner:</strong> Data yang diperlukan untuk proses pembukaan deposito dibagikan kepada BPR yang Anda pilih</li>
              <li><strong>Otoritas Regulasi:</strong> Sesuai kewajiban hukum kepada OJK, LPS, atau otoritas berwenang lainnya</li>
              <li><strong>Penyedia Layanan:</strong> Pihak ketiga yang membantu operasional platform (hosting, keamanan, analitik) dengan perjanjian kerahasiaan</li>
            </ul>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">4. Keamanan Data</h2>
            <p className="text-gray-600">
              Kami menerapkan langkah-langkah keamanan teknis dan organisasi untuk melindungi data pribadi Anda dari akses tidak sah, kehilangan, penyalahgunaan, atau pengungkapan:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
              <li>Enkripsi SSL/TLS untuk semua transmisi data</li>
              <li>Penyimpanan data terenkripsi di server yang aman</li>
              <li>Akses terbatas hanya untuk personel yang berwenang</li>
              <li>Audit keamanan berkala dan pemantauan sistem</li>
              <li>Kepatuhan terhadap standar keamanan industri keuangan</li>
            </ul>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">5. Hak Anda</h2>
            <p className="text-gray-600 mb-4">Sesuai dengan Undang-Undang Perlindungan Data Pribadi, Anda memiliki hak untuk:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Mengakses data pribadi yang kami simpan tentang Anda</li>
              <li>Memperbaiki data yang tidak akurat atau tidak lengkap</li>
              <li>Meminta penghapusan data pribadi Anda (hak untuk dilupakan)</li>
              <li>Menarik persetujuan pemrosesan data kapan saja</li>
              <li>Mengajukan keluhan kepada otoritas perlindungan data</li>
            </ul>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">6. Penyimpanan Data</h2>
            <p className="text-gray-600">
              Kami menyimpan data pribadi Anda selama akun Anda aktif dan selama diperlukan untuk memenuhi tujuan yang dijelaskan dalam kebijakan ini, atau sesuai kewajiban hukum. Setelah periode penyimpanan berakhir, data akan dihapus atau dianonimkan secara aman.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">7. Cookie</h2>
            <p className="text-gray-600">
              Platform kami menggunakan cookie dan teknologi serupa untuk meningkatkan pengalaman pengguna, mengingat preferensi Anda, dan menganalisis penggunaan platform. Anda dapat mengontrol pengaturan cookie melalui browser Anda.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">8. Perubahan Kebijakan</h2>
            <p className="text-gray-600">
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan material akan diberitahukan melalui email atau notifikasi di platform. Kami mendorong Anda untuk meninjau kebijakan ini secara berkala.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">9. Hubungi Kami</h2>
            <p className="text-gray-600">
              Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan Privasi ini, silakan hubungi kami di:
            </p>
            <div className="mt-4 text-gray-600">
              <p><strong>Email:</strong> privasi@danatharu.id</p>
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
