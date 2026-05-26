import { Response } from 'express';

import { ClientService } from '../services/client.service';

import { asyncHandler } from '../utils/async-handler';
import { successResponse } from '../utils/response';

import { AuthRequest } from '../types/express';

const clientService = new ClientService();

export class ClientController {

  create = asyncHandler(
    async (req: AuthRequest, res: Response) => {

      const client =
        await clientService.createClient(
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        client,
        'Client created successfully',
        201
      );
    }
  );

  findAll = asyncHandler(
    async (req: AuthRequest, res: Response) => {

      const page =
        Number(req.query.page) || 1;

      const limit =
        Number(req.query.limit) || 10;

      const search =
        (req.query.search as string) || '';

      const clientType =
        (req.query.client_type as string) || '';

      const clients =
        await clientService.getClients(
          page,
          limit,
          search,
          clientType
        );

      return successResponse(
        res,
        clients,
        'Clients retrieved successfully'
      );
    }
  );

  update = asyncHandler(
    async (req: AuthRequest, res: Response) => {

      const client =
        await clientService.updateClient(
          req.params.id as string,
          req.body,
          req.user.id
        );

      return successResponse(
        res,
        client,
        'Client updated successfully'
      );
    }
  );

  delete = asyncHandler(
    async (req: AuthRequest, res: Response) => {

      await clientService.deleteClient(
        req.params.id as string,
        req.user.id
      );

      return successResponse(
        res,
        null,
        'Client deleted successfully'
      );
    }
  );
}