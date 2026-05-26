import { db } from '../database/connection';

import { BaseRepository }
from './base.repository';

export class SystemRepository
  extends BaseRepository {

  constructor() {
    super('systems');
  }

  async findByInitial(
    initial: string
  ) {

    const query = `
      SELECT *
      FROM systems
      WHERE initial = $1
      LIMIT 1
    `;

    const result = await db.query(
      query,
      [initial]
    );

    return result.rows[0];
  }

  async create(
    data: any,
    actorId: string
  ) {

    const query = `
      INSERT INTO systems (
        name,
        initial,
        description,
        created_by
      )
      VALUES (
        $1, $2, $3, $4
      )
      RETURNING *
    `;

    const values = [
      data.name,
      data.initial.toUpperCase(),
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
      UPDATE systems
      SET
        name = COALESCE($1, name),
        initial = COALESCE($2, initial),
        description = COALESCE($3, description),
        is_active = COALESCE($4, is_active),
        updated_by = $5
      WHERE id = $6
      RETURNING *
    `;

    const values = [
      data.name,
      data.initial
        ? data.initial.toUpperCase()
        : null,
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

  async findAllSystems() {

    const query = `
      SELECT *
      FROM systems
      WHERE is_deleted = false
      ORDER BY name ASC
    `;

    const result = await db.query(query);

    return result.rows;
  }
}