import express from 'express';
import controller from '../controllers/Category';
import { ValidateId, ValidateJoi, Schemas } from '../middleware/Joi';
import VerifyToken, { RequireAdmin } from '../middleware/VerifyToken';

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Subcategory:
 *       type: object
 *       required: [name, slug]
 *       properties:
 *         name:
 *           type: string
 *           example: "Cine"
 *         slug:
 *           type: string
 *           example: "CINEMA"
 *     Category:
 *       type: object
 *       required: [name, slug]
 *       properties:
 *         _id:
 *           type: string
 *           readOnly: true
 *           example: "654321098765432109876511"
 *         name:
 *           type: string
 *           example: "Cultura"
 *         slug:
 *           type: string
 *           example: "CULTURE"
 *         subcategories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Subcategory'
 *         deleted:
 *           type: boolean
 *           readOnly: true
 *           default: false
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           readOnly: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 */

/**
 * @openapi
 * /categories:
 *   post:
 *     tags: [Categories]
 *     summary: Crea una nueva categoría con subcategorías (ADMIN)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Categoría creada correctamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Se requiere rol ADMIN
 *       409:
 *         description: El slug de la categoría ya existe
 *       422:
 *         description: Error de validación de Joi
 */
router.post('/', VerifyToken, RequireAdmin, ValidateJoi(Schemas.category.create), controller.createCategory);

/**
 * @openapi
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: Lista categorías paginadas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 50 }
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, default: name }
 *       - in: query
 *         name: sortOrder
 *         schema: { type: string, enum: [asc, desc], default: asc }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: showDeleted
 *         schema: { type: boolean, default: false }
 *     responses:
 *       200:
 *         description: Listado devuelto con éxito
 *       401:
 *         description: No autorizado
 */
router.get('/', VerifyToken, controller.readAllPaginated);

/**
 * @openapi
 * /categories/{categoryId}:
 *   get:
 *     tags: [Categories]
 *     summary: Obtiene el detalle de una categoría por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Detalle de la categoría
 *       404:
 *         description: Categoría no encontrada
 */
router.get('/:categoryId', VerifyToken, ValidateId('categoryId'), controller.readCategory);

/**
 * @openapi
 * /categories/{categoryId}/subcategories:
 *   post:
 *     tags: [Categories]
 *     summary: Añade una nueva subcategoría a una categoría existente (ADMIN)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subcategory'
 *           example:
 *             name: "Pádel"
 *             slug: "PADEL"
 *     responses:
 *       200:
 *         description: Subcategoría añadida correctamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Se requiere rol ADMIN
 *       404:
 *         description: Categoría no encontrada
 *       409:
 *         description: El slug de la subcategoría ya existe en esta categoría
 *       422:
 *         description: Error de validación de Joi
 */
router.post('/:categoryId/subcategories', VerifyToken, RequireAdmin, ValidateId('categoryId'), ValidateJoi(Schemas.category.addSubcategory), controller.addSubcategory);

/**
 * @openapi
 * /categories/{categoryId}:
 *   put:
 *     tags: [Categories]
 *     summary: Actualiza una categoría y sus subcategorías (ADMIN)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente
 *       404:
 *         description: Categoría no encontrada
 */
router.put('/:categoryId', VerifyToken, RequireAdmin, ValidateId('categoryId'), ValidateJoi(Schemas.category.update), controller.updateCategory);

/**
 * @openapi
 * /categories/{categoryId}/soft-delete:
 *   patch:
 *     tags: [Categories]
 *     summary: Borrado lógico de una categoría (ADMIN)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Categoría archivada
 *       404:
 *         description: Categoría no encontrada
 */
router.patch('/:categoryId/soft-delete', VerifyToken, RequireAdmin, ValidateId('categoryId'), controller.softDeleteCategory);

/**
 * @openapi
 * /categories/{categoryId}/restore:
 *   patch:
 *     tags: [Categories]
 *     summary: Restaura una categoría archivada (ADMIN)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Categoría restaurada con éxito
 *       404:
 *         description: Categoría no encontrada
 */
router.patch('/:categoryId/restore', VerifyToken, RequireAdmin, ValidateId('categoryId'), controller.restoreCategory);

/**
 * @openapi
 * /categories/{categoryId}:
 *   delete:
 *     tags: [Categories]
 *     summary: Borrado físico definitivo de una categoría (ADMIN)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Categoría eliminada
 *       404:
 *         description: Categoría no encontrada
 */
router.delete('/:categoryId', VerifyToken, RequireAdmin, ValidateId('categoryId'), controller.hardDeleteCategory);

export default router;
