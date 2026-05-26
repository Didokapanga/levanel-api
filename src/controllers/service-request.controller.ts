import { Response }
from 'express';

import { AuthRequest }
from '../types/express';

import { ServiceRequestService }
from '../services/service-request.service';

import { asyncHandler }
from '../utils/async-handler';

import { successResponse }
from '../utils/response';

const service =
  new ServiceRequestService();

export class ServiceRequestController {

  create = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const request =
        await service.create(
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        request,
        'Request created successfully',
        201
      );
    }
  );

  findAll = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const page =
        Number(req.query.page) || 1;

      const limit =
        Number(req.query.limit) || 10;

      const search =
        (req.query.search as string)
        || '';

      const status =
        (req.query.status as string)
        || '';

      const serviceId =
        (req.query.service_id as string)
        || '';

      const requests =
        await service.findAll(
          page,
          limit,
          search,
          status,
          serviceId
        );

      return successResponse(
        res,
        requests,
        'Requests retrieved successfully'
      );
    }
  );

  update = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const request =
        await service.update(
          req.params.id as string,
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        request,
        'Request updated successfully'
      );
    }
  );

  delete = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      await service.delete(
        req.params.id as string,
        req.user.id
      );

      return successResponse(
        res,
        null,
        'Request deleted successfully'
      );
    }
  );
}