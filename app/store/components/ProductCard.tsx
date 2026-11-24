import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  productName: string;
  modelName?: string | null;
  category: string;
  price: number;
  image: string | null;
  availableQuantity?: number;
  priority?: boolean;
}

export default function ProductCard({
  id,
  productName,
  modelName,
  category,
  price,
  image,
  availableQuantity,
  priority = false,
}: ProductCardProps) {
  const isOutOfStock = availableQuantity !== undefined && availableQuantity <= 0;

  // Format price — show "Contact for price" when price is 0 or missing
  const formattedPrice = price > 0
    ? new Intl.NumberFormat('en-NP', {
        style: 'currency',
        currency: 'NPR',
        maximumFractionDigits: 0,
      }).format(price)
    : null;

  return (
    <Link href={`/store/product/${id}`} className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <div className="product-card-image-wrapper">
        {image ? (
          <Image
            src={image}
            alt={productName}
            fill
            priority={priority}
            className="product-card-image"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="product-card-no-image">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>No image</span>
          </div>
        )}
        {isOutOfStock && (
          <div className="product-card-badge out-of-stock-badge">Out of Stock</div>
        )}
      </div>

      <div className="product-card-content">
        <span className="product-card-category">{category}</span>
        <h3 className="product-card-title">{productName}</h3>
        {modelName && (
          <p className="product-card-model">{modelName}</p>
        )}

        <div className="product-card-footer">
          {formattedPrice ? (
            <div>
              <span className="product-card-price">{formattedPrice}</span>
            </div>
          ) : (
            <span className="product-card-contact-price">Contact for price</span>
          )}
        </div>
      </div>
    </Link>
  );
}
