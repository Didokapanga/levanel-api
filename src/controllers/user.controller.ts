import { Response } from 'express';

import { UserService } from '../services/user.service';

import { asyncHandler } from '../utils/async-handler';
import { successResponse } from '../utils/response';

import { AuthRequest } from '../types/express';

const userService = new UserService();

export class UserController {

  create = asyncHandler(
    async (req: AuthRequest, res: Response) => {

      const user = await userService.createUser(
        req.body,
        req.user.id
      );

      return successResponse(
        res,
        user,
        'User created successfully',
        201
      );
    }
  );

  update = asyncHandler(
    async (req: AuthRequest, res: Response) => {

      const user = await userService.updateUser(
        req.params.id as string,
        req.body,
        req.user.id
      );

      return successResponse(
        res,
        user,
        'User updated successfully'
      );
    }
  );

  findAll = asyncHandler(
    async (req: AuthRequest, res: Response) => {

      const users = await userService.getUsers();

      return successResponse(
        res,
        users,
        'Users retrieved successfully'
      );
    }
  );

  delete = asyncHandler(
    async (req: AuthRequest, res: Response) => {

      await userService.deleteUser(
        req.params.id as string,
        req.user.id
      );

      return successResponse(
        res,
        null,
        'User deleted successfully'
      );
    }
  );

}