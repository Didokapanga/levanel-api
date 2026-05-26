import { Response } from 'express';

import { ContractService }
from '../services/contract.service';

import { asyncHandler }
from '../utils/async-handler';

import { successResponse }
from '../utils/response';

import { AuthRequest }
from '../types/express';

const contractService =
  new ContractService();

export class ContractController {

  create = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const contract =
        await contractService.createContract(
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        contract,
        'Contract created successfully',
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

            const contractType =
            (req.query.contract_type as string)
            || '';

            const contracts =
            await contractService.getContracts(
                page,
                limit,
                search,
                status,
                contractType
            );

            return successResponse(
            res,
            contracts,
            'Contracts retrieved successfully'
            );
        }
    );

  update = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const contract =
        await contractService.updateContract(
          req.params.id as string,
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        contract,
        'Contract updated successfully'
      );
    }
  );

  delete = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      await contractService.deleteContract(
        req.params.id as string,
        req.user.id
      );

      return successResponse(
        res,
        null,
        'Contract deleted successfully'
      );
    }
  );
}