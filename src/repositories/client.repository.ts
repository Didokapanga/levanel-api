import { db } from '../database/connection';

import { BaseRepository }
from './base.repository';

export class ClientRepository
  extends BaseRepository {

  constructor() {
    super('clients');
  }

  async create(
    data: any,
    actorId: string
  ) {

    const query = `
      INSERT INTO clients (
        name,
        client_type,
        phone,
        email,
        address,
        contact_person,
        tax_number,
        created_by
      )
      VALUES (
        $1, $2, $3, $4,
        $5, $6, $7, $8
      )
      RETURNING *
    `;

    const values = [
      data.name,
      data.client_type,
      data.phone,
      data.email,
      data.address,
      data.contact_person,
      data.tax_number,
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
      UPDATE clients
      SET
        name =
          COALESCE($1, name),

        client_type =
          COALESCE($2, client_type),

        phone =
          COALESCE($3, phone),

        email =
          COALESCE($4, email),

        address =
          COALESCE($5, address),

        contact_person =
          COALESCE($6, contact_person),

        tax_number =
          COALESCE($7, tax_number),

        updated_by = $8

      WHERE id = $9

      RETURNING *
    `;

    const values = [
      data.name,
      data.client_type,
      data.phone,
      data.email,
      data.address,
      data.contact_person,
      data.tax_number,
      actorId,
      id,
    ];

    const result = await db.query(
      query,
      values
    );

    return result.rows[0];
  }

  async findAllClients(
    page = 1,
    limit = 10,
    search = '',
    clientType = ''
  ) {

    const offset =
      (page - 1) * limit;

    let query = `
      SELECT *
      FROM clients
      WHERE is_deleted = false
    `;

    let countQuery = `
      SELECT COUNT(*) AS total
      FROM clients
      WHERE is_deleted = false
    `;

    const values: any[] = [];

    if (search) {

      values.push(`%${search}%`);

      query += `
        AND (
          name ILIKE $${values.length}
          OR email ILIKE $${values.length}
        )
      `;

      countQuery += `
        AND (
          name ILIKE $${values.length}
          OR email ILIKE $${values.length}
        )
      `;
    }

    if (clientType) {

      values.push(clientType);

      query += `
        AND client_type = $${values.length}
      `;

      countQuery += `
        AND client_type = $${values.length}
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