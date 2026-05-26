import { db } from '../database/connection';

import { BaseRepository }
from './base.repository';

export class PartnerRepository
  extends BaseRepository {

  constructor() {
    super('partners');
  }

  async create(
    data: any,
    actorId: string
  ) {

    const query = `
      INSERT INTO partners (
        name,
        type,
        created_by
      )
      VALUES (
        $1, $2, $3
      )
      RETURNING *
    `;

    const values = [
      data.name,
      data.type,
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
      UPDATE partners
      SET
        name = COALESCE($1, name),
        type = COALESCE($2, type),
        is_active = COALESCE($3, is_active),
        updated_by = $4
      WHERE id = $5
      RETURNING *
    `;

    const values = [
      data.name,
      data.type,
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

  async findAllPartners() {

    const query = `
      SELECT *
      FROM partners
      WHERE is_deleted = false
      ORDER BY name ASC
    `;

    const result = await db.query(query);

    return result.rows;
  }
}