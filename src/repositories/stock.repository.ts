import { PoolClient } from 'pg';
import { db } from '../database/connection';

import { BaseRepository }
from './base.repository';

export class StockRepository
  extends BaseRepository {

  constructor() {
    super('stocks');
  }

  async create(
    data: any,
    actorId: string,
    client?: PoolClient
  ) {

    const executor =
      client || db;

    const query = `
      INSERT INTO stocks (

        contract_id,

        amount_initial,

        amount_remaining,

        currency,

        purchased_at,

        notes,

        created_by

      )
      VALUES (
        $1, $2, $3,
        $4, $5, $6, $7
      )

      RETURNING *
    `;

    const values = [

      data.contract_id,

      data.amount_initial,

      data.amount_initial,

      data.currency || 'USD',

      data.purchased_at,

      data.notes,

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
      UPDATE stocks

      SET

        amount_remaining =
          COALESCE(
            $1,
            amount_remaining
          ),

        notes =
          COALESCE(
            $2,
            notes
          ),

        is_active =
          COALESCE(
            $3,
            is_active
          ),

        updated_by = $4,

        updated_at = NOW()

      WHERE id = $5

      AND is_deleted = false

      RETURNING *
    `;

    const values = [

      data.amount_remaining,

      data.notes,

      data.is_active,

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

  async findAllStocks(
    page = 1,
    limit = 10,
    search = '',
    contractType = ''
  ) {

    const offset =
      (page - 1) * limit;

    let query = `
      SELECT

        stocks.*,

        contracts.contract_type,

        partners.name
        AS partner_name

      FROM stocks

      INNER JOIN contracts
      ON contracts.id = stocks.contract_id

      INNER JOIN partners
      ON partners.id = contracts.partner_id

      WHERE stocks.is_deleted = false
    `;

    let countQuery = `
      SELECT COUNT(*) AS total

      FROM stocks

      INNER JOIN contracts
      ON contracts.id = stocks.contract_id

      INNER JOIN partners
      ON partners.id = contracts.partner_id

      WHERE stocks.is_deleted = false
    `;

    const values: any[] = [];

    if (search) {

      values.push(`%${search}%`);

      query += `
        AND (
          partners.name ILIKE $${values.length}
        )
      `;

      countQuery += `
        AND (
          partners.name ILIKE $${values.length}
        )
      `;
    }

    if (contractType) {

      values.push(contractType);

      query += `
        AND contracts.contract_type
        = $${values.length}
      `;

      countQuery += `
        AND contracts.contract_type
        = $${values.length}
      `;
    }

    query += `
      ORDER BY stocks.created_at DESC
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

  async findById(
    id: string,
    client?: PoolClient
  ) {

    const executor =
      client || db;

    const query = `
      SELECT *

      FROM contracts

      WHERE id = $1

      LIMIT 1
    `;

    const result =
      await executor.query(
        query,
        [id]
      );

    return result.rows[0];
  }
}