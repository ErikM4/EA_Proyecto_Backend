import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import type { AccessTokenPayload, AuthUser } from '../models/User';

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}

export const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Falta el token' });
    }

    const token = header.slice('Bearer '.length);

    try {
        const payload = jwt.verify(token, config.jwt.secret) as AccessTokenPayload;
        req.user = { id: payload.sub, role: payload.role };
        next();
    } catch (error) {
        next(error);
    }
};

export const RequireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Se requiere el rol ADMIN' });
    }

    next();
};

export default VerifyToken;
