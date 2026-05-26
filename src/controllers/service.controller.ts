import { Response } from 'express';

import { ServiceService }
from '../services/service.service';

import { asyncHandler }
from '../utils/async-handler';

import { successResponse }
from '../utils/response';

import { AuthRequest }
from '../types/express';

const serviceService =
  new ServiceService();

export class ServiceController {

  create = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const service =
        await serviceService.createService(
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        service,
        'Service created successfully',
        201
      );
    }
  );

  findAll = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const services =
        await serviceService.getServices();

      return successResponse(
        res,
        services,
        'Services retrieved successfully'
      );
    }
  );

  update = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const service =
        await serviceService.updateService(
          req.params.id as string,
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        service,
        'Service updated successfully'
      );
    }
  );

  delete = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      await serviceService.deleteService(
        req.params.id as string,
        req.user.id
      );

      return successResponse(
        res,
        null,
        'Service deleted successfully'
      );
    }
  );
}