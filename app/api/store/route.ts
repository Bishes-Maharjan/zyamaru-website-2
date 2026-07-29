import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/erp-db';


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search') || '';
    const categoryId = searchParams.get('categoryId');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const availability = searchParams.get('availability') || 'all'; // 'all' | 'in_stock' | 'out_of_stock'
    const sortBy = searchParams.get('sortBy') || 'newest'; // 'newest' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc'

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    // Availability filter
    if (availability === 'in_stock') {
      where.inventory = { some: { quantityAvailable: { gt: 0 } } };
    } else if (availability === 'out_of_stock') {
      where.NOT = { inventory: { some: { quantityAvailable: { gt: 0 } } } };
    }
    // 'all' → no inventory filter

    if (search) {
      where.OR = [
        { productName: { contains: search, mode: 'insensitive' } },
        { modelName: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (categoryId) {
      where.categoryId = parseInt(categoryId);
    }

    // Determine sort order
    let orderBy: any = { createdAt: 'desc' };
    if (sortBy === 'price_asc' || sortBy === 'price_desc') {
      orderBy = { productName: sortBy === 'price_asc' ? 'asc' : 'desc' }; // We'll sort by price after fetch
    } else if (sortBy === 'name_asc') {
      orderBy = { productName: 'asc' };
    } else if (sortBy === 'name_desc') {
      orderBy = { productName: 'desc' };
    }

    const totalCount = await prisma.products.count({ where });
    const totalPages = Math.ceil(totalCount / limit);

    const products = await prisma.products.findMany({
      where,
      skip,
      take: limit,
      include: {
        product_images: true,
        categories: true,
        inventory: {
          orderBy: { dateAdded: 'desc' },
          take: 1
        }
      },
      orderBy
    });

    // Transform and apply price-based filters and sorting
    let formattedProducts = products.map((product: any) => {
      const latestInv = product.inventory[0];
      const price = Number(latestInv?.estimatedSellingPricePerPiece || 0);
      const availableQty = latestInv?.quantityAvailable || 0;

      return {
        id: product.id,
        productName: product.productName,
        modelName: product.modelName,
        category: product.categories?.name || 'Uncategorized',
        categoryId: product.categoryId,
        price,
        image: product.product_images.length > 0 ? product.product_images[0].url : null,
        availableQuantity: availableQty,
        description: product.description
      };
    });

    // Apply price range filter (post-query since price lives in inventory)
    if (minPrice) {
      formattedProducts = formattedProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      formattedProducts = formattedProducts.filter(p => p.price <= parseFloat(maxPrice));
    }

    // Apply price sort (post-query since price lives in inventory)
    if (sortBy === 'price_asc') {
      formattedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      formattedProducts.sort((a, b) => b.price - a.price);
    }

    // Also fetch distinct categories for filter dropdown
    const categories = await prisma.categories.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' }
    });

    return NextResponse.json({
      products: formattedProducts,
      categories,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    });
  } catch (error) {
    console.error('Error fetching store products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
