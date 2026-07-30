'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
}

interface StoreNavbarProps {
  categories: Category[];
  search: string;
  onSearchChange: (val: string) => void;
  categoryId: string;
  onCategoryChange: (val: string) => void;
  sortBy: string;
  onSortChange: (val: string) => void;
  minPrice: string;
  onMinPriceChange: (val: string) => void;
  maxPrice: string;
  onMaxPriceChange: (val: string) => void;
  availability: string;
  onAvailabilityChange: (val: string) => void;
}

export default function StoreNavbar({
  categories,
  search,
  onSearchChange,
  categoryId,
  onCategoryChange,
  sortBy,
  onSortChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  availability,
  onAvailabilityChange,
}: StoreNavbarProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setFiltersOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeFilterCount = [
    categoryId,
    minPrice,
    maxPrice,
    availability !== 'all' ? availability : '',
  ].filter(Boolean).length;

  return (
    <aside className="store-sidebar">
      <div className="store-navbar-inner">
        {/* Logo / Brand */}
        <Link href="/store" className="store-navbar-brand">
          <div style={{ position: 'relative', width: '50px', height: '50px' }}>
            <Image
              src="/logo.png"
              alt="ZYAMARU"
              fill
              sizes="50px"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <span className="store-navbar-brand-text">Store</span>
        </Link>

        {/* Search Bar */}
        <div className="store-navbar-search">
          <svg className="store-navbar-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="store-navbar-search-input"
          />
          {search && (
            <button className="store-navbar-search-clear" onClick={() => onSearchChange('')} aria-label="Clear search">
              ✕
            </button>
          )}
        </div>

        {/* Controls: Filters + Sort */}
        <div className="store-navbar-controls">
          {/* Filter Toggle */}
          <div ref={filtersRef} className="store-navbar-filters-wrapper">
            <button
              className={`store-navbar-filter-btn ${filtersOpen ? 'active' : ''}`}
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span className="store-navbar-badge">{activeFilterCount}</span>
              )}
            </button>

            {/* Filter Dropdown */}
            <div className={`store-navbar-dropdown ${filtersOpen ? 'open' : ''}`}>
              <div className="store-navbar-dropdown-group">
                  <label className="store-navbar-dropdown-label">Category</label>
                  <select
                    value={categoryId}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">All Categories</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="store-navbar-dropdown-group">
                  <label className="store-navbar-dropdown-label">Price Range (NPR)</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => onMinPriceChange(e.target.value)}
                      className="filter-input"
                      style={{ flex: 1 }}
                    />
                    <span style={{ alignSelf: 'center', color: 'var(--store-text-secondary)' }}>–</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => onMaxPriceChange(e.target.value)}
                      className="filter-input"
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>

                <div className="store-navbar-dropdown-group">
                  <label className="store-navbar-dropdown-label">Availability</label>
                  <select
                    value={availability}
                    onChange={(e) => onAvailabilityChange(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Products</option>
                    <option value="in_stock">In Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>

                {activeFilterCount > 0 && (
                  <button
                    className="store-navbar-clear-filters"
                    onClick={() => {
                      onCategoryChange('');
                      onMinPriceChange('');
                      onMaxPriceChange('');
                      onAvailabilityChange('all');
                    }}
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="store-navbar-sort"
          >
            <option value="newest">Newest First</option>
            <option value="name_asc">Name A → Z</option>
            <option value="name_desc">Name Z → A</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
