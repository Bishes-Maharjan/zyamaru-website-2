'use client';

import { useState, useRef, useEffect } from 'react';

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
  totalCount: number;
}

export default function StoreNavbar({
  categories,
  search,
  onSearchChange,
  categoryId,
  onCategoryChange,
  sortBy,
  onSortChange,
  totalCount,
}: StoreNavbarProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setMobileFiltersOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const resultText = totalCount === 1
    ? '1 product'
    : `${totalCount} products`;

  return (
    <div className="store-toolbar" ref={filtersRef}>
      {/* Search */}
      <div className="toolbar-search">
        <svg className="toolbar-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="toolbar-search-input"
        />
        {search && (
          <button className="toolbar-search-clear" onClick={() => onSearchChange('')} aria-label="Clear search">
            ✕
          </button>
        )}
      </div>

      {/* Desktop filters row */}
      <div className="toolbar-filters">
        {/* Category pills */}
        <div className="toolbar-categories">
          <button
            className={`category-pill ${categoryId === '' ? 'active' : ''}`}
            onClick={() => onCategoryChange('')}
          >
            All
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              className={`category-pill ${categoryId === String(c.id) ? 'active' : ''}`}
              onClick={() => onCategoryChange(categoryId === String(c.id) ? '' : String(c.id))}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Sort + count */}
        <div className="toolbar-right">
          <span className="toolbar-count">{resultText}</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="toolbar-sort"
          >
            <option value="newest">Newest First</option>
            <option value="name_asc">Name A → Z</option>
            <option value="name_desc">Name Z → A</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Mobile filter toggle */}
      <div className="toolbar-mobile-row">
        <button
          className={`toolbar-mobile-filter-btn ${mobileFiltersOpen ? 'active' : ''}`}
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filters
          {categoryId && <span className="toolbar-badge">1</span>}
        </button>
        <span className="toolbar-count">{resultText}</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="toolbar-sort"
        >
          <option value="newest">Newest</option>
          <option value="name_asc">A → Z</option>
          <option value="name_desc">Z → A</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
        </select>
      </div>

      {/* Mobile filter dropdown */}
      {mobileFiltersOpen && (
        <div className="toolbar-mobile-dropdown">
          <div className="toolbar-mobile-dropdown-label">Category</div>
          <div className="toolbar-categories">
            <button
              className={`category-pill ${categoryId === '' ? 'active' : ''}`}
              onClick={() => { onCategoryChange(''); setMobileFiltersOpen(false); }}
            >
              All
            </button>
            {categories.map(c => (
              <button
                key={c.id}
                className={`category-pill ${categoryId === String(c.id) ? 'active' : ''}`}
                onClick={() => { onCategoryChange(categoryId === String(c.id) ? '' : String(c.id)); setMobileFiltersOpen(false); }}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
