import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-serif font-bold text-danatharu-gold mb-4">
          404
        </div>
        <h1 className="text-2xl font-serif font-bold text-danatharu-blue mb-4">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          Silakan kembali ke halaman utama untuk melanjutkan.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  )
}
