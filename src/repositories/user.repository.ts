import { db } from '../database/connection';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository {
  constructor() {
    super('users');
  }

    async create(data: any, actorId: string) {
        const query = `
            INSERT INTO users (
            username,
            full_name,
            email,
            password,
            role,
            created_by
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;

        const values = [
            data.username,
            data.full_name,
            data.email,
            data.password,
            data.role || 'agent',
            actorId,
        ];

        const result = await db.query(query, values);

        return result.rows[0];
    }

    async update(
        id: string,
        data: any,
        actorId: string
        ) {

        const query = `
            UPDATE users
            SET
            username = COALESCE($1, username),
            full_name = COALESCE($2, full_name),
            email = COALESCE($3, email),
            password = COALESCE($4, password),
            role = COALESCE($5, role),
            is_active = COALESCE($6, is_active),
            updated_by = $7
            WHERE id = $8
            RETURNING *
        `;

        const values = [
            data.username,
            data.full_name,
            data.email,
            data.password,
            data.role,
            data.is_active,
            actorId,
            id,
        ];

        const result = await db.query(query, values);

        return result.rows[0];
    }

    async findAllUsers() {
        const query = `
            SELECT
            id,
            username,
            full_name,
            email,
            role,
            is_active,
            created_at,
            updated_at,
            version
            FROM users
            WHERE is_deleted = false
            ORDER BY created_at DESC
        `;

        const result = await db.query(query);

        return result.rows;
    }

    async findByEmail(email: string) {
        const query = `
            SELECT *
            FROM users
            WHERE email = $1
            AND is_deleted = false
            LIMIT 1
        `;

        const result = await db.query(query, [email]);

        return result.rows[0];
    }

    async findByIdSafe(id: string) {
        const query = `
            SELECT
            id,
            username,
            full_name,
            email,
            role,
            is_active
            FROM users
            WHERE id = $1
            AND is_deleted = false
            LIMIT 1
        `;

        const result = await db.query(query, [id]);

        return result.rows[0];
    }
}