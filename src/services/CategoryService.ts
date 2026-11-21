import Category, { ICategory } from '../models/Category';
import Subcategory, { ISubcategory } from '../models/Category';

export interface CategoryQueryParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    search?: string;
    showDeleted?: boolean;
    userRole?: string;
}

export const createCategory = (data: ICategory) => {
    const category = new Category(data);
    return category.save();
};

export const addSubcategory = async (categoryId: string, subcategory: ISubcategory) => {
    const category = await Category.findOne({ _id: categoryId, deleted: false });
    if (!category) return null;

    const normalizedSlug = subcategory.slug.toUpperCase().trim();
    const alreadyExists = category.subcategories.some((sub) => sub.slug === normalizedSlug);
    if (alreadyExists) {
        const error = new Error(`La subcategoría con slug ${normalizedSlug} ya existe en esta categoría`) as Error & { status?: number };
        error.status = 409;
        throw error;
    }

    category.subcategories.push({
        name: subcategory.name.trim(),
        slug: normalizedSlug
    });

    return category.save();
};

export const getCategoryById = (categoryId: string, userRole?: string) => {
    const filter: Record<string, unknown> = { _id: categoryId };

    if (userRole !== 'ADMIN') {
        filter.deleted = false;
        filter.deletedAt = null;
    }

    return Category.findOne(filter);
};

export const getAllCategoriesPaginated = async (params: CategoryQueryParams) => {
    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.max(1, Number(params.limit) || 50);
    const skip = (page - 1) * limit;

    const sortBy = params.sortBy || 'name';
    const sortOrder = params.sortOrder === 'desc' ? -1 : 1;

    const filter: Record<string, unknown> = {};

    if (params.userRole !== 'ADMIN' || params.showDeleted !== true) {
        filter.deleted = false;
        filter.deletedAt = null;
    }

    if (params.search) {
        filter.$or = [
            { name: { $regex: params.search, $options: 'i' } },
            { slug: { $regex: params.search, $options: 'i' } },
            { 'subcategories.name': { $regex: params.search, $options: 'i' } },
            { 'subcategories.slug': { $regex: params.search, $options: 'i' } }
        ];
    }

    const [categories, totalCount] = await Promise.all([
        Category.find(filter)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit),
        Category.countDocuments(filter)
    ]);

    return {
        data: categories,
        totalDocs: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page
    };
};

export const isValidCategoryPair = async (categorySlug: string, subcategorySlug: string): Promise<boolean> => {
    const exists = await Category.exists({
        slug: categorySlug.toUpperCase().trim(),
        'subcategories.slug': subcategorySlug.toUpperCase().trim(),
        deleted: false,
        deletedAt: null
    });

    return Boolean(exists);
};

export const updateCategory = (categoryId: string, data: Partial<ICategory>) => {
    return Category.findOne({ _id: categoryId, deleted: false }).then(async (category) => {
        if (!category) return null;
        Object.assign(category, data);
        return category.save();
    });
};

export const softDeleteCategory = (categoryId: string) => {
    return Category.findByIdAndUpdate(categoryId, { deleted: true, deletedAt: new Date() }, { new: true });
};

export const restoreCategory = (categoryId: string) => {
    return Category.findByIdAndUpdate(categoryId, { deleted: false, deletedAt: null }, { new: true });
};

export const hardDeleteCategory = (categoryId: string) => {
    return Category.findByIdAndDelete(categoryId);
};

export default {
    createCategory,
    addSubcategory,
    getCategoryById,
    getAllCategoriesPaginated,
    isValidCategoryPair,
    updateCategory,
    softDeleteCategory,
    restoreCategory,
    hardDeleteCategory
};
