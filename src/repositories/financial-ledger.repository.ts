import { PoolClient } from 'pg';
import { db }
from '../database/connection';

export class FinancialLedgerRepository {

  async create(
    data: any,
    actorId: string,
    client?: PoolClient
  ) {

    const executor =
      client || db;

    const query = `

      INSERT INTO financial_ledger (

        request_id,

        item_id,

        payment_id,

        service_id,

        partner_id,

        client_id,

        contract_id,

        ledger_reference,

        source_module,

        operation_type,

        entry_type,

        direction,

        amount,

        currency,

        description,

        created_by

      )

      VALUES (

        $1, $2, $3, $4,
        $5, $6, $7, $8,
        $9, $10, $11, $12,
        $13, $14, $15, $16

      )

      RETURNING *
    `;

    const values = [

      data.request_id,

      data.item_id,

      data.payment_id,

      data.service_id,

      data.partner_id,

      data.client_id,

      data.contract_id,

      data.ledger_reference,

      data.source_module,

      data.operation_type,

      data.entry_type,

      data.direction,

      data.amount,

      data.currency || 'USD',

      data.description,

      actorId,
    ];

    const result =
      await executor.query(
        query,
        values
      );

    return result.rows[0];
  }

  async findAll(
    page = 1,
    limit = 10,
    search = '',
    requestReference = '',
    entryType = '',
    direction = ''
  ) {

    const offset =
      (page - 1) * limit;

    let query = `

      SELECT

        fl.*,

        sr.request_reference,

        clients.name
        AS client_name,

        services.name
        AS service_name,

        partners.name
        AS partner_name

      FROM financial_ledger fl

      LEFT JOIN service_requests sr
      ON sr.id = fl.request_id

      LEFT JOIN clients
      ON clients.id = fl.client_id

      LEFT JOIN services
      ON services.id = fl.service_id

      LEFT JOIN partners
      ON partners.id = fl.partner_id

      WHERE fl.is_deleted = false
    `;

    let countQuery = `

      SELECT COUNT(*) AS total

      FROM financial_ledger fl

      LEFT JOIN service_requests sr
      ON sr.id = fl.request_id

      WHERE fl.is_deleted = false
    `;

    const values: any[] = [];

    if (search) {

      values.push(`%${search}%`);

      query += `
        AND (

          fl.ledger_reference
          ILIKE $${values.length}

          OR fl.description
          ILIKE $${values.length}

          OR sr.request_reference
          ILIKE $${values.length}

        )
      `;

      countQuery += `
        AND (

          fl.ledger_reference
          ILIKE $${values.length}

          OR fl.description
          ILIKE $${values.length}

          OR sr.request_reference
          ILIKE $${values.length}

        )
      `;
    }

    if (requestReference) {

      values.push(requestReference);

      query += `
        AND sr.request_reference =
        $${values.length}
      `;

      countQuery += `
        AND sr.request_reference =
        $${values.length}
      `;
    }

    if (entryType) {

      values.push(entryType);

      query += `
        AND fl.entry_type =
        $${values.length}
      `;

      countQuery += `
        AND fl.entry_type =
        $${values.length}
      `;
    }

    if (direction) {

      values.push(direction);

      query += `
        AND fl.direction =
        $${values.length}
      `;

      countQuery += `
        AND fl.direction =
        $${values.length}
      `;
    }

    query += `
      ORDER BY fl.created_at DESC
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

  async findByLedgerId(
    id: string
  ) {

    const query = `

      SELECT *

      FROM financial_ledger

      WHERE id = $1

      AND is_deleted = false
    `;

    const result =
      await db.query(
        query,
        [id]
      );

    return result.rows[0];
  }
}