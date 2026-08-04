import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/erp-db';
import ImageGallery from '../../components/ImageGallery';
import ProductCard from '../../components/ProductCard';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return [{ id: '1' }];
}

// Dynamic SEO metadata per product
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const productId = parseInt(id);
  if (isNaN(productId)) return { title: 'Product Not Found' };

  const product = await prisma.products.findUnique({
    where: { id: productId },
    include: { categories: true, product_images: { take: 1 } }
  });

  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.productName}${product.modelName ? ` ${product.modelName}` : ''}`,
    description: `Buy ${product.productName}${product.modelName ? ` (${product.modelName})` : ''} — ${product.categories?.name || 'Equipment'} at ZYAMARU Store Nepal. Contact us on WhatsApp.`,
    openGraph: {
      title: product.productName,
      description: `${product.categories?.name || 'Equipment'} available at ZYAMARU Store Nepal.`,
      images: product.product_images[0]?.url ? [product.product_images[0].url] : [],
    },
  };
}

async function getProduct(id: number) {
  const product = await prisma.products.findUnique({
    where: { id },
    include: {
      product_images: true,
      categories: true,
      inventory: {
        orderBy: { dateAdded: 'desc' },
      }
    }
  });

  if (!product) return null;

  const availableInventory = product.inventory.filter((i: any) => i.quantityAvailable > 0);
  const totalQuantity = availableInventory.reduce((acc: number, curr: any) => acc + curr.quantityAvailable, 0);
  const price = availableInventory.length > 0
    ? Number(availableInventory[0].estimatedSellingPricePerPiece || 0)
    : 0;

  return {
    id: product.id,
    productName: product.productName,
    modelName: product.modelName,
    category: product.categories?.name || 'Uncategorized',
    price,
    images: product.product_images.map((img: any) => img.url),
    isAvailable: totalQuantity > 0,
    description: product.description,
    categoryId: product.categoryId
  };
}

async function ProductContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = parseInt(id);

  if (isNaN(productId)) {
    notFound();
  }

  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0
  }).format(product.price);

  const phoneNumber = '9866298141';
  const message = `Hello, I'm interested in purchasing the ${product.productName}${product.modelName ? ` (${product.modelName})` : ''} from the Zyamaru store.`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Fetch similar products
  let similarProductsRaw = await prisma.products.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      inventory: { some: { quantityAvailable: { gt: 0 } } }
    },
    take: 3,
    include: {
      product_images: true,
      categories: true,
      inventory: {
        where: { quantityAvailable: { gt: 0 } },
        orderBy: { dateAdded: 'desc' },
        take: 1
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  if (similarProductsRaw.length === 0) {
    similarProductsRaw = await prisma.products.findMany({
      where: {
        id: { not: product.id },
        inventory: { some: { quantityAvailable: { gt: 0 } } }
      },
      take: 3,
      include: {
        product_images: true,
        categories: true,
        inventory: {
          where: { quantityAvailable: { gt: 0 } },
          orderBy: { dateAdded: 'desc' },
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  const similarProducts = similarProductsRaw.map((p: any) => ({
    id: p.id,
    productName: p.productName,
    modelName: p.modelName,
    category: p.categories?.name || 'Uncategorized',
    price: Number(p.inventory[0]?.estimatedSellingPricePerPiece || 0),
    image: p.product_images.length > 0 ? p.product_images[0].url : null,
  }));

  return (
    <>
    <div className="product-detail-layout">
      {/* Image Gallery with main banner + thumbnails */}
      <ImageGallery images={product.images} productName={product.productName} />

      {/* Product Info */}
      <div className="product-detail-info">
        <span className="product-detail-category">{product.category}</span>
        <h1 className="product-detail-title">{product.productName}</h1>
        {product.modelName && (
          <p className="product-detail-model">{product.modelName}</p>
        )}

        <div className="product-detail-price">{formattedPrice}</div>

        <div className={`product-detail-availability ${!product.isAvailable ? 'out-of-stock' : ''}`}>
          {product.isAvailable ? (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              In Stock
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Out of Stock
            </>
          )}
        </div>

        {product.description && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: 'var(--store-text-primary)', marginBottom: '1rem', fontSize: '1.2rem' }}>
              Description
            </h3>
            <p style={{ color: 'var(--store-text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
              {product.description}
            </p>
          </div>
        )}

        <p style={{ color: 'var(--store-text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
          For purchases, availability confirmation, or any technical inquiries about this product,
          please contact our sales team directly via WhatsApp.
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="store-btn store-btn-whatsapp"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Chat on WhatsApp
        </a>
      </div>
    </div>
    
    {similarProducts.length > 0 && (
      <div className="similar-products-section" style={{ marginTop: '4rem', borderTop: '1px solid var(--store-border)', paddingTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--store-text-primary)' }}>
          You May Also Like
        </h2>
        <div className="product-grid">
          {similarProducts.map((p: any) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    )}
    </>
  );
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="store-theme">
      <main className="store-container" style={{ paddingTop: '40px' }}>
        <Link href="/store" className="product-back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Store
        </Link>

        <Suspense fallback={
          <div className="store-loading">
            <div className="store-loading-spinner" />
            <p>Loading product details...</p>
          </div>
        }>
          <ProductContent params={params} />
        </Suspense>
      </main>
    </div>
  );
}
