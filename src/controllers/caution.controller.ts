import { Response } from 'express';

import { CautionService }
from '../services/caution.service';

import { asyncHandler }
from '../utils/async-handler';

import { successResponse }
from '../utils/response';

import { AuthRequest }
from '../types/express';

const cautionService =
  new CautionService();

export class CautionController {

  create = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const caution =
        await cautionService.createCaution(
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        caution,
        'Caution created successfully',
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

      const contractType =
        (req.query.contract_type as string)
        || '';

      const cautions =
        await cautionService.getCautions(
          page,
          limit,
          search,
          contractType
        );

      return successResponse(
        res,
        cautions,
        'Cautions retrieved successfully'
      );
    }
  );

  update = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const caution =
        await cautionService.updateCaution(
          req.params.id as string,
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        caution,
        'Caution updated successfully'
      );
    }
  );

  delete = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      await cautionService.deleteCaution(
        req.params.id as string,
        req.user.id
      );

      return successResponse(
        res,
        null,
        'Caution deleted successfully'
      );
    }
  );
}