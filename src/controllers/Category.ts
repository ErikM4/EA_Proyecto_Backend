import { NextFunction, Request, Response } from 'express';
import CategoryService from '../services/CategoryService';
import { ICategory, ISubcategory } from '../models/Category';

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await CategoryService.createCategory(req.body);
        res.status(201).json({ category });
    } catch (error) {
        next(error);
    }
};

const addSubcategory = async (req: Request<{ categoryId: string }>, res: Response, next: NextFunction) => {
    try {
        const category = await CategoryService.addSubcategory(req.params.categoryId, req.body);
        if (category) {
            res.status(200).json({ category });
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        next(error);
    }
};

const readCategory = async (req: Request<{ categoryId: string }>, res: Response, next: NextFunction) => {
    try {
        const category = await CategoryService.getCategoryById(req.params.categoryId, req.user?.role);
        if (category) {
            res.status(200).json({ category });
        } else {
            res.status(404).json({ message: 'not found' });
        }
    } catch (error) {
        next(error);
    }
};

const readAllPaginated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await CategoryService.getAllCategoriesPaginated({
            page: Number(req.query.page),
            limit: Number(req.query.limit),
            sortBy: req.query.sortBy as string,
            sortOrder: req.query.sortOrder as 'asc' | 'desc',
            search: req.query.search as string,
            showDeleted: req.query.showDeleted === 'true',
            userRole: req.user?.role
        });

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const updateCategory = async (req: Request<{ categoryId: string }>, res: Response, next: NextFunction) => {
    try {
        const category = await CategoryService.updateCategory(req.params.categoryId, req.body);
        if (category) {
            res.status(200).json({ category });
        } else {
            res.status(404).json({ message: 'not found' });
        }
    } catch (error) {
        next(error);
    }
};

const softDeleteCategory = async (req: Request<{ categoryId: string }>, res: Response, next: NextFunction) => {
    try {
        const category = await CategoryService.softDeleteCategory(req.params.categoryId);
        if (category) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'not found' });
        }
    } catch (error) {
        next(error);
    }
};

const restoreCategory = async (req: Request<{ categoryId: string }>, res: Response, next: NextFunction) => {
    try {
        const category = await CategoryService.restoreCategory(req.params.categoryId);
        if (category) {
            res.status(200).json({ category });
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        next(error);
    }
};

const hardDeleteCategory = async (req: Request<{ categoryId: string }>, res: Response, next: NextFunction) => {
    try {
        const category = await CategoryService.hardDeleteCategory(req.params.categoryId);
        if (category) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'not found' });
        }
    } catch (error) {
        next(error);
    }
};

export default {
    createCategory,
    addSubcategory,
    readCategory,
    readAllPaginated,
    updateCategory,
    softDeleteCategory,
    restoreCategory,
    hardDeleteCategory
};
