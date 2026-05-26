import { Response }
from 'express';

import { AuthRequest }
from '../types/express';

import { TicketAdjustmentService }
from '../services/ticket-adjustment.service';

import { asyncHandler }
from '../utils/async-handler';

import { successResponse }
from '../utils/response';

const service =
  new TicketAdjustmentService();

export class TicketAdjustmentController {

  create = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const adjustment =
        await service.create(
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        adjustment,
        'Ticket adjustment created successfully',
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

      const adjustmentType =
        ( req.query.adjustment_type as string) || '';

      const search =
        (req.query.search as string) || '';

      const adjustments =
        await service.findAll(
          page,
          limit,
          adjustmentType,
          search
        );

      return successResponse(
        res,
        adjustments,
        'Adjustments retrieved successfully'
      );
    }
  );

  update = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const adjustment =
        await service.update(
          req.params.id as string,
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        adjustment,
        'Adjustment updated successfully'
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
        'Adjustment deleted successfully'
      );
    }
  );
}