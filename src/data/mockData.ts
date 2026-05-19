import type { BPR, ProdukDeposito } from '../types';

const mockBprs: BPR[] = [
  {
    id: 'bpr-1',
    nama: 'BPR Artaloka',
    kota: 'Denpasar',
    provinsi: 'Bali',
    logo: '/logos/artaloka.png',
    rating: 4.5,
    jumlahNasabah: 12500,
    terdaftarOJK: true,
    dijaminLPS: true,
    produkDeposito: [],
  },
  {
    id: 'bpr-2',
    nama: 'BPR Dana Mulia',
    kota: 'Jakarta',
    provinsi: 'DKI Jakarta',
    logo: '/logos/danamulia.png',
    rating: 4.3,
    jumlahNasabah: 8700,
    terdaftarOJK: true,
    dijaminLPS: true,
    produkDeposito: [],
  },
  {
    id: 'bpr-3',
    nama: 'BPR Syariah Amanah Umat',
    kota: 'Bandung',
    provinsi: 'Jawa Barat',
    logo: '/logos/amanahumat.png',
    rating: 4.7,
    jumlahNasabah: 15200,
    terdaftarOJK: true,
    dijaminLPS: true,
    produkDeposito: [],
  },
  {
    id: 'bpr-4',
    nama: 'BPR Artha Sentosa',
    kota: 'Surabaya',
    provinsi: 'Jawa Timur',
    logo: '/logos/arthasentosa.png',
    rating: 4.1,
    jumlahNasabah: 6300,
    terdaftarOJK: true,
    dijaminLPS: true,
    produkDeposito: [],
  },
  {
    id: 'bpr-5',
    nama: 'BPR Syariah Berkah Madani',
    kota: 'Yogyakarta',
    provinsi: 'DI Yogyakarta',
    logo: '/logos/berkahmadani.png',
    rating: 4.6,
    jumlahNasabah: 9800,
    terdaftarOJK: true,
    dijaminLPS: true,
    produkDeposito: [],
  },
];

const mockProducts: ProdukDeposito[] = [
  {
    id: 'prod-1-1',
    bprId: 'bpr-1',
    tenor: 1,
    sukuBunga: 5.5,
    minimalSetoran: 1_000_000,
    maksimalSetoran: 50_000_000,
    jenis: 'Konvensional',
    catatan: 'Deposito berjangka 1 bulan dengan bunga kompetitif',
  },
  {
    id: 'prod-1-2',
    bprId: 'bpr-1',
    tenor: 3,
    sukuBunga: 6.0,
    minimalSetoran: 1_000_000,
    maksimalSetoran: 100_000_000,
    jenis: 'Konvensional',
    catatan: 'Deposito 3 bulan dengan suku bunga menarik',
  },
  {
    id: 'prod-1-3',
    bprId: 'bpr-1',
    tenor: 12,
    sukuBunga: 7.0,
    minimalSetoran: 5_000_000,
    maksimalSetoran: 200_000_000,
    jenis: 'Konvensional',
    catatan: 'Deposito 12 bulan dengan bunga maksimal',
  },
  {
    id: 'prod-2-1',
    bprId: 'bpr-2',
    tenor: 1,
    sukuBunga: 5.0,
    minimalSetoran: 2_000_000,
    maksimalSetoran: 50_000_000,
    jenis: 'Konvensional',
    catatan: 'Deposito fleksibel 1 bulan',
  },
  {
    id: 'prod-2-2',
    bprId: 'bpr-2',
    tenor: 6,
    sukuBunga: 6.5,
    minimalSetoran: 1_000_000,
    maksimalSetoran: 100_000_000,
    jenis: 'Konvensional',
    catatan: 'Deposito 6 bulan dengan bunga premium',
  },
  {
    id: 'prod-2-3',
    bprId: 'bpr-2',
    tenor: 12,
    sukuBunga: 7.5,
    minimalSetoran: 5_000_000,
    maksimalSetoran: 250_000_000,
    jenis: 'Konvensional',
    catatan: 'Deposito jangka panjang dengan bunga tertinggi',
  },
  {
    id: 'prod-3-1',
    bprId: 'bpr-3',
    tenor: 1,
    sukuBunga: 5.25,
    minimalSetoran: 1_000_000,
    maksimalSetoran: 50_000_000,
    jenis: 'Syariah',
    catatan: 'Deposito syariah bagi hasil 1 bulan',
  },
  {
    id: 'prod-3-2',
    bprId: 'bpr-3',
    tenor: 3,
    sukuBunga: 5.75,
    minimalSetoran: 1_000_000,
    maksimalSetoran: 100_000_000,
    jenis: 'Syariah',
    catatan: 'Deposito syariah bagi hasil 3 bulan',
  },
  {
    id: 'prod-3-3',
    bprId: 'bpr-3',
    tenor: 12,
    sukuBunga: 6.75,
    minimalSetoran: 3_000_000,
    maksimalSetoran: 200_000_000,
    jenis: 'Syariah',
    catatan: 'Deposito syariah bagi hasil 12 bulan',
  },
  {
    id: 'prod-4-1',
    bprId: 'bpr-4',
    tenor: 3,
    sukuBunga: 5.5,
    minimalSetoran: 2_000_000,
    maksimalSetoran: 75_000_000,
    jenis: 'Konvensional',
    catatan: 'Deposito 3 bunga stabil',
  },
  {
    id: 'prod-4-2',
    bprId: 'bpr-4',
    tenor: 6,
    sukuBunga: 6.25,
    minimalSetoran: 1_000_000,
    maksimalSetoran: 100_000_000,
    jenis: 'Konvensional',
    catatan: 'Deposito 6 bulan dengan bonus nasabah baru',
  },
  {
    id: 'prod-5-1',
    bprId: 'bpr-5',
    tenor: 1,
    sukuBunga: 4.75,
    minimalSetoran: 1_000_000,
    maksimalSetoran: 50_000_000,
    jenis: 'Syariah',
    catatan: 'Deposito syariah mudharabah 1 bulan',
  },
  {
    id: 'prod-5-2',
    bprId: 'bpr-5',
    tenor: 6,
    sukuBunga: 6.0,
    minimalSetoran: 2_000_000,
    maksimalSetoran: 100_000_000,
    jenis: 'Syariah',
    catatan: 'Deposito syariah mudharabah 6 bulan',
  },
  {
    id: 'prod-5-3',
    bprId: 'bpr-5',
    tenor: 12,
    sukuBunga: 7.25,
    minimalSetoran: 5_000_000,
    maksimalSetoran: 250_000_000,
    jenis: 'Syariah',
    catatan: 'Deposito syariah mudharabah 12 bulan bagi hasil optimal',
  },
];

mockBprs.forEach((bpr) => {
  bpr.produkDeposito = mockProducts.filter((p) => p.bprId === bpr.id);
});

export function getAllBpr(): BPR[] {
  return mockBprs;
}

export function getBprById(id: string): BPR | undefined {
  return mockBprs.find((bpr) => bpr.id === id);
}

export function getAllProducts(): ProdukDeposito[] {
  return mockProducts;
}

export function getProductsByBprId(bprId: string): ProdukDeposito[] {
  return mockProducts.filter((product) => product.bprId === bprId);
}

export function getProductById(id: string): ProdukDeposito | undefined {
  return mockProducts.find((product) => product.id === id);
}

export function searchBpr(query: string): BPR[] {
  const lowerQuery = query.toLowerCase();
  return mockBprs.filter(
    (bpr) =>
      bpr.nama.toLowerCase().includes(lowerQuery) ||
      bpr.kota.toLowerCase().includes(lowerQuery) ||
      bpr.provinsi.toLowerCase().includes(lowerQuery),
  );
}

export function filterProducts(filters: {
  minRate?: number;
  maxRate?: number;
  tenure?: number[];
}): ProdukDeposito[] {
  return mockProducts.filter((product) => {
    if (filters.minRate !== undefined && product.sukuBunga < filters.minRate) {
      return false;
    }
    if (filters.maxRate !== undefined && product.sukuBunga > filters.maxRate) {
      return false;
    }
    if (filters.tenure !== undefined && !filters.tenure.includes(product.tenor)) {
      return false;
    }
    return true;
  });
}
