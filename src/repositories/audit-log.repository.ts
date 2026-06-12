import { PoolClient } from 'pg';
import { db }
from '../database/connection';

export class AuditLogRepository {

  async create(
    data: any,
    client?: PoolClient
  ) {

    const executor =
      client || db;

    const query = `

      INSERT INTO audit_logs (

        module,

        entity_id,

        action_type,

        actor_id,

        old_data,

        new_data,

        description

      )

      VALUES (

        $1, $2, $3,
        $4, $5, $6,
        $7

      )

      RETURNING *
    `;

    const values = [

      data.module,

      data.entity_id,

      data.action_type,

      data.actor_id,

      data.old_data || null,

      data.new_data || null,

      data.description,
    ];

    const result =
      await executor.query(
        query,
        values
      );

    return result.rows[0];
  }

  async findAllLogs(
    page = 1,
    limit = 10,
    module = '',
    actionType = '',
    actorId = '',
    startDate = '',
    endDate = ''
  ) {

    const offset =
      (page - 1) * limit;

    let query = `

      SELECT

        al.*,

        users.full_name
        AS actor_name

      FROM audit_logs al

      LEFT JOIN users
      ON users.id = al.actor_id

      WHERE 1=1
    `;

    let countQuery = `

      SELECT COUNT(*) AS total

      FROM audit_logs

      WHERE 1=1
    `;

    const values: any[] = [];

    if (module) {

      values.push(module);

      query += `
        AND al.module =
        $${values.length}
      `;

      countQuery += `
        AND module =
        $${values.length}
      `;
    }

    if (actionType) {

      values.push(actionType);

      query += `
        AND al.action_type =
        $${values.length}
      `;

      countQuery += `
        AND action_type =
        $${values.length}
      `;
    }

    if (actorId) {

      values.push(actorId);

      query += `
        AND al.actor_id =
        $${values.length}
      `;

      countQuery += `
        AND actor_id =
        $${values.length}
      `;
    }

    if (startDate) {

      values.push(startDate);

      query += `
        AND al.created_at >=
        $${values.length}
      `;

      countQuery += `
        AND created_at >=
        $${values.length}
      `;
    }

    if (endDate) {

      values.push(endDate);

      query += `
        AND al.created_at <=
        $${values.length}
      `;

      countQuery += `
        AND created_at <=
        $${values.length}
      `;
    }

    query += `
      ORDER BY al.created_at DESC
    `;

    values.push(limit);

    query += `
      LIMIT $${values.length}
    `;

    values.push(offset);

    query += `
      OFFSET $${values.length}
    `;

    const result =
      await db.query(
        query,
        values
      );

    const countResult =
      await db.query(
        countQuery,
        values.slice(
          0,
          values.length - 2
        )
      );

    return {

      data: result.rows,

      total: Number(
        countResult.rows[0].total
      ),

      page,

      limit,

      total_pages: Math.ceil(

        Number(
          countResult.rows[0].total
        ) / limit
      ),
    };
  }
}