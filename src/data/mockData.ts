import type { BPR, ProdukDeposito } from '../types';

const mockProducts: ProdukDeposito[] = [
  // BPR Artaloka (Bali)
  { id: 'prod-1-1', bprId: 'bpr-1', tenor: 1, sukuBunga: 5.5, minimalSetoran: 1_000_000, maksimalSetoran: 50_000_000, jenis: 'Konvensional', catatan: 'Deposito berjangka 1 bulan dengan bunga kompetitif' },
  { id: 'prod-1-2', bprId: 'bpr-1', tenor: 3, sukuBunga: 6.0, minimalSetoran: 1_000_000, maksimalSetoran: 100_000_000, jenis: 'Konvensional', catatan: 'Deposito 3 bulan dengan suku bunga menarik' },
  { id: 'prod-1-3', bprId: 'bpr-1', tenor: 12, sukuBunga: 7.0, minimalSetoran: 5_000_000, maksimalSetoran: 200_000_000, jenis: 'Konvensional', catatan: 'Deposito 12 bulan dengan bunga maksimal' },
  // BPR Dana Mulia (Jakarta)
  { id: 'prod-2-1', bprId: 'bpr-2', tenor: 1, sukuBunga: 5.0, minimalSetoran: 2_000_000, maksimalSetoran: 50_000_000, jenis: 'Konvensional', catatan: 'Deposito fleksibel 1 bulan' },
  { id: 'prod-2-2', bprId: 'bpr-2', tenor: 6, sukuBunga: 6.5, minimalSetoran: 1_000_000, maksimalSetoran: 100_000_000, jenis: 'Konvensional', catatan: 'Deposito 6 bulan dengan bunga premium' },
  { id: 'prod-2-3', bprId: 'bpr-2', tenor: 12, sukuBunga: 7.5, minimalSetoran: 5_000_000, maksimalSetoran: 250_000_000, jenis: 'Konvensional', catatan: 'Deposito jangka panjang dengan bunga tertinggi' },
  // BPR Syariah Amanah Umat (Bandung)
  { id: 'prod-3-1', bprId: 'bpr-3', tenor: 1, sukuBunga: 5.25, minimalSetoran: 1_000_000, maksimalSetoran: 50_000_000, jenis: 'Syariah', catatan: 'Deposito syariah bagi hasil 1 bulan' },
  { id: 'prod-3-2', bprId: 'bpr-3', tenor: 3, sukuBunga: 5.75, minimalSetoran: 1_000_000, maksimalSetoran: 100_000_000, jenis: 'Syariah', catatan: 'Deposito syariah bagi hasil 3 bulan' },
  { id: 'prod-3-3', bprId: 'bpr-3', tenor: 12, sukuBunga: 6.75, minimalSetoran: 3_000_000, maksimalSetoran: 200_000_000, jenis: 'Syariah', catatan: 'Deposito syariah bagi hasil 12 bulan' },
  // BPR Artha Sentosa (Surabaya)
  { id: 'prod-4-1', bprId: 'bpr-4', tenor: 3, sukuBunga: 5.5, minimalSetoran: 2_000_000, maksimalSetoran: 75_000_000, jenis: 'Konvensional', catatan: 'Deposito 3 bulan dengan bunga stabil' },
  { id: 'prod-4-2', bprId: 'bpr-4', tenor: 6, sukuBunga: 6.25, minimalSetoran: 1_000_000, maksimalSetoran: 100_000_000, jenis: 'Konvensional', catatan: 'Deposito 6 bulan dengan bonus nasabah baru' },
  // BPR Syariah Berkah Madani (Yogyakarta)
  { id: 'prod-5-1', bprId: 'bpr-5', tenor: 1, sukuBunga: 4.75, minimalSetoran: 1_000_000, maksimalSetoran: 50_000_000, jenis: 'Syariah', catatan: 'Deposito syariah mudharabah 1 bulan' },
  { id: 'prod-5-2', bprId: 'bpr-5', tenor: 6, sukuBunga: 6.0, minimalSetoran: 2_000_000, maksimalSetoran: 100_000_000, jenis: 'Syariah', catatan: 'Deposito syariah mudharabah 6 bulan' },
  { id: 'prod-5-3', bprId: 'bpr-5', tenor: 12, sukuBunga: 7.25, minimalSetoran: 5_000_000, maksimalSetoran: 250_000_000, jenis: 'Syariah', catatan: 'Deposito syariah mudharabah 12 bulan bagi hasil optimal' },
  // BPR Mitra Sejahtera (Semarang)
  { id: 'prod-6-1', bprId: 'bpr-6', tenor: 1, sukuBunga: 5.25, minimalSetoran: 1_000_000, maksimalSetoran: 50_000_000, jenis: 'Konvensional', catatan: 'Deposito 1 bulan dengan proses cepat' },
  { id: 'prod-6-2', bprId: 'bpr-6', tenor: 6, sukuBunga: 6.5, minimalSetoran: 2_000_000, maksimalSetoran: 100_000_000, jenis: 'Konvensional', catatan: 'Deposito 6 bunga kompetitif' },
  { id: 'prod-6-3', bprId: 'bpr-6', tenor: 12, sukuBunga: 7.75, minimalSetoran: 5_000_000, maksimalSetoran: 200_000_000, jenis: 'Konvensional', catatan: 'Deposito 12 bulan bunga tertinggi' },
  // BPR Karya Mandiri (Bandung)
  { id: 'prod-7-1', bprId: 'bpr-7', tenor: 3, sukuBunga: 5.75, minimalSetoran: 1_000_000, maksimalSetoran: 75_000_000, jenis: 'Konvensional', catatan: 'Deposito 3 bulan fleksibel' },
  { id: 'prod-7-2', bprId: 'bpr-7', tenor: 6, sukuBunga: 6.25, minimalSetoran: 2_000_000, maksimalSetoran: 150_000_000, jenis: 'Konvensional', catatan: 'Deposito 6 bulan dengan hadiah' },
  // BPR Syariah Berkah Indonesia (Jakarta)
  { id: 'prod-8-1', bprId: 'bpr-8', tenor: 1, sukuBunga: 5.0, minimalSetoran: 1_000_000, maksimalSetoran: 50_000_000, jenis: 'Syariah', catatan: 'Deposito syariah bagi hasil 1 bulan' },
  { id: 'prod-8-2', bprId: 'bpr-8', tenor: 3, sukuBunga: 5.5, minimalSetoran: 1_000_000, maksimalSetoran: 100_000_000, jenis: 'Syariah', catatan: 'Deposito syariah bagi hasil 3 bulan' },
  { id: 'prod-8-3', bprId: 'bpr-8', tenor: 12, sukuBunga: 6.5, minimalSetoran: 3_000_000, maksimalSetoran: 200_000_000, jenis: 'Syariah', catatan: 'Deposito syariah bagi hasil 12 bulan' },
  // BPR Dana Rakyat (Yogyakarta)
  { id: 'prod-9-1', bprId: 'bpr-9', tenor: 1, sukuBunga: 5.0, minimalSetoran: 500_000, maksimalSetoran: 50_000_000, jenis: 'Konvensional', catatan: 'Deposito 1 bulan minimal rendah' },
  { id: 'prod-9-2', bprId: 'bpr-9', tenor: 6, sukuBunga: 6.0, minimalSetoran: 1_000_000, maksimalSetoran: 100_000_000, jenis: 'Konvensional', catatan: 'Deposito 6 bunga menarik' },
  { id: 'prod-9-3', bprId: 'bpr-9', tenor: 12, sukuBunga: 7.0, minimalSetoran: 5_000_000, maksimalSetoran: 200_000_000, jenis: 'Konvensional', catatan: 'Deposito 12 bulan bunga maksimal' },
  // BPR Pundi Makmur (Surabaya)
  { id: 'prod-10-1', bprId: 'bpr-10', tenor: 3, sukuBunga: 5.5, minimalSetoran: 1_000_000, maksimalSetoran: 75_000_000, jenis: 'Konvensional', catatan: 'Deposito 3 bulan stabil' },
  { id: 'prod-10-2', bprId: 'bpr-10', tenor: 12, sukuBunga: 7.25, minimalSetoran: 5_000_000, maksimalSetoran: 250_000_000, jenis: 'Konvensional', catatan: 'Deposito 12 bunga premium' },
  // BPR Syariah Amanah Sejahtera (Semarang)
  { id: 'prod-11-1', bprId: 'bpr-11', tenor: 1, sukuBunga: 4.75, minimalSetoran: 1_000_000, maksimalSetoran: 50_000_000, jenis: 'Syariah', catatan: 'Deposito syariah mudharabah 1 bulan' },
  { id: 'prod-11-2', bprId: 'bpr-11', tenor: 6, sukuBunga: 5.75, minimalSetoran: 2_000_000, maksimalSetoran: 100_000_000, jenis: 'Syariah', catatan: 'Deposito syariah mudharabah 6 bulan' },
  { id: 'prod-11-3', bprId: 'bpr-11', tenor: 12, sukuBunga: 6.75, minimalSetoran: 5_000_000, maksimalSetoran: 200_000_000, jenis: 'Syariah', catatan: 'Deposito syariah mudharabah 12 bulan' },
  // BPR Bali Sentosa (Bali)
  { id: 'prod-12-1', bprId: 'bpr-12', tenor: 1, sukuBunga: 5.25, minimalSetoran: 1_000_000, maksimalSetoran: 50_000_000, jenis: 'Konvensional', catatan: 'Deposito 1 bulan bunga bersaing' },
  { id: 'prod-12-2', bprId: 'bpr-12', tenor: 3, sukuBunga: 5.75, minimalSetoran: 1_000_000, maksimalSetoran: 100_000_000, jenis: 'Konvensional', catatan: 'Deposito 3 bunga menarik' },
  { id: 'prod-12-3', bprId: 'bpr-12', tenor: 12, sukuBunga: 7.0, minimalSetoran: 5_000_000, maksimalSetoran: 200_000_000, jenis: 'Konvensional', catatan: 'Deposito 12 bulan bunga optimal' },
  // BPR Mitra Usaha (Jakarta)
  { id: 'prod-13-1', bprId: 'bpr-13', tenor: 3, sukuBunga: 5.5, minimalSetoran: 2_000_000, maksimalSetoran: 75_000_000, jenis: 'Konvensional', catatan: 'Deposito 3 bulan untuk UMKM' },
  { id: 'prod-13-2', bprId: 'bpr-13', tenor: 6, sukuBunga: 6.25, minimalSetoran: 1_000_000, maksimalSetoran: 100_000_000, jenis: 'Konvensional', catatan: 'Deposito 6 bulan bunga stabil' },
  // BPR Syariah Nuansa Iman (Bandung)
  { id: 'prod-14-1', bprId: 'bpr-14', tenor: 1, sukuBunga: 5.0, minimalSetoran: 1_000_000, maksimalSetoran: 50_000_000, jenis: 'Syariah', catatan: 'Deposito syariah bagi hasil 1 bulan' },
  { id: 'prod-14-2', bprId: 'bpr-14', tenor: 6, sukuBunga: 5.5, minimalSetoran: 1_000_000, maksimalSetoran: 100_000_000, jenis: 'Syariah', catatan: 'Deposito syariah bagi hasil 6 bulan' },
  { id: 'prod-14-3', bprId: 'bpr-14', tenor: 12, sukuBunga: 6.5, minimalSetoran: 3_000_000, maksimalSetoran: 200_000_000, jenis: 'Syariah', catatan: 'Deposito syariah bagi hasil 12 bulan' },
  // BPR Dana Jaya (Semarang)
  { id: 'prod-15-1', bprId: 'bpr-15', tenor: 1, sukuBunga: 5.0, minimalSetoran: 1_000_000, maksimalSetoran: 50_000_000, jenis: 'Konvensional', catatan: 'Deposito 1 bunga kompetitif' },
  { id: 'prod-15-2', bprId: 'bpr-15', tenor: 3, sukuBunga: 5.5, minimalSetoran: 1_000_000, maksimalSetoran: 100_000_000, jenis: 'Konvensional', catatan: 'Deposito 3 bulan menarik' },
  { id: 'prod-15-3', bprId: 'bpr-15', tenor: 12, sukuBunga: 6.75, minimalSetoran: 5_000_000, maksimalSetoran: 200_000_000, jenis: 'Konvensional', catatan: 'Deposito 12 bunga maksimal' },
  // BPR Syariah Rahmatan (Surabaya)
  { id: 'prod-16-1', bprId: 'bpr-16', tenor: 1, sukuBunga: 4.5, minimalSetoran: 1_000_000, maksimalSetoran: 50_000_000, jenis: 'Syariah', catatan: 'Deposito syariah mudharabah 1 bulan' },
  { id: 'prod-16-2', bprId: 'bpr-16', tenor: 3, sukuBunga: 5.25, minimalSetoran: 1_000_000, maksimalSetoran: 100_000_000, jenis: 'Syariah', catatan: 'Deposito syariah mudharabah 3 bulan' },
  { id: 'prod-16-3', bprId: 'bpr-16', tenor: 12, sukuBunga: 6.25, minimalSetoran: 3_000_000, maksimalSetoran: 200_000_000, jenis: 'Syariah', catatan: 'Deposito syariah mudharabah 12 bulan' },
  // BPR Karyamas (Yogyakarta)
  { id: 'prod-17-1', bprId: 'bpr-17', tenor: 3, sukuBunga: 5.5, minimalSetoran: 1_000_000, maksimalSetoran: 75_000_000, jenis: 'Konvensional', catatan: 'Deposito 3 bulan bunga stabil' },
  { id: 'prod-17-2', bprId: 'bpr-17', tenor: 6, sukuBunga: 6.0, minimalSetoran: 2_000_000, maksimalSetoran: 100_000_000, jenis: 'Konvensional', catatan: 'Deposito 6 bunga menarik' },
  { id: 'prod-17-3', bprId: 'bpr-17', tenor: 12, sukuBunga: 7.0, minimalSetoran: 5_000_000, maksimalSetoran: 200_000_000, jenis: 'Konvensional', catatan: 'Deposito 12 bunga premium' },
  // BPR Artha Graha (Bali)
  { id: 'prod-18-1', bprId: 'bpr-18', tenor: 1, sukuBunga: 5.0, minimalSetoran: 1_000_000, maksimalSetoran: 50_000_000, jenis: 'Konvensional', catatan: 'Deposito 1 bulan proses cepat' },
  { id: 'prod-18-2', bprId: 'bpr-18', tenor: 6, sukuBunga: 6.25, minimalSetoran: 2_000_000, maksimalSetoran: 100_000_000, jenis: 'Konvensional', catatan: 'Deposito 6 bunga kompetitif' },
  // BPR Syariah Fajar Barokah (Jakarta)
  { id: 'prod-19-1', bprId: 'bpr-19', tenor: 1, sukuBunga: 4.75, minimalSetoran: 1_000_000, maksimalSetoran: 50_000_000, jenis: 'Syariah', catatan: 'Deposito syariah bagi hasil 1 bulan' },
  { id: 'prod-19-2', bprId: 'bpr-19', tenor: 3, sukuBunga: 5.25, minimalSetoran: 1_000_000, maksimalSetoran: 100_000_000, jenis: 'Syariah', catatan: 'Deposito syariah bagi hasil 3 bulan' },
  { id: 'prod-19-3', bprId: 'bpr-19', tenor: 12, sukuBunga: 6.5, minimalSetoran: 5_000_000, maksimalSetoran: 200_000_000, jenis: 'Syariah', catatan: 'Deposito syariah bagi hasil 12 bulan' },
  // BPR Sentosa Dana (Bandung)
  { id: 'prod-20-1', bprId: 'bpr-20', tenor: 3, sukuBunga: 5.75, minimalSetoran: 1_000_000, maksimalSetoran: 75_000_000, jenis: 'Konvensional', catatan: 'Deposito 3 bunga menarik' },
  { id: 'prod-20-2', bprId: 'bpr-20', tenor: 6, sukuBunga: 6.5, minimalSetoran: 2_000_000, maksimalSetoran: 150_000_000, jenis: 'Konvensional', catatan: 'Deposito 6 bulan bunga premium' },
  { id: 'prod-20-3', bprId: 'bpr-20', tenor: 12, sukuBunga: 8.0, minimalSetoran: 5_000_000, maksimalSetoran: 250_000_000, jenis: 'Konvensional', catatan: 'Deposito 12 bunga tertinggi di kelasnya' },
];

const mockBprs: BPR[] = [
  { id: 'bpr-1', nama: 'BPR Artaloka', kota: 'Denpasar', provinsi: 'Bali', logo: '/logos/artaloka.png', rating: 4.5, jumlahNasabah: 12500, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-1') },
  { id: 'bpr-2', nama: 'BPR Dana Mulia', kota: 'Jakarta', provinsi: 'DKI Jakarta', logo: '/logos/danamulia.png', rating: 4.3, jumlahNasabah: 8700, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-2') },
  { id: 'bpr-3', nama: 'BPR Syariah Amanah Umat', kota: 'Bandung', provinsi: 'Jawa Barat', logo: '/logos/amanahumat.png', rating: 4.7, jumlahNasabah: 15200, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-3') },
  { id: 'bpr-4', nama: 'BPR Artha Sentosa', kota: 'Surabaya', provinsi: 'Jawa Timur', logo: '/logos/arthasentosa.png', rating: 4.1, jumlahNasabah: 6300, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-4') },
  { id: 'bpr-5', nama: 'BPR Syariah Berkah Madani', kota: 'Yogyakarta', provinsi: 'DI Yogyakarta', logo: '/logos/berkahmadani.png', rating: 4.6, jumlahNasabah: 9800, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-5') },
  { id: 'bpr-6', nama: 'BPR Mitra Sejahtera', kota: 'Semarang', provinsi: 'Jawa Tengah', logo: '/logos/mitrasejahtera.png', rating: 4.4, jumlahNasabah: 11000, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-6') },
  { id: 'bpr-7', nama: 'BPR Karya Mandiri', kota: 'Bandung', provinsi: 'Jawa Barat', logo: '/logos/karyamandiri.png', rating: 4.2, jumlahNasabah: 7500, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-7') },
  { id: 'bpr-8', nama: 'BPR Syariah Berkah Indonesia', kota: 'Jakarta', provinsi: 'DKI Jakarta', logo: '/logos/berkahindonesia.png', rating: 4.5, jumlahNasabah: 13000, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-8') },
  { id: 'bpr-9', nama: 'BPR Dana Rakyat', kota: 'Yogyakarta', provinsi: 'DI Yogyakarta', logo: '/logos/danarakyat.png', rating: 4.0, jumlahNasabah: 5200, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-9') },
  { id: 'bpr-10', nama: 'BPR Pundi Makmur', kota: 'Surabaya', provinsi: 'Jawa Timur', logo: '/logos/pundimakmur.png', rating: 4.3, jumlahNasabah: 8900, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-10') },
  { id: 'bpr-11', nama: 'BPR Syariah Amanah Sejahtera', kota: 'Semarang', provinsi: 'Jawa Tengah', logo: '/logos/amanahsejahtera.png', rating: 4.6, jumlahNasabah: 10500, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-11') },
  { id: 'bpr-12', nama: 'BPR Bali Sentosa', kota: 'Denpasar', provinsi: 'Bali', logo: '/logos/balisentosa.png', rating: 4.4, jumlahNasabah: 9200, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-12') },
  { id: 'bpr-13', nama: 'BPR Mitra Usaha', kota: 'Jakarta', provinsi: 'DKI Jakarta', logo: '/logos/mitrausaha.png', rating: 4.1, jumlahNasabah: 6800, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-13') },
  { id: 'bpr-14', nama: 'BPR Syariah Nuansa Iman', kota: 'Bandung', provinsi: 'Jawa Barat', logo: '/logos/nuansaiman.png', rating: 4.7, jumlahNasabah: 14000, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-14') },
  { id: 'bpr-15', nama: 'BPR Dana Jaya', kota: 'Semarang', provinsi: 'Jawa Tengah', logo: '/logos/danajaya.png', rating: 4.2, jumlahNasabah: 7100, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-15') },
  { id: 'bpr-16', nama: 'BPR Syariah Rahmatan', kota: 'Surabaya', provinsi: 'Jawa Timur', logo: '/logos/rahmatan.png', rating: 4.5, jumlahNasabah: 11500, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-16') },
  { id: 'bpr-17', nama: 'BPR Karyamas', kota: 'Yogyakarta', provinsi: 'DI Yogyakarta', logo: '/logos/karyamas.png', rating: 4.3, jumlahNasabah: 8300, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-17') },
  { id: 'bpr-18', nama: 'BPR Artha Graha', kota: 'Denpasar', provinsi: 'Bali', logo: '/logos/arthagraha.png', rating: 4.0, jumlahNasabah: 5800, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-18') },
  { id: 'bpr-19', nama: 'BPR Syariah Fajar Barokah', kota: 'Jakarta', provinsi: 'DKI Jakarta', logo: '/logos/fajarbarokah.png', rating: 4.6, jumlahNasabah: 12800, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-19') },
  { id: 'bpr-20', nama: 'BPR Sentosa Dana', kota: 'Bandung', provinsi: 'Jawa Barat', logo: '/logos/sentosadana.png', rating: 4.4, jumlahNasabah: 9600, terdaftarOJK: true, dijaminLPS: true, produkDeposito: mockProducts.filter((p) => p.bprId === 'bpr-20') },
];

export function getAllBpr(): readonly BPR[] {
  return mockBprs;
}

export function getBprById(id: string): BPR | undefined {
  return mockBprs.find((bpr) => bpr.id === id);
}

export function getAllProducts(): readonly ProdukDeposito[] {
  return mockProducts;
}

export function getProductsByBprId(bprId: string): ProdukDeposito[] {
  return mockProducts.filter((product) => product.bprId === bprId);
}

export function getProductById(id: string): ProdukDeposito | undefined {
  return mockProducts.find((product) => product.id === id);
}

export function searchBpr(query: string): BPR[] {
  if (!query.trim()) return [];
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
} = {}): ProdukDeposito[] {
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
