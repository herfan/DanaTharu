import { describe, it, expect } from 'vitest';
import {
  getAllBpr,
  getBprById,
  getAllProducts,
  getProductsByBprId,
  getProductById,
  searchBpr,
  filterProducts,
} from '../mockData';

describe('mockData service', () => {
  describe('getAllBpr', () => {
    it('returns all 5 BPRs', () => {
      const bprs = getAllBpr();
      expect(bprs).toHaveLength(5);
    });

    it('each BPR has required fields', () => {
      const bprs = getAllBpr();
      bprs.forEach((bpr) => {
        expect(bpr).toHaveProperty('id');
        expect(bpr).toHaveProperty('nama');
        expect(bpr).toHaveProperty('kota');
        expect(bpr).toHaveProperty('provinsi');
        expect(bpr).toHaveProperty('logo');
        expect(bpr).toHaveProperty('rating');
        expect(bpr).toHaveProperty('jumlahNasabah');
        expect(bpr).toHaveProperty('terdaftarOJK');
        expect(bpr).toHaveProperty('dijaminLPS');
        expect(bpr).toHaveProperty('produkDeposito');
      });
    });

    it('includes both conventional and syariah BPRs', () => {
      const bprs = getAllBpr();
      const products = bprs.flatMap((bpr) => bpr.produkDeposito);
      const jenisSet = new Set(products.map((p) => p.jenis));
      expect(jenisSet.has('Konvensional')).toBe(true);
      expect(jenisSet.has('Syariah')).toBe(true);
    });
  });

  describe('getBprById', () => {
    it('returns BPR for valid id', () => {
      const bpr = getBprById('bpr-1');
      expect(bpr).toBeDefined();
      expect(bpr?.id).toBe('bpr-1');
    });

    it('returns undefined for invalid id', () => {
      const bpr = getBprById('invalid-id');
      expect(bpr).toBeUndefined();
    });
  });

  describe('getAllProducts', () => {
    it('returns all products', () => {
      const products = getAllProducts();
      expect(products.length).toBeGreaterThanOrEqual(10);
    });

    it('each product has required fields', () => {
      const products = getAllProducts();
      products.forEach((product) => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('bprId');
        expect(product).toHaveProperty('tenor');
        expect(product).toHaveProperty('sukuBunga');
        expect(product).toHaveProperty('minimalSetoran');
        expect(product).toHaveProperty('maksimalSetoran');
        expect(product).toHaveProperty('jenis');
        expect(product).toHaveProperty('catatan');
      });
    });

    it('interest rates are in realistic range (4-8%)', () => {
      const products = getAllProducts();
      products.forEach((product) => {
        expect(product.sukuBunga).toBeGreaterThanOrEqual(4);
        expect(product.sukuBunga).toBeLessThanOrEqual(8);
      });
    });

    it('minimum deposits are in realistic range (1M-10M IDR)', () => {
      const products = getAllProducts();
      products.forEach((product) => {
        expect(product.minimalSetoran).toBeGreaterThanOrEqual(1_000_000);
        expect(product.minimalSetoran).toBeLessThanOrEqual(10_000_000);
      });
    });
  });

  describe('getProductsByBprId', () => {
    it('returns products for valid BPR id', () => {
      const products = getProductsByBprId('bpr-1');
      expect(products.length).toBeGreaterThanOrEqual(2);
      expect(products.length).toBeLessThanOrEqual(3);
    });

    it('all returned products belong to the BPR', () => {
      const products = getProductsByBprId('bpr-2');
      products.forEach((product) => {
        expect(product.bprId).toBe('bpr-2');
      });
    });

    it('returns empty array for invalid BPR id', () => {
      const products = getProductsByBprId('invalid-id');
      expect(products).toEqual([]);
    });
  });

  describe('getProductById', () => {
    it('returns product for valid id', () => {
      const product = getProductById('prod-1-1');
      expect(product).toBeDefined();
      expect(product?.id).toBe('prod-1-1');
    });

    it('returns undefined for invalid id', () => {
      const product = getProductById('invalid-product');
      expect(product).toBeUndefined();
    });
  });

  describe('searchBpr', () => {
    it('finds BPR by name', () => {
      const results = searchBpr('Artaloka');
      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results[0].nama).toContain('Artaloka');
    });

    it('finds BPR by partial name (case insensitive)', () => {
      const results = searchBpr('arta');
      expect(results.length).toBeGreaterThanOrEqual(1);
    });

    it('returns empty array for no match', () => {
      const results = searchBpr('xyznonexistent');
      expect(results).toEqual([]);
    });
  });

  describe('filterProducts', () => {
    it('filters by minimum rate', () => {
      const products = filterProducts({ minRate: 6 });
      products.forEach((product) => {
        expect(product.sukuBunga).toBeGreaterThanOrEqual(6);
      });
    });

    it('filters by maximum rate', () => {
      const products = filterProducts({ maxRate: 5 });
      products.forEach((product) => {
        expect(product.sukuBunga).toBeLessThanOrEqual(5);
      });
    });

    it('filters by rate range', () => {
      const products = filterProducts({ minRate: 5, maxRate: 6 });
      products.forEach((product) => {
        expect(product.sukuBunga).toBeGreaterThanOrEqual(5);
        expect(product.sukuBunga).toBeLessThanOrEqual(6);
      });
    });

    it('filters by tenure', () => {
      const products = filterProducts({ tenure: [3, 6] });
      products.forEach((product) => {
        expect([3, 6]).toContain(product.tenor);
      });
    });

    it('returns all products when no filters provided', () => {
      const products = filterProducts({});
      expect(products).toEqual(getAllProducts());
    });

    it('combines multiple filters', () => {
      const products = filterProducts({ minRate: 5, tenure: [6, 12] });
      products.forEach((product) => {
        expect(product.sukuBunga).toBeGreaterThanOrEqual(5);
        expect([6, 12]).toContain(product.tenor);
      });
    });
  });
});
