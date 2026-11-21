import mongoose, { Document, Schema } from 'mongoose';

export interface ISubcategory {
    name: string;
    slug: string;
}

export interface ICategory {
    name: string;
    slug: string;
    subcategories: ISubcategory[];
    deleted: boolean;
    deletedAt?: Date | null;
}

export interface ICategoryModel extends ICategory, Document {}

const SubcategorySchema = new Schema<ISubcategory>(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, uppercase: true, trim: true }
    },
    { _id: false }
);

const CategorySchema: Schema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, uppercase: true, trim: true },
        subcategories: { type: [SubcategorySchema], default: [] },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

CategorySchema.index({ slug: 1 }, { unique: true, partialFilterExpression: { deleted: false } });

export default mongoose.model<ICategoryModel>('Category', CategorySchema);
