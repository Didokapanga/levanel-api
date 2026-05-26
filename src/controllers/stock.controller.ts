import { Response } from 'express';

import { StockService }
from '../services/stock.service';

import { asyncHandler }
from '../utils/async-handler';

import { successResponse }
from '../utils/response';

import { AuthRequest }
from '../types/express';

const stockService =
  new StockService();

export class StockController {

  create = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const stock =
        await stockService.createStock(
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        stock,
        'Stock created successfully',
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

      const stocks =
        await stockService.getStocks(
          page,
          limit,
          search,
          contractType
        );

      return successResponse(
        res,
        stocks,
        'Stocks retrieved successfully'
      );
    }
  );

  update = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const stock =
        await stockService.updateStock(
          req.params.id as string,
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        stock,
        'Stock updated successfully'
      );
    }
  );

  delete = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      await stockService.deleteStock(
        req.params.id as string,
        req.user.id
      );

      return successResponse(
        res,
        null,
        'Stock deleted successfully'
      );
    }
  );
}