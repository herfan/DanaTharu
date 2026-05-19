import { Link } from 'react-router-dom'
import { useComparison } from '../contexts/ComparisonContext'
import { getProductById, getBprById } from '../data/mockData'
import type { BPR, ProdukDeposito } from '../types'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'

interface ComparisonEntry {
  product: ProdukDeposito
  bpr: BPR
}

function formatCurrency(value: number): string {
  return `Rp ${value.toLocaleString('id-ID')}`
}

function formatTenor(tenor: number): string {
  return `${tenor} bulan`
}

function EmptyState() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="text-center py-16">
          <div className="space-y-6">
            <div className="text-6xl">📊</div>
            <h2 className="text-2xl font-bold text-danatharu-blue">
              Belum ada produk yang dibandingkan
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Pilih produk deposito dari berbagai BPR untuk membandingkan suku bunga, tenor, dan fitur lainnya.
            </p>
            <Link to="/marketplace">
              <Button variant="primary" size="lg">
                Mulai Bandingkan
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function ComparisonPage() {
  const { comparisonList, removeFromComparison } = useComparison()

  if (comparisonList.length === 0) {
    return <EmptyState />
  }

  const comparisonData: ComparisonEntry[] = []
  for (const productId of comparisonList) {
    const product = getProductById(productId)
    const bpr = product ? getBprById(product.bprId) : undefined
    if (product && bpr) {
      comparisonData.push({ product, bpr })
    }
  }

  if (comparisonData.length === 0) {
    return <EmptyState />
  }

  const allRates = comparisonData.map(d => d.product.sukuBunga)
  const minRate = Math.min(...allRates)
  const maxRate = Math.max(...allRates)

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-danatharu-blue">Bandingkan Produk</h1>
          <p className="text-gray-600 mt-2">
            Maksimal 3 produk
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparisonData.map(({ product, bpr }) => {
            const isBestRate = product.sukuBunga === maxRate && minRate !== maxRate

            return (
              <Card key={product.id} className="relative">
                <button
                  type="button"
                  onClick={() => removeFromComparison(product.id)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Hapus
                </button>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                      {bpr.nama.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-danatharu-blue">{bpr.nama}</h3>
                      <p className="text-sm text-gray-500">{bpr.kota}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="warning">★ {bpr.rating}</Badge>
                    <Badge variant={product.jenis === 'Syariah' ? 'success' : 'info'}>
                      {product.jenis}
                    </Badge>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Tenor</p>
                      <p className="font-semibold text-gray-900">{formatTenor(product.tenor)}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Suku Bunga</p>
                      <p className={`font-bold text-xl ${isBestRate ? 'text-danatharu-green' : 'text-gray-900'}`}>
                        {product.sukuBunga}%
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Minimal Setoran</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(product.minimalSetoran)}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Maksimal Setoran</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(product.maksimalSetoran)}</p>
                    </div>
                  </div>

                  <Link to={`/daftar/${bpr.id}/${product.id}`} className="block">
                    <Button variant="primary" className="w-full">
                      Daftar Sekarang
                    </Button>
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
