import { db } from '../database/connection';

import { BaseRepository }
from './base.repository';

export class AirlineRepository
  extends BaseRepository {

  constructor() {
    super('airlines');
  }

  async findByCode(
    code: string
  ) {

    const query = `
      SELECT *
      FROM airlines
      WHERE code = $1
      LIMIT 1
    `;

    const result = await db.query(
      query,
      [code]
    );

    return result.rows[0];
  }

  async create(
    data: any,
    actorId: string
  ) {

    const query = `
      INSERT INTO airlines (
        code,
        name,
        logo,
        country,
        created_by
      )
      VALUES (
        $1, $2, $3, $4, $5
      )
      RETURNING *
    `;

    const values = [
      data.code.toUpperCase(),
      data.name,
      data.logo,
      data.country,
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
      UPDATE airlines
      SET
        code = COALESCE($1, code),
        name = COALESCE($2, name),
        logo = COALESCE($3, logo),
        country = COALESCE($4, country),
        is_active = COALESCE($5, is_active),
        updated_by = $6
      WHERE id = $7
      RETURNING *
    `;

    const values = [
      data.code
        ? data.code.toUpperCase()
        : null,
      data.name,
      data.logo,
      data.country,
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

  async findAllAirlines() {

    const query = `
      SELECT *
      FROM airlines
      WHERE is_deleted = false
      ORDER BY name ASC
    `;

    const result = await db.query(query);

    return result.rows;
  }
}