import { PoolClient } from 'pg';
import { db }
from '../database/connection';

import { BaseRepository }
from './base.repository';

export class ServiceRequestRepository
extends BaseRepository {

  constructor() {
    super('service_requests');
  }

  async create(
    data: any,
    actorId: string,
    client?: PoolClient
  ) {

    const executor =
      client || db;

    const query = `
      INSERT INTO service_requests (

        client_id,

        service_id,

        partner_id,

        contract_id,

        request_reference,

        request_type,

        currency,

        observation,

        created_by

      )
      VALUES (
        $1, $2, $3,
        $4, $5, $6,
        $7, $8, $9
      )

      RETURNING *
    `;

    const values = [

      data.client_id,

      data.service_id,

      data.partner_id || null,

      data.contract_id || null,

      data.request_reference,

      data.request_type,

      data.currency || 'USD',

      data.observation,

      actorId,
    ];

    const result =
      await executor.query(
        query,
        values
      );

    return result.rows[0];
  }

  async update(
    id: string,
    data: any,
    actorId: string,
    client?: PoolClient
  ) {

    const executor =
      client || db;

    const query = `
      UPDATE service_requests

      SET

        status =
          COALESCE($1, status),

        observation =
          COALESCE($2, observation),

        completed_at =
          COALESCE(
            $3,
            completed_at
          ),

        updated_by = $4,

        updated_at = NOW()

      WHERE id = $5

      RETURNING *
    `;

    const values = [

      data.status,

      data.observation,

      data.completed_at,

      actorId,

      id,
    ];

    const result =
      await executor.query(
        query,
        values
      );

    return result.rows[0];
  }

  async findAllRequest(
    page = 1,
    limit = 10,
    search = '',
    status = '',
    serviceId = ''
  ) {

    const offset =
      (page - 1) * limit;

    let query = `
      SELECT

        sr.*,

        clients.name
        AS client_name,

        services.name
        AS service_name,

        partners.name
        AS partner_name

      FROM service_requests sr

      INNER JOIN clients
      ON clients.id = sr.client_id

      INNER JOIN services
      ON services.id = sr.service_id

      LEFT JOIN partners
      ON partners.id = sr.partner_id

      WHERE sr.is_deleted = false
    `;

    let countQuery = `
      SELECT COUNT(*) AS total

      FROM service_requests sr

      WHERE sr.is_deleted = false
    `;

    const values: any[] = [];

    if (search) {

      values.push(`%${search}%`);

      query += `
        AND (
          sr.request_reference
          ILIKE $${values.length}

          OR clients.name
          ILIKE $${values.length}
        )
      `;

      countQuery += `
        AND (
          request_reference
          ILIKE $${values.length}
        )
      `;
    }

    if (status) {

      values.push(status);

      query += `
        AND sr.status
        = $${values.length}
      `;

      countQuery += `
        AND status
        = $${values.length}
      `;
    }

    if (serviceId) {

      values.push(serviceId);

      query += `
        AND sr.service_id
        = $${values.length}
      `;

      countQuery += `
        AND service_id
        = $${values.length}
      `;
    }

    query += `
      ORDER BY sr.created_at DESC
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

  async findRequestById(
  id: string,
  client?: PoolClient
) {

  const executor =
    client || db;
  
  const query = `

    SELECT

      sr.*,

      clients.name
      AS client_name,

      services.name
      AS service_name,

      partners.name
      AS partner_name

    FROM service_requests sr

    INNER JOIN clients
    ON clients.id = sr.client_id

    INNER JOIN services
    ON services.id = sr.service_id

    LEFT JOIN partners
    ON partners.id = sr.partner_id

    WHERE sr.id = $1

    AND sr.is_deleted = false

    LIMIT 1
  `;

  const result =
    await executor.query(
      query,
      [id]
    );

  return result.rows[0];
}

  async updateFinancialTotals(
    requestId: string,
    client?: PoolClient
  ) {

    const executor =
      client || db;

    const query = `

      UPDATE service_requests

      SET

        total_amount = sub.total_amount,

        service_revenue =
          sub.service_revenue,

        external_cost =
          sub.external_cost,

        updated_at = NOW()

      FROM (

        SELECT

          request_id,

          COALESCE(
            SUM(ttc_amount),
            0
          ) AS total_amount,

          COALESCE(
            SUM(

              service_fee

              +

              commission_amount

              +

              cancellation_fee

              +

              modification_fee

            ),
            0
          ) AS service_revenue,

          COALESCE(
            SUM(debit_balance),
            0
          ) AS external_cost

        FROM service_request_items

        WHERE is_deleted = false

        AND request_id = $1

        GROUP BY request_id

      ) sub

      WHERE service_requests.id =
        sub.request_id
    `;

    await executor.query(
      query,
      [requestId]
    );
  }

  async updateRequestStatus(
    requestId: string,
    client?: PoolClient
  ) {

    const executor =
      client || db;

    const query = `

      UPDATE service_requests

      SET

        status = CASE

          /*
            Aucun item
          */

          WHEN total_amount <= 0
          THEN 'pending'

          /*
            Aucun paiement
          */

          WHEN amount_paid <= 0
          THEN 'pending'

          /*
            Paiement total
          */

          WHEN amount_paid >= total_amount
            AND total_amount > 0
          THEN 'completed'

          /*
            Paiement partiel
          */

          ELSE 'confirmed'

        END,

        updated_at = NOW()

      WHERE id = $1
    `;

    await db.query(
      query,
      [requestId]
    );
  }

  async markBalanceConsumed(
    requestId: string,
    client?: PoolClient
  ) {

    const executor =
      client || db;

    const query = `

      UPDATE service_requests

      SET

        balance_consumed = true,

        updated_at = NOW()

      WHERE id = $1

      RETURNING *
    `;

    const result =
      await executor.query(
        query,
        [requestId]
      );

    return result.rows[0];
  }

  async resetBalanceConsumed(
    requestId: string,
    client?: PoolClient
  ) {

    const executor =
      client || db;

    const query = `

      UPDATE service_requests

      SET

        balance_consumed = false,

        updated_at = NOW()

      WHERE id = $1

      RETURNING *
    `;

    const result =
      await executor.query(
        query,
        [requestId]
      );

    return result.rows[0];
  }
}