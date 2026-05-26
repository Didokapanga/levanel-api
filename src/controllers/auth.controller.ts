import { Request, Response } from 'express';

import { AuthService } from '../services/auth.service';

import { asyncHandler } from '../utils/async-handler';
import { successResponse } from '../utils/response';
import { AuthRequest } from '../types/express';

const authService = new AuthService();

export class AuthController {
  login = asyncHandler(
    async (req: Request, res: Response) => {
      const { email, password } = req.body;

      const result = await authService.login(
        email,
        password
      );

      return successResponse(
        res,
        result,
        'Login successful'
      );
    }
  );

  me = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const user = await authService.currentUser(
        req.user.id
      );

      return successResponse(
        res,
        user,
        'Current user retrieved successfully'
      );
    }
  );
}