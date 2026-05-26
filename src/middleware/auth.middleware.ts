import { Response, NextFunction } from 'express';

import { verifyToken } from '../utils/jwt';
import { AuthRequest } from '../types/express';

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Token missing',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
    return res.status(401).json({
        success: false,
        message: 'Invalid token format',
    });
    }

    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};