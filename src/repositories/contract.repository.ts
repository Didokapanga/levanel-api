import { db } from '../database/connection';

import { BaseRepository }
from './base.repository';

export class ContractRepository
  extends BaseRepository {

  constructor() {
    super('contracts');
  }

  async create(
    data: any,
    actorId: string
  ) {

    const query = `
      INSERT INTO contracts (
        partner_id,
        contract_type,
        status,
        start_date,
        end_date,
        description,
        created_by
      )
      VALUES (
        $1, $2, $3,
        $4, $5, $6, $7
      )
      RETURNING *
    `;

    const values = [
      data.partner_id,
      data.contract_type,
      data.status || 'active',
      data.start_date,
      data.end_date,
      data.description,
      actorId,
    ];

    const result = await db.query(
      query,
      values
    );

    return result.rows[0];
  }

  async update(
    id: string,
    data: any,
    actorId: string
  ) {

    const query = `
      UPDATE contracts
      SET

        partner_id =
          COALESCE($1, partner_id),

        contract_type =
          COALESCE($2, contract_type),

        status =
          COALESCE($3, status),

        start_date =
          COALESCE($4, start_date),

        end_date =
          COALESCE($5, end_date),

        description =
          COALESCE($6, description),

        is_active =
          COALESCE($7, is_active),

        updated_by = $8

      WHERE id = $9

      RETURNING *
    `;

    const values = [
      data.partner_id,
      data.contract_type,
      data.status,
      data.start_date,
      data.end_date,
      data.description,
      data.is_active,
      actorId,
      id,
    ];

    const result = await db.query(
      query,
      values
    );

    return result.rows[0];
  }

  async findAllContracts(
    page = 1,
    limit = 10,
    search = '',
    status = '',
    contractType = ''
  ) {

    const offset =
      (page - 1) * limit;

    let query = `
      SELECT

        contracts.*,

        partners.name
        AS partner_name

      FROM contracts

      INNER JOIN partners
      ON partners.id = contracts.partner_id

      WHERE contracts.is_deleted = false
    `;

    let countQuery = `
      SELECT COUNT(*) AS total

      FROM contracts

      INNER JOIN partners
      ON partners.id = contracts.partner_id

      WHERE contracts.is_deleted = false
    `;

    const values: any[] = [];

    if (search) {

      values.push(`%${search}%`);

      query += `
        AND (
          partners.name ILIKE $${values.length}
          OR contracts.description ILIKE $${values.length}
        )
      `;

      countQuery += `
        AND (
          partners.name ILIKE $${values.length}
          OR contracts.description ILIKE $${values.length}
        )
      `;
    }

    if (status) {

      values.push(status);

      query += `
        AND contracts.status = $${values.length}
      `;

      countQuery += `
        AND contracts.status = $${values.length}
      `;
    }

    if (contractType) {

      values.push(contractType);

      query += `
        AND contracts.contract_type = $${values.length}
      `;

      countQuery += `
        AND contracts.contract_type = $${values.length}
      `;
    }

    query += `
      ORDER BY contracts.created_at DESC
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
      await db.query(query, values);

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
        Number(countResult.rows[0].total)
        / limit
      ),
    };
  }
}