import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDebounce } from '../hooks/useDebounce'
import { useComparison } from '../contexts/ComparisonContext'
import { getAllBpr } from '../data/mockData'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Checkbox } from '../components/ui/Checkbox'
import { Button } from '../components/ui/Button'

const ITEMS_PER_PAGE = 6

function getHighestRate(bpr: ReturnType<typeof getAllBpr>[number]): number {
  return Math.max(...bpr.produkDeposito.map((p) => p.sukuBunga))
}

function getHighestRateProductId(bpr: ReturnType<typeof getAllBpr>[number]): string {
  const highest = bpr.produkDeposito.reduce((max, p) => (p.sukuBunga > max.sukuBunga ? p : max), bpr.produkDeposito[0])
  return highest?.id ?? ''
}

export default function CatalogPage() {
  const [search, setSearch] = useState('')
  const [jenisFilter, setJenisFilter] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [page, setPage] = useState(1)

  const debouncedSearch = useDebounce(search, 500)
  const { addToComparison, removeFromComparison, isInComparison, canAddMore } = useComparison()

  const allBprs = getAllBpr()

  const filteredBprs = useMemo(() => {
    let result = allBprs

    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase()
      result = result.filter(
        (bpr) =>
          bpr.nama.toLowerCase().includes(query) ||
          bpr.kota.toLowerCase().includes(query) ||
          bpr.provinsi.toLowerCase().includes(query)
      )
    }

    if (jenisFilter) {
      result = result.filter((bpr) =>
        bpr.produkDeposito.some((p) => p.jenis === jenisFilter)
      )
    }

    if (sortBy === 'rate') {
      result = [...result].sort((a, b) => getHighestRate(b) - getHighestRate(a))
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [allBprs, debouncedSearch, jenisFilter, sortBy])

  const totalPages = Math.ceil(filteredBprs.length / ITEMS_PER_PAGE)
  const paginatedBprs = filteredBprs.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleJenisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setJenisFilter(e.target.value)
    setPage(1)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
    setPage(1)
  }

  const handleComparisonToggle = (bpr: ReturnType<typeof getAllBpr>[number]) => {
    const productId = getHighestRateProductId(bpr)
    if (isInComparison(productId)) {
      removeFromComparison(productId)
    } else if (canAddMore) {
      addToComparison(productId)
    }
  }

  const jenisOptions = [
    { value: '', label: 'Semua Jenis' },
    { value: 'Konvensional', label: 'Konvensional' },
    { value: 'Syariah', label: 'Syariah' },
  ]

  const sortOptions = [
    { value: '', label: 'Default' },
    { value: 'rate', label: 'Suku Bunga Tertinggi' },
    { value: 'rating', label: 'Rating Tertinggi' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-danatharu-blue">
            Marketplace BPR
          </h1>
          <p className="text-gray-600 mt-2">
            Temukan deposito dengan suku bunga terbaik dari BPR terpercaya
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <Input
              label="Cari BPR"
              placeholder="Cari berdasarkan nama atau kota..."
              value={search}
              onChange={handleSearchChange}
              aria-label="Cari BPR"
            />
            <Select
              label="Jenis"
              value={jenisFilter}
              onChange={handleJenisChange}
              options={jenisOptions}
            />
            <Select
              label="Urutkan"
              value={sortBy}
              onChange={handleSortChange}
              options={sortOptions}
            />
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-gray-500">
          Menampilkan {paginatedBprs.length} dari {filteredBprs.length} BPR
        </div>

        {/* BPR Cards Grid */}
        {filteredBprs.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg text-gray-500">Tidak ada BPR yang ditemukan</p>
            <p className="text-sm text-gray-400 mt-1">Coba ubah kata kunci atau filter pencarian</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedBprs.map((bpr) => {
              const highestRate = getHighestRate(bpr)
              const highestProductId = getHighestRateProductId(bpr)
              const inComparison = isInComparison(highestProductId)

              return (
                <Card key={bpr.id} variant="interactive" className="border border-gray-200 flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-danatharu-green">
                        {bpr.nama.charAt(4).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link to={`/bpr/${bpr.id}`} className="text-lg font-semibold text-danatharu-blue hover:text-danatharu-green transition-colors">
                        {bpr.nama}
                      </Link>
                      <p className="text-sm text-gray-500">{bpr.kota}, {bpr.provinsi}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-danatharu-gold">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm font-medium">{bpr.rating}</span>
                    </div>
                    <div className="flex gap-2">
                      {bpr.terdaftarOJK && <Badge variant="success">OJK</Badge>}
                      {bpr.dijaminLPS && <Badge variant="info">LPS</Badge>}
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Suku Bunga Tertinggi</p>
                        <p className="text-2xl font-bold text-danatharu-green">{highestRate}%</p>
                      </div>
                      <Checkbox
                        label="Bandingkan"
                        checked={inComparison}
                        onChange={() => handleComparisonToggle(bpr)}
                        disabled={!inComparison && !canAddMore}
                      />
                    </div>
                    <Link to={`/bpr/${bpr.id}`} className="mt-3 block">
                      <Button variant="outline" size="sm" className="w-full">
                        Lihat Detail
                      </Button>
                    </Link>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Sebelumnya
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Button
                key={pageNum}
                variant={pageNum === page ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setPage(pageNum)}
                className={pageNum === page ? '' : 'min-w-[2.5rem]'}
              >
                {pageNum}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Berikutnya
            </Button>
          </div>
        )}

        {totalPages > 1 && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Halaman {page} dari {totalPages}
          </p>
        )}
      </div>
    </div>
  )
}
