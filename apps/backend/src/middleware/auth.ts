import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/auth.js';

export function requireAuth(req: Request & { user?: any }, res: Response, next: NextFunction) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export function requireAdmin(req: Request & { user?: any }, res: Response, next: NextFunction) {
  requireAuth(req, res, () => {
    if (req.user?.role !== 'Admin') return res.status(403).json({ error: 'Forbidden' });
    next();
  });
}
