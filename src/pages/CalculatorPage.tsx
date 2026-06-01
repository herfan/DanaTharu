import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts, getProductById, getBprById } from '../data/mockData'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Select, type SelectOption } from '../components/ui/Select'
import { Badge } from '../components/ui/Badge'

interface CalculationResult {
  bungaPerBulan: number
  bungaPerTahun: number
  totalDana: number
  pajak: number
  bungaBersih: number
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value).replace(/\s+/g, ' ').trim()
}

function calculateFlat(principal: number, rate: number, tenor: number): CalculationResult {
  const bungaPerTahun = principal * (rate / 100) * (tenor / 12)
  const bungaPerBulan = bungaPerTahun / tenor
  return {
    bungaPerBulan,
    bungaPerTahun,
    totalDana: principal + bungaPerTahun,
    pajak: 0,
    bungaBersih: bungaPerTahun,
  }
}

function calculateEfektif(principal: number, rate: number, tenor: number): CalculationResult {
  const monthlyRate = rate / 100 / 12
  const totalDana = principal * Math.pow(1 + monthlyRate, tenor)
  const bungaPerTahun = totalDana - principal
  const bungaPerBulan = bungaPerTahun / tenor
  return {
    bungaPerBulan,
    bungaPerTahun,
    totalDana,
    pajak: 0,
    bungaBersih: bungaPerTahun,
  }
}

function applyTax(result: CalculationResult, jenis: 'Konvensional' | 'Syariah'): CalculationResult {
  const taxRate = jenis === 'Konvensional' ? 0.2 : 0
  const pajak = result.bungaPerTahun * taxRate
  return {
    ...result,
    pajak,
    bungaBersih: result.bungaPerTahun - pajak,
    totalDana: result.bungaPerTahun - pajak + (result.totalDana - result.bungaPerTahun),
  }
}

export default function CalculatorPage() {
  const products = getAllProducts()
  const productOptions: SelectOption[] = products.map((p) => {
    const bpr = getBprById(p.bprId)
    return {
      value: p.id,
      label: `${bpr?.nama ?? ''} - ${p.tenor} Bulan`,
    }
  })

  const tenorOptions: SelectOption[] = [
    { value: '1', label: '1 Bulan' },
    { value: '3', label: '3 Bulan' },
    { value: '6', label: '6 Bulan' },
    { value: '12', label: '12 Bulan' },
  ]

  const jenisBungaOptions: SelectOption[] = [
    { value: 'efektif', label: 'Bunga Efektif' },
    { value: 'flat', label: 'Bunga Flat' },
  ]

  const [selectedProductId, setSelectedProductId] = useState('')
  const [amount, setAmount] = useState('')
  const [tenor, setTenor] = useState('12')
  const [jenisBunga, setJenisBunga] = useState('efektif')
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [error, setError] = useState('')

  const selectedProduct = selectedProductId ? getProductById(selectedProductId) : null
  const selectedBpr = selectedProduct ? getBprById(selectedProduct.bprId) : null

  function handleCalculate() {
    setError('')
    setResult(null)

    const principal = parseFloat(amount.replace(/[^0-9]/g, ''))
    if (isNaN(principal) || principal <= 0) {
      setError('Jumlah deposito harus diisi')
      return
    }

    const product = selectedProduct
    const tenorMonths = parseInt(tenor, 10)
    const rate = product ? product.sukuBunga : 0
    const jenis = product ? product.jenis : 'Konvensional'

    if (product) {
      if (principal < product.minimalSetoran) {
        setError(`Jumlah deposito di bawah minimal setoran (${formatCurrency(product.minimalSetoran)})`)
        return
      }
      if (principal > product.maksimalSetoran) {
        setError(`Jumlah deposito melebihi maksimal setoran (${formatCurrency(product.maksimalSetoran)})`)
        return
      }
    }

    let calcResult: CalculationResult
    if (jenisBunga === 'flat') {
      calcResult = calculateFlat(principal, rate, tenorMonths)
    } else {
      calcResult = calculateEfektif(principal, rate, tenorMonths)
    }

    calcResult = applyTax(calcResult, jenis)
    setResult(calcResult)
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    if (raw) {
      const num = parseInt(raw, 10)
      setAmount(new Intl.NumberFormat('id-ID').format(num))
    } else {
      setAmount('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-danatharu-blue mb-8 text-center">
          Kalkulator Deposito
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Simulasi Deposito" subtitle="Hitung estimasi bunga deposito Anda">
            <div className="space-y-4">
              <Select
                label="Pilih Produk BPR"
                options={productOptions}
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
              />

              <Input
                label="Jumlah Deposito (Rp)"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="10.000.000"
                error={error}
              />

              <Select
                label="Tenor"
                options={tenorOptions}
                value={tenor}
                onChange={(e) => setTenor(e.target.value)}
              />

              <Select
                label="Jenis Bunga"
                options={jenisBungaOptions}
                value={jenisBunga}
                onChange={(e) => setJenisBunga(e.target.value)}
              />

              <Button variant="primary" size="lg" className="w-full" onClick={handleCalculate}>
                Hitung
              </Button>
            </div>
          </Card>

          <div className="space-y-6">
            {selectedProduct && selectedBpr && (
              <Card title="Detail Produk" subtitle={selectedBpr.nama}>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Suku Bunga</span>
                    <span className="text-xl font-bold text-danatharu-green">{selectedProduct.sukuBunga.toLocaleString('id-ID')}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tenor</span>
                    <span className="font-medium">{selectedProduct.tenor} Bulan</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Minimal Setoran</span>
                    <span className="font-medium">{formatCurrency(selectedProduct.minimalSetoran)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Maksimal Setoran</span>
                    <span className="font-medium">{formatCurrency(selectedProduct.maksimalSetoran)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Jenis</span>
                    <Badge variant={selectedProduct.jenis === 'Syariah' ? 'success' : 'info'}>
                      {selectedProduct.jenis}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{selectedProduct.catatan}</p>
                  <Link to={`/daftar/${selectedBpr.id}/${selectedProduct.id}`} className="block mt-4">
                    <Button variant="secondary" size="md" className="w-full">
                      Daftar Sekarang
                    </Button>
                  </Link>
                </div>
              </Card>
            )}

            {result && (
              <Card title="Hasil Perhitungan" subtitle="Estimasi bunga deposito">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Bunga per Bulan</span>
                    <span className="font-semibold text-danatharu-blue">{formatCurrency(result.bungaPerBulan)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Bunga per Tahun</span>
                    <span className="font-semibold text-danatharu-blue">{formatCurrency(result.bungaPerTahun)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Pajak</span>
                    <span className="font-semibold text-red-600">- {formatCurrency(result.pajak)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Bunga Bersih</span>
                    <span className="font-semibold text-danatharu-green">{formatCurrency(result.bungaBersih)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-danatharu-green/5 rounded-lg px-3">
                    <span className="font-semibold text-danatharu-blue">Total Dana</span>
                    <span className="text-xl font-bold text-danatharu-green">{formatCurrency(result.totalDana)}</span>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
