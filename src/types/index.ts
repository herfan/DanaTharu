export interface BPR {
  id: string;
  nama: string;
  kota: string;
  provinsi: string;
  logo: string;
  rating: number;
  jumlahNasabah: number;
  terdaftarOJK: boolean;
  dijaminLPS: boolean;
  produkDeposito: ProdukDeposito[];
}

export interface ProdukDeposito {
  id: string;
  bprId: string;
  tenor: number;
  sukuBunga: number;
  minimalSetoran: number;
  maksimalSetoran: number;
  jenis: 'Konvensional' | 'Syariah';
  catatan: string;
}

export interface ComparisonItem {
  bpr: BPR;
  produk: ProdukDeposito;
}

export interface EnrollmentData {
  step1: {
    nama: string;
    nik: string;
    tanggalLahir: string;
    noHP: string;
    email: string;
  };
  step2: {
    alamat: string;
    kota: string;
    pekerjaan: string;
    penghasilan: number;
  };
  step3: {
    ktpFile: File | null;
    selfieFile: File | null;
  };
  bprId: string;
  produkId: string;
}

export type EnrollmentStep = 1 | 2 | 3 | 4 | 5;
