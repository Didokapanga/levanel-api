import { db } from '../database/connection';

import { BaseRepository } from './base.repository';

export class ServiceRepository
  extends BaseRepository {

  constructor() {
    super('services');
  }

  async findByInitial(
    initial: string
  ) {

    const query = `
      SELECT *
      FROM services
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
      INSERT INTO services (
        name,
        initial,
        description,
        color,
        icon,
        created_by
      )
      VALUES (
        $1, $2, $3, $4, $5, $6
      )
      RETURNING *
    `;

    const values = [
      data.name,
      data.initial,
      data.description,
      data.color,
      data.icon,
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
      UPDATE services
      SET
        name = COALESCE($1, name),
        description = COALESCE($2, description),
        color = COALESCE($3, color),
        icon = COALESCE($4, icon),
        is_active = COALESCE($5, is_active),
        updated_by = $6
      WHERE id = $7
      RETURNING *
    `;

    const values = [
      data.name,
      data.description,
      data.color,
      data.icon,
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

  async findAllServices() {

    const query = `
      SELECT *
      FROM services
      WHERE is_deleted = false
      ORDER BY name ASC
    `;

    const result = await db.query(query);

    return result.rows;
  }
}