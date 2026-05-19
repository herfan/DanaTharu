import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useEnrollment } from '../contexts/EnrollmentContext'
import { getBprById, getProductById } from '../data/mockData'
import { Input } from '../components/ui/Input'
import { Select, type SelectOption } from '../components/ui/Select'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Checkbox } from '../components/ui/Checkbox'

function formatCurrency(value: number): string {
  return `Rp ${new Intl.NumberFormat('id-ID').format(value)}`
}

function formatTenor(tenor: number): string {
  return `${tenor} bulan`
}

const pekerjaanOptions: SelectOption[] = [
  { value: '', label: 'Pilih Pekerjaan' },
  { value: 'Karyawan', label: 'Karyawan' },
  { value: 'Wiraswasta', label: 'Wiraswasta' },
  { value: 'Pensiunan', label: 'Pensiunan' },
  { value: 'Lainnya', label: 'Lainnya' },
]

function Step1DataPribadi() {
  const { formData, updateFormData } = useEnrollment()
  const step1 = formData.step1

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-danatharu-blue">Data Pribadi</h2>
      <Input
        label="Nama Lengkap"
        required
        value={step1?.nama ?? ''}
        onChange={(e) => updateFormData({ step1: { ...step1, nama: e.target.value } as any })}
      />
      <Input
        label="NIK"
        required
        maxLength={16}
        value={step1?.nik ?? ''}
        onChange={(e) => updateFormData({ step1: { ...step1, nik: e.target.value } as any })}
      />
      <Input
        label="Tanggal Lahir"
        type="date"
        required
        value={step1?.tanggalLahir ?? ''}
        onChange={(e) => updateFormData({ step1: { ...step1, tanggalLahir: e.target.value } as any })}
      />
      <Input
        label="No HP"
        type="tel"
        required
        value={step1?.noHP ?? ''}
        onChange={(e) => updateFormData({ step1: { ...step1, noHP: e.target.value } as any })}
      />
      <Input
        label="Email"
        type="email"
        required
        value={step1?.email ?? ''}
        onChange={(e) => updateFormData({ step1: { ...step1, email: e.target.value } as any })}
      />
    </div>
  )
}

function Step2DataAlamat() {
  const { formData, updateFormData } = useEnrollment()
  const step2 = formData.step2

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-danatharu-blue">Data Alamat</h2>
      <div className="w-full">
        <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-1">
          Alamat <span className="text-red-500">*</span>
        </label>
        <textarea
          id="alamat"
          required
          rows={3}
          value={step2?.alamat ?? ''}
          onChange={(e) => updateFormData({ step2: { ...step2, alamat: e.target.value } as any })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-danatharu-gold focus:border-transparent"
        />
      </div>
      <Input
        label="Kota"
        required
        value={step2?.kota ?? ''}
        onChange={(e) => updateFormData({ step2: { ...step2, kota: e.target.value } as any })}
      />
      <Select
        label="Pekerjaan"
        required
        options={pekerjaanOptions}
        value={step2?.pekerjaan ?? ''}
        onChange={(e) => updateFormData({ step2: { ...step2, pekerjaan: e.target.value } as any })}
      />
      <Input
        label="Penghasilan per Bulan"
        type="number"
        required
        value={step2?.penghasilan ?? ''}
        onChange={(e) => updateFormData({ step2: { ...step2, penghasilan: Number(e.target.value) } as any })}
      />
    </div>
  )
}

function Step3UploadDokumen() {
  const { formData, updateFormData } = useEnrollment()
  const step3 = formData.step3
  const [ktpPreview, setKtpPreview] = useState<string | null>(null)
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null)

  useEffect(() => {
    if (step3?.ktpFile && step3.ktpFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(step3.ktpFile)
      setKtpPreview(url)
      return () => URL.revokeObjectURL(url)
    }
    setKtpPreview(null)
  }, [step3?.ktpFile])

  useEffect(() => {
    if (step3?.selfieFile && step3.selfieFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(step3.selfieFile)
      setSelfiePreview(url)
      return () => URL.revokeObjectURL(url)
    }
    setSelfiePreview(null)
  }, [step3?.selfieFile])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-danatharu-blue">Upload Dokumen</h2>
      <div className="w-full">
        <label htmlFor="ktp" className="block text-sm font-medium text-gray-700 mb-1">
          KTP <span className="text-red-500">*</span>
        </label>
        <input
          id="ktp"
          type="file"
          accept="image/*,.pdf"
          required
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null
            updateFormData({ step3: { ...step3, ktpFile: file } as any })
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-danatharu-gold focus:border-transparent"
        />
        {ktpPreview && (
          <div className="mt-2">
            <img src={ktpPreview} alt="KTP preview" className="max-w-xs rounded-lg border" />
          </div>
        )}
      </div>
      <div className="w-full">
        <label htmlFor="selfie" className="block text-sm font-medium text-gray-700 mb-1">
          Selfie dengan KTP <span className="text-red-500">*</span>
        </label>
        <input
          id="selfie"
          type="file"
          accept="image/*"
          required
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null
            updateFormData({ step3: { ...step3, selfieFile: file } as any })
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-danatharu-gold focus:border-transparent"
        />
        {selfiePreview && (
          <div className="mt-2">
            <img src={selfiePreview} alt="Selfie preview" className="max-w-xs rounded-lg border" />
          </div>
        )}
      </div>
    </div>
  )
}

function Step4Konfirmasi({ bprId, produkId }: { bprId: string; produkId: string }) {
  const { formData, updateFormData } = useEnrollment()
  const bpr = getBprById(bprId)
  const produk = getProductById(produkId)
  const step1 = formData.step1
  const step2 = formData.step2
  const [agreed, setAgreed] = useState(false)

  useEffect(() => {
    updateFormData({ bprId, produkId, step4: { agreed } as any } as any)
  }, [agreed, bprId, produkId])

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-danatharu-blue">Konfirmasi</h2>

      <Card title="Data Pribadi">
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Nama:</span> {step1?.nama}</p>
          <p><span className="font-medium">NIK:</span> {step1?.nik}</p>
          <p><span className="font-medium">Tanggal Lahir:</span> {step1?.tanggalLahir}</p>
          <p><span className="font-medium">No HP:</span> {step1?.noHP}</p>
          <p><span className="font-medium">Email:</span> {step1?.email}</p>
        </div>
      </Card>

      <Card title="Data Alamat">
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Alamat:</span> {step2?.alamat}</p>
          <p><span className="font-medium">Kota:</span> {step2?.kota}</p>
          <p><span className="font-medium">Pekerjaan:</span> {step2?.pekerjaan}</p>
          <p><span className="font-medium">Penghasilan:</span> {step2?.penghasilan ? formatCurrency(step2.penghasilan) : '-'}</p>
        </div>
      </Card>

      <Card title="Detail Produk">
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">BPR:</span> {bpr?.nama}</p>
          <p><span className="font-medium">Produk:</span> {produk?.jenis} - {formatTenor(produk?.tenor ?? 0)}</p>
          <p><span className="font-medium">Suku Bunga:</span> {produk?.sukuBunga.toFixed(2)}%</p>
          <p><span className="font-medium">Min. Setoran:</span> {produk ? formatCurrency(produk.minimalSetoran) : '-'}</p>
          <p><span className="font-medium">Max. Setoran:</span> {produk ? formatCurrency(produk.maksimalSetoran) : '-'}</p>
        </div>
      </Card>

      <Checkbox
        label="Saya menyetujui syarat dan ketentuan"
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
      />
    </div>
  )
}

function SuccessState({ refNumber }: { refNumber: string }) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-serif font-bold text-danatharu-blue mb-2">Pendaftaran Berhasil!</h2>
      <p className="text-gray-600 mb-4">Terima kasih telah mendaftar di Danatharu</p>
      <Badge variant="success">No. Referensi: {refNumber}</Badge>
      <div className="mt-6">
        <Link to="/marketplace">
          <Button variant="primary">Kembali ke Marketplace</Button>
        </Link>
      </div>
    </div>
  )
}

export default function EnrollmentPage() {
  const { bprId, produkId } = useParams<{ bprId: string; produkId: string }>()
  const { currentStep, nextStep, prevStep, error, isSubmitting, submitEnrollment } = useEnrollment()
  const [successRef, setSuccessRef] = useState<string | null>(null)

  const bpr = bprId ? getBprById(bprId) : null
  const produk = produkId ? getProductById(produkId) : null

  const handleSubmit = async () => {
    const success = await submitEnrollment()
    if (success) {
      const ref = `REF-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      setSuccessRef(ref)
    }
  }

  if (!bpr || !produk) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg text-gray-500">BPR atau produk tidak ditemukan</p>
            <Link to="/marketplace" className="text-danatharu-green hover:underline mt-2 inline-block">
              Kembali ke Marketplace
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (successRef) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <SuccessState refNumber={successRef} />
          </Card>
        </div>
      </div>
    )
  }

  const progressValue = (currentStep / 4) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/bpr/${bprId}`}
          className="inline-flex items-center text-danatharu-green hover:text-danatharu-blue transition-colors mb-6"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </Link>

        <Card>
          <div className="mb-6">
            <ProgressBar value={progressValue} label={`Langkah ${currentStep} dari 4`} />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {currentStep === 1 && <Step1DataPribadi />}
          {currentStep === 2 && <Step2DataAlamat />}
          {currentStep === 3 && <Step3UploadDokumen />}
          {currentStep === 4 && (
            <Step4Konfirmasi
              bprId={bprId!}
              produkId={produkId!}
            />
          )}

          <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
            {currentStep > 1 && (
              <Button variant="outline" onClick={prevStep}>
                Sebelumnya
              </Button>
            )}
            {currentStep < 4 && (
              <Button variant="primary" onClick={nextStep} className="ml-auto">
                Selanjutnya
              </Button>
            )}
            {currentStep === 4 && (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="ml-auto"
              >
                {isSubmitting ? 'Mengirim...' : 'Submit'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
