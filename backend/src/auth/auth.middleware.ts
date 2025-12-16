// auth/auth.middleware.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });

  const token = auth.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;

    req.user = {
      userId: payload.sub,
      roles: payload.roles
    };

    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
