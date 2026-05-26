import { db } from '../database/connection';

export class LedgerRepository {

  async create(
    data: any
  ) {

    const query = `
      INSERT INTO financial_ledger (

        service_id,

        operation_reference,

        source_module,

        operation_type,

        direction,

        amount,

        currency,

        description,

        partner_id,

        client_id,

        contract_id,

        created_by

      )
      VALUES (

        $1, $2, $3,
        $4, $5, $6,
        $7, $8, $9,
        $10, $11, $12

      )

      RETURNING *
    `;

    const values = [

      data.service_id,

      data.operation_reference,

      data.source_module,

      data.operation_type,

      data.direction,

      data.amount,

      data.currency || 'USD',

      data.description,

      data.partner_id,

      data.client_id,

      data.contract_id,

      data.created_by,
    ];

    const result =
      await db.query(
        query,
        values
      );

    return result.rows[0];
  }

  async findAll(
    page = 1,
    limit = 10,
    search = '',
    sourceModule = '',
    direction = ''
  ) {

    const offset =
      (page - 1) * limit;

    let query = `
      SELECT

        financial_ledger.*,

        services.name
        AS service_name,

        partners.name
        AS partner_name,

        clients.name
        AS client_name

      FROM financial_ledger

      LEFT JOIN services
      ON services.id =
      financial_ledger.service_id

      LEFT JOIN partners
      ON partners.id =
      financial_ledger.partner_id

      LEFT JOIN clients
      ON clients.id =
      financial_ledger.client_id

      WHERE financial_ledger.is_deleted = false
    `;

    let countQuery = `
      SELECT COUNT(*) AS total

      FROM financial_ledger

      WHERE is_deleted = false
    `;

    const values: any[] = [];

    if (search) {

      values.push(`%${search}%`);

      query += `
        AND (
          operation_reference
          ILIKE $${values.length}

          OR description
          ILIKE $${values.length}
        )
      `;

      countQuery += `
        AND (
          operation_reference
          ILIKE $${values.length}

          OR description
          ILIKE $${values.length}
        )
      `;
    }

    if (sourceModule) {

      values.push(sourceModule);

      query += `
        AND source_module
        = $${values.length}
      `;

      countQuery += `
        AND source_module
        = $${values.length}
      `;
    }

    if (direction) {

      values.push(direction);

      query += `
        AND direction
        = $${values.length}
      `;

      countQuery += `
        AND direction
        = $${values.length}
      `;
    }

    query += `
      ORDER BY created_at DESC
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