import Image from 'next/image';
import Link from 'next/link';
import '../store.css';

interface ProductCardProps {
  id: number;
  productName: string;
  modelName?: string;
  category: string;
  price: number;
  image: string | null;
  priority?: boolean;
}

export default function ProductCard({
  id,
  productName,
  modelName,
  category,
  price,
  image,
  priority = false
}: ProductCardProps) {
  // Format price as NPR
  const formattedPrice = new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0
  }).format(price);

  return (
    <Link href={`/store/product/${id}`} className="product-card">
      <div className="product-card-image-wrapper">
        {image ? (
          <Image
            src={image}
            alt={productName}
            fill
            priority={priority}
            className="product-card-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div style={{ color: 'var(--store-text-secondary)', fontSize: '0.8rem' }}>
            No image available
          </div>
        )}
      </div>

      <div className="product-card-content">
        <span className="product-card-category">{category}</span>
        <h3 className="product-card-title">{productName}</h3>
        {modelName && (
          <p className="product-card-model">{modelName}</p>
        )}
        
        <div className="product-card-footer">
          <div>
            <span className="product-card-price-label">Price</span>
            <span className="product-card-price">{formattedPrice}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
