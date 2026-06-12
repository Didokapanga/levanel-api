import { PoolClient } from 'pg';
import { AuditLogRepository }
from '../repositories/audit-log.repository';

const repository =
  new AuditLogRepository();

export class AuditLogService {

  async createLog(
    data: any,
    client?: PoolClient
  ) {

    return await repository.create(
      {
        module:
          data.module,

        entity_id:
          data.entity_id,

        action_type:
          data.action_type,

        actor_id:
          data.actor_id,

        old_data:
          data.old_data || null,

        new_data:
          data.new_data || null,

        description:
          data.description,
      },
      client
    );
  }

  async findAll(
    page: number,
    limit: number,
    module: string,
    actionType: string,
    actorId: string,
    startDate: string,
    endDate: string
  ) {

    return await repository
      .findAllLogs(
        page,
        limit,
        module,
        actionType,
        actorId,
        startDate,
        endDate
      );
  }
}