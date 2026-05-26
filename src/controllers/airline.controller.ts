import { Response } from 'express';

import { AirlineService }
from '../services/airline.service';

import { asyncHandler }
from '../utils/async-handler';

import { successResponse }
from '../utils/response';

import { AuthRequest }
from '../types/express';

const airlineService =
  new AirlineService();

export class AirlineController {

  create = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const airline =
        await airlineService.createAirline(
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        airline,
        'Airline created successfully',
        201
      );
    }
  );

  findAll = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const airlines =
        await airlineService.getAirlines();

      return successResponse(
        res,
        airlines,
        'Airlines retrieved successfully'
      );
    }
  );

  update = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const airline =
        await airlineService.updateAirline(
          req.params.id as string,
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        airline,
        'Airline updated successfully'
      );
    }
  );

  delete = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      await airlineService.deleteAirline(
        req.params.id as string,
        req.user.id
      );

      return successResponse(
        res,
        null,
        'Airline deleted successfully'
      );
    }
  );
}