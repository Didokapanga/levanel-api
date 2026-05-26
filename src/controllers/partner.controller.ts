import { Response } from 'express';

import { PartnerService }
from '../services/partner.service';

import { asyncHandler }
from '../utils/async-handler';

import { successResponse }
from '../utils/response';

import { AuthRequest }
from '../types/express';

const partnerService =
  new PartnerService();

export class PartnerController {

  create = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const partner =
        await partnerService.createPartner(
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        partner,
        'Partner created successfully',
        201
      );
    }
  );

  findAll = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const partners =
        await partnerService.getPartners();

      return successResponse(
        res,
        partners,
        'Partners retrieved successfully'
      );
    }
  );

  update = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const partner =
        await partnerService.updatePartner(
          req.params.id as string,
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        partner,
        'Partner updated successfully'
      );
    }
  );

  delete = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      await partnerService.deletePartner(
        req.params.id as string,
        req.user.id
      );

      return successResponse(
        res,
        null,
        'Partner deleted successfully'
      );
    }
  );
}