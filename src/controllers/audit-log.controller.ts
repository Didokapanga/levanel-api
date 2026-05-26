import { Response }
from 'express';

import { AuthRequest }
from '../types/express';

import { AuditLogService }
from '../services/audit-log.service';

import { asyncHandler }
from '../utils/async-handler';

import { successResponse }
from '../utils/response';

const service =
  new AuditLogService();

export class AuditLogController {

  findAll = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const page =
        Number(req.query.page) || 1;

      const limit =
        Number(req.query.limit) || 10;

      const module =
        (req.query.module as string)
        || '';

      const actionType =
        (req.query.action_type as string) || '';

      const actorId =
        (req.query.actor_id as string) || '';

      const startDate =
        (req.query.start_date as string) || '';

      const endDate =
        (req.query.end_date as string) || '';

      const logs =
        await service.findAll(
          page,
          limit,
          module,
          actionType,
          actorId,
          startDate,
          endDate
        );

      return successResponse(
        res,
        logs,
        'Audit logs retrieved successfully'
      );
    }
  );
}