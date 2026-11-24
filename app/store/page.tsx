import { Suspense } from 'react';
import { prisma } from '@/lib/erp-db';
import StoreCatalog from './components/StoreCatalog';

async function getInitialProducts() {
  const limit = 12;

  const totalCount = await prisma.products.count();
  const totalPages = Math.ceil(totalCount / limit);

  const products = await prisma.products.findMany({
    take: limit,
    include: {
      product_images: true,
      categories: true,
      inventory: {
        orderBy: { dateAdded: 'desc' },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedProducts = products.map((product: any) => {
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
      categoryId: product.categoryId,
      price,
      image: product.product_images.length > 0 ? product.product_images[0].url : null,
      availableQuantity: totalQuantity,
      description: product.description || null,
    };
  });

  // Also fetch categories
  const categories = await prisma.categories.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  });

  return {
    products: formattedProducts,
    categories,
    pagination: {
      page: 1,
      limit,
      totalCount,
      totalPages,
    },
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
      <main className="store-container">
        <header className="store-header">
          <h1>ZYAMARU Store</h1>
          <p>
            Premium cinematography equipment and accessories curated for filmmakers in Nepal.
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
