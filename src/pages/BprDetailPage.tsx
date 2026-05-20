import { useParams, Link } from 'react-router-dom'
import { useComparison } from '../contexts/ComparisonContext'
import { getBprById } from '../data/mockData'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Checkbox } from '../components/ui/Checkbox'

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value).replace(/^IDR\s?/, 'Rp ')
}

function formatTenor(tenor: number): string {
  return `${tenor} bulan`
}

export default function BprDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { addToComparison, removeFromComparison, isInComparison, canAddMore } = useComparison()

  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">BPR tidak ditemukan</p>
        </div>
      </div>
    )
  }

  const bpr = getBprById(id)

  if (!bpr) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg text-gray-500">BPR tidak ditemukan</p>
            <Link to="/marketplace" className="text-danatharu-green hover:underline mt-2 inline-block">
              Kembali ke Marketplace
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleComparisonToggle = (productId: string) => {
    if (isInComparison(productId)) {
      removeFromComparison(productId)
    } else if (canAddMore) {
      addToComparison(productId)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/marketplace"
          className="inline-flex items-center text-danatharu-green hover:text-danatharu-blue transition-colors mb-6"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </Link>

        {/* BPR Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-danatharu-green">
                {bpr.nama.split(' ').slice(0, 2).map(w => w[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-danatharu-blue">
                {bpr.nama}
              </h1>
              <p className="text-gray-500 mt-1">{bpr.kota}, {bpr.provinsi}</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center text-danatharu-gold">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 font-medium">{bpr.rating}</span>
                </div>
                <div className="flex gap-2">
                  {bpr.terdaftarOJK && <Badge variant="success">OJK</Badge>}
                  {bpr.dijaminLPS && <Badge variant="info">LPS</Badge>}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {bpr.jumlahNasabah.toLocaleString('id-ID')} nasabah terdaftar
              </p>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-danatharu-blue mb-4">
            Produk Deposito
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tenor
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Suku Bunga
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Min. Setoran
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Max. Setoran
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jenis
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bpr.produkDeposito.map((product) => {
                  const inComparison = isInComparison(product.id)
                  return (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatTenor(product.tenor)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-danatharu-green">
                        {product.sukuBunga.toFixed(2)}%
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(product.minimalSetoran)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(product.maksimalSetoran)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <Badge variant={product.jenis === 'Syariah' ? 'warning' : 'default'}>
                          {product.jenis}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-3">
                          <Link to={`/daftar/${bpr.id}/${product.id}`}>
                            <Button variant="primary" size="sm">
                              Pilih
                            </Button>
                          </Link>
                          <Checkbox
                            label="Bandingkan"
                            checked={inComparison}
                            onChange={() => handleComparisonToggle(product.id)}
                            disabled={!inComparison && !canAddMore}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
