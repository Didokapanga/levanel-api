import { db } from '../database/connection';
import { PoolClient } from 'pg';

export class BaseRepository {

  protected table: string;

  constructor(
    table: string
  ) {

    this.table = table;
  }

  async findAll(
    client?: PoolClient
  ) {

    const executor =
      client || db;

    const query = `
      SELECT *

      FROM ${this.table}

      WHERE is_deleted = false

      ORDER BY created_at DESC
    `;

    const result =
      await executor.query(
        query
      );

    return result.rows;
  }

  async findById(
    id: string,
    client?: PoolClient
  ) {

    const executor =
      client || db;

    const query = `
      SELECT *
      FROM ${this.table}
      WHERE id = $1
      AND is_deleted = false
      LIMIT 1
    `;

    const result =
      await executor.query(
        query,
        [id]
      );

    return result.rows[0];
  }

  async softDelete(
    id: string,
    actorId: string,
    client?: PoolClient
  ) {

    const executor =
      client || db;

    const query = `

      UPDATE ${this.table}

      SET

        is_deleted = true,

        updated_by = $1,

        updated_at = NOW()

      WHERE id = $2

      AND is_deleted = false

      RETURNING id
    `;

    const result =
      await executor.query(
        query,
        [
          actorId,
          id
        ]
      );

    return result.rows[0];
  }
}