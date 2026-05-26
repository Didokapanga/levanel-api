import { Response } from 'express';

import { SystemService }
from '../services/system.service';

import { asyncHandler }
from '../utils/async-handler';

import { successResponse }
from '../utils/response';

import { AuthRequest }
from '../types/express';

const systemService =
  new SystemService();

export class SystemController {

  create = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const system =
        await systemService.createSystem(
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        system,
        'System created successfully',
        201
      );
    }
  );

  findAll = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const systems =
        await systemService.getSystems();

      return successResponse(
        res,
        systems,
        'Systems retrieved successfully'
      );
    }
  );

  update = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const system =
        await systemService.updateSystem(
          req.params.id as string,
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        system,
        'System updated successfully'
      );
    }
  );

  delete = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      await systemService.deleteSystem(
        req.params.id as string,
        req.user.id
      );

      return successResponse(
        res,
        null,
        'System deleted successfully'
      );
    }
  );
}