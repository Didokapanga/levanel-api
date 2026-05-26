import { Response }
from 'express';

import { AuthRequest }
from '../types/express';

import { CustomerPaymentService }
from '../services/customer-payment.service';

import { asyncHandler }
from '../utils/async-handler';

import { successResponse }
from '../utils/response';

const service =
  new CustomerPaymentService();

export class CustomerPaymentController {

  create = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const payment =
        await service.create(
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        payment,
        'Payment created successfully',
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

      const requestReference =
        (req.query.request_reference as string)
        || '';

      const payments =
        await service.findAll(
          page,
          limit,
          search,
          requestReference
        );

      return successResponse(
        res,
        payments,
        'Payments retrieved successfully'
      );
    }
  );

  update = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const payment =
        await service.update(
          req.params.id as string,
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        payment,
        'Payment updated successfully'
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
        'Payment deleted successfully'
      );
    }
  );
}