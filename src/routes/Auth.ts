import express from 'express';
import controller from '../controllers/Auth';
import { Schemas, ValidateJoi } from '../middleware/Joi';
import VerifyToken from '../middleware/VerifyToken';

const router = express.Router();

router.post('/register', ValidateJoi(Schemas.auth.register), controller.register);
router.post('/login', ValidateJoi(Schemas.auth.login), controller.login);
router.post('/backoffice/login', ValidateJoi(Schemas.auth.login), controller.backofficeLogin);
router.post('/refresh', controller.refresh);
router.post('/logout', controller.logout);

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registra un usuario nuevo
 *     description: El usuario se crea siempre con el rol USER. No devuelve token, hay que hacer login después.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/RegisterInput' }
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema: { type: object, properties: { user: { $ref: '#/components/schemas/User' } } }
 *       409: { $ref: '#/components/responses/Conflict' }
 *       422: { $ref: '#/components/responses/Unprocessable' }
 *
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Inicia sesión
 *     description: Devuelve el access token (para la cabecera Authorization), el refresh token y el usuario.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LoginInput' }
 *     responses:
 *       200: { $ref: '#/components/responses/LoginOk' }
 *       401: { $ref: '#/components/responses/BadCredentials' }
 *       422: { $ref: '#/components/responses/Unprocessable' }
 *
 * /auth/backoffice/login:
 *   post:
 *     tags: [Auth]
 *     summary: Inicia sesión exclusivo para administradores del Backoffice
 *     description: Valida las credenciales y comprueba que el usuario tenga el rol ADMIN antes de emitir tokens.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LoginInput' }
 *     responses:
 *       200: { $ref: '#/components/responses/LoginOk' }
 *       401: { $ref: '#/components/responses/BadCredentials' }
 *       403:
 *         description: Acceso denegado por falta de rol ADMIN
 *         content:
 *           application/json:
 *             example: { message: 'Acceso denegado. Se requieren permisos de administrador.' }
 *       422: { $ref: '#/components/responses/Unprocessable' }
 *
 * /auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Pide un access token nuevo
 *     description: Se usa cuando el access token ha caducado o al recargar la página. El navegador envía la cookie refreshToken automáticamente.
 *     security: []
 *     responses:
 *       200:
 *         description: Access token nuevo
 *         content:
 *           application/json:
 *             example: { token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Cierra la sesión
 *     description: Borra la cookie refreshToken e invalida ese refresh token en el servidor.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Sesión cerrada
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */

export default router;
