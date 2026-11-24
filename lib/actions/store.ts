'use server';

import { prisma } from '@/lib/erp-db';

export type StoreQueryParams = {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
    sortBy?: string; // 'newest' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc'
};

export type StoreProduct = {
    id: number;
    productName: string;
    modelName: string | null;
    category: string;
    categoryId: number | null;
    price: number;
    image: string | null;
    availableQuantity: number;
    description: string | null;
};

export type StoreCategory = {
    id: number;
    name: string;
};

export type StorePagination = {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
};

export type StoreResult = {
    products: StoreProduct[];
    categories: StoreCategory[];
    pagination: StorePagination;
    error?: string;
};

export async function fetchStoreProducts(params: StoreQueryParams = {}): Promise<StoreResult> {
    try {
        const page = params.page ?? 1;
        const limit = params.limit ?? 12;
        const search = params.search ?? '';
        const categoryId = params.categoryId;
        const sortBy = params.sortBy ?? 'newest';

        const skip = (page - 1) * limit;

        // Build where clause
        const where: any = {};

        if (search) {
            where.OR = [
                { productName: { contains: search, mode: 'insensitive' } },
                { modelName: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (categoryId) {
            where.categoryId = parseInt(categoryId);
        }

        // Determine sort order
        let orderBy: any = { createdAt: 'desc' };
        if (sortBy === 'name_asc') {
            orderBy = { productName: 'asc' };
        } else if (sortBy === 'name_desc') {
            orderBy = { productName: 'desc' };
        }
        // price sorts are done post-query since price lives in inventory

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
                },
            },
            orderBy,
        });

        // Transform products
        let formattedProducts: StoreProduct[] = products.map((product: any) => {
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
                description: product.description,
            };
        });

        // Apply price sort (post-query since price lives in inventory)
        if (sortBy === 'price_asc') {
            formattedProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price_desc') {
            formattedProducts.sort((a, b) => b.price - a.price);
        }

        // Also fetch distinct categories for filter
        const categories = await prisma.categories.findMany({
            select: { id: true, name: true },
            orderBy: { name: 'asc' },
        });

        return {
            products: formattedProducts,
            categories: categories as StoreCategory[],
            pagination: {
                page,
                limit,
                totalCount,
                totalPages,
            },
        };
    } catch (error) {
        console.error('Error fetching store products:', error);
        return {
            products: [],
            categories: [],
            pagination: { page: 1, limit: 12, totalCount: 0, totalPages: 0 },
            error: 'Failed to fetch products',
        };
    }
}
