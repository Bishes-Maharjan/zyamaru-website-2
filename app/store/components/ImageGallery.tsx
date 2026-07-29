'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="gallery-wrapper">
        <div className="gallery-main-image">
          <div style={{ color: 'var(--store-text-secondary)', fontSize: '1rem' }}>
            No image available
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-wrapper">
      {/* Main Image Banner */}
      <div className="gallery-main-image">
        <Image
          src={images[activeIndex]}
          alt={`${productName} - Image ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'contain', padding: '1.5rem' }}
        />

        {/* Navigation arrows if multiple images */}
        {images.length > 1 && (
          <>
            <button
              className="gallery-nav gallery-nav-prev"
              onClick={() => setActiveIndex(i => i === 0 ? images.length - 1 : i - 1)}
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className="gallery-nav gallery-nav-next"
              onClick={() => setActiveIndex(i => i === images.length - 1 ? 0 : i + 1)}
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="gallery-counter">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="gallery-thumbnails">
          {images.map((img, idx) => (
            <button
              key={idx}
              className={`gallery-thumb ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`View image ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                style={{ objectFit: 'contain', padding: '0.25rem' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
