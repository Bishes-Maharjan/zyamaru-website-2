import { Suspense } from 'react';
import { prisma } from '@/lib/erp-db';
import StoreCatalog from './components/StoreCatalog';

async function getInitialProducts() {
  const limit = 12;

  const where: any = {
    inventory: {
      some: {
        quantityAvailable: { gt: 0 }
      }
    }
  };

  const totalCount = await prisma.products.count({ where });
  const totalPages = Math.ceil(totalCount / limit);

  const products = await prisma.products.findMany({
    where,
    take: limit,
    include: {
      product_images: true,
      categories: true,
      inventory: {
        where: { quantityAvailable: { gt: 0 } },
        orderBy: { dateAdded: 'desc' },
        take: 1
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedProducts = products.map((product: any) => ({
    id: product.id,
    productName: product.productName,
    modelName: product.modelName,
    category: product.categories?.name || 'Uncategorized',
    categoryId: product.categoryId,
    price: Number(product.inventory[0]?.estimatedSellingPricePerPiece || 0),
    image: product.product_images.length > 0 ? product.product_images[0].url : null,
    availableQuantity: product.inventory[0]?.quantityAvailable || 0,
    description: product.description || null,
  }));

  // Also fetch categories
  const categories = await prisma.categories.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  });

  return {
    products: formattedProducts,
    categories,
    pagination: {
      page: 1,
      limit,
      totalCount,
      totalPages
    }
  };
}

async function StoreContent() {
  const initialData = await getInitialProducts();
  return (
    <StoreCatalog
      initialProducts={initialData.products}
      initialPagination={initialData.pagination}
      initialCategories={initialData.categories}
    />
  );
}

export default function StorePage() {
  return (
    <div className="store-theme">
      <main className="store-container" style={{ paddingTop: '0' }}>
        <header className="store-header">
          <h1>ZYAMARU Store</h1>
          <p>
            Premium cinematography equipment and accessories curated for filmmakers in Nepal.
            Contact us on WhatsApp for purchases and inquiries.
          </p>
        </header>

        <Suspense fallback={
          <div className="store-loading">
            <div className="store-loading-spinner" />
            <p>Loading products...</p>
          </div>
        }>
          <StoreContent />
        </Suspense>
      </main>
    </div>
  );
}
