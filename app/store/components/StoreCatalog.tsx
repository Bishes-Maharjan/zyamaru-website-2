'use client';

import { useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import StoreNavbar from './StoreNavbar';

interface Product {
  id: number;
  productName: string;
  modelName?: string;
  category: string;
  categoryId?: number;
  price: number;
  image: string | null;
  availableQuantity: number;
}

interface Category {
  id: number;
  name: string;
}

interface PaginationData {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

interface StoreCatalogProps {
  initialProducts: Product[];
  initialPagination: PaginationData;
  initialCategories: Category[];
}

export default function StoreCatalog({ initialProducts, initialPagination, initialCategories }: StoreCatalogProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [pagination, setPagination] = useState<PaginationData>(initialPagination);
  const [categories] = useState<Category[]>(initialCategories);
  const [isLoading, setIsLoading] = useState(false);

  // Filter state
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [availability, setAvailability] = useState('all');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Debounce price inputs
  const [debouncedMinPrice, setDebouncedMinPrice] = useState('');
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedMinPrice(minPrice), 500);
    return () => clearTimeout(timer);
  }, [minPrice]);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedMaxPrice(maxPrice), 500);
    return () => clearTimeout(timer);
  }, [maxPrice]);

  const fetchProducts = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', page.toString());
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (categoryId) params.set('categoryId', categoryId);
      if (sortBy) params.set('sortBy', sortBy);
      if (debouncedMinPrice) params.set('minPrice', debouncedMinPrice);
      if (debouncedMaxPrice) params.set('maxPrice', debouncedMaxPrice);
      if (availability !== 'all') params.set('availability', availability);

      const res = await fetch(`/api/store?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, categoryId, sortBy, debouncedMinPrice, debouncedMaxPrice, availability]);

  // Refetch when any filter changes (reset to page 1)
  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchProducts(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resultText = pagination.totalCount === 1
    ? '1 product found'
    : `${pagination.totalCount} products found`;

  return (
    <div className="store-layout">
      <StoreNavbar
        categories={categories}
        search={search}
        onSearchChange={setSearch}
        categoryId={categoryId}
        onCategoryChange={setCategoryId}
        sortBy={sortBy}
        onSortChange={setSortBy}
        minPrice={minPrice}
        onMinPriceChange={setMinPrice}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        availability={availability}
        onAvailabilityChange={setAvailability}
      />

      <div className="store-main-content">
        <div className="store-results-bar">
          <span>{resultText}</span>
      </div>

      {/* Loading / Grid / Empty */}
      {isLoading ? (
        <div className="store-loading">
          <div className="store-loading-spinner" />
          <p>Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="store-empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--store-text-secondary)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, marginBottom: '1rem' }}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <h2>No products found</h2>
          <p>Try adjusting your filters or search query.</p>
          <button
            className="store-btn store-btn-primary"
            style={{ marginTop: '1rem' }}
            onClick={() => {
              setSearch('');
              setCategoryId('');
              setSortBy('newest');
              setMinPrice('');
              setMaxPrice('');
              setAvailability('all');
            }}
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard key={product.id} {...product} priority={index < 4} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="store-pagination">
          <button
            className="pagination-btn"
            disabled={pagination.page <= 1 || isLoading}
            onClick={() => handlePageChange(pagination.page - 1)}
          >
            ← Previous
          </button>

          <div className="pagination-pages">
            {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
              const startPage = Math.max(1, Math.min(pagination.page - 2, pagination.totalPages - 4));
              const pageNum = startPage + i;
              if (pageNum > pagination.totalPages) return null;
              return (
                <button
                  key={pageNum}
                  className={`pagination-page ${pagination.page === pageNum ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={isLoading}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            className="pagination-btn"
            disabled={pagination.page >= pagination.totalPages || isLoading}
            onClick={() => handlePageChange(pagination.page + 1)}
          >
            Next →
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
