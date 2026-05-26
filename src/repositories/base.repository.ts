import { db } from '../database/connection';

export class BaseRepository {
  protected table: string;

  constructor(table: string) {
    this.table = table;
  }

  async findAll() {
    const query = `
      SELECT *
      FROM ${this.table}
      WHERE is_deleted = false
      ORDER BY created_at DESC
    `;

    const result = await db.query(query);

    return result.rows;
  }

  async findById(id: string) {
    const query = `
      SELECT *
      FROM ${this.table}
      WHERE id = $1
      AND is_deleted = false
      LIMIT 1
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
  }

  async softDelete(
    id: string,
    actorId: string
  ) {

    const query = `
      UPDATE ${this.table}
      SET
        is_deleted = true,
        updated_by = $1
      WHERE id = $2
    `;

    await db.query(query, [
      actorId,
      id,
    ]);
  }
}