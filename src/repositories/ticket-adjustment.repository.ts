import { db }
from '../database/connection';

import { BaseRepository }
from './base.repository';

export class TicketAdjustmentRepository
extends BaseRepository {

  constructor() {
    super(
      'ticket_adjustments'
    );
  }

  async create(
    data: any,
    actorId: string
  ) {

    const query = `

      INSERT INTO ticket_adjustments (

        item_id,

        adjustment_reference,

        adjustment_type,

        airline_fee,

        agency_fee,

        refund_amount,

        new_debit_balance,

        notes,

        created_by

      )

      VALUES (

        $1, $2, $3, $4,
        $5, $6, $7, $8,
        $9

      )

      RETURNING *
    `;

    const values = [

      data.item_id,

      data.adjustment_reference,

      data.adjustment_type,

      data.airline_fee,

      data.agency_fee,

      data.refund_amount,

      data.new_debit_balance,

      data.notes,

      actorId,
    ];

    const result =
      await db.query(
        query,
        values
      );

    return result.rows[0];
  }

  async findById(
    id: string
  ) {

    const query = `

      SELECT *

      FROM ticket_adjustments

      WHERE id = $1
      AND is_deleted = false

      LIMIT 1
    `;

    const result =
      await db.query(
        query,
        [id]
      );

    return result.rows[0];
  }

  async update(
    id: string,
    data: any,
    actorId: string
  ) {

    const query = `

      UPDATE ticket_adjustments

      SET

        airline_fee =
          COALESCE(
            $1,
            airline_fee
          ),

        agency_fee =
          COALESCE(
            $2,
            agency_fee
          ),

        refund_amount =
          COALESCE(
            $3,
            refund_amount
          ),

        new_debit_balance =
          COALESCE(
            $4,
            new_debit_balance
          ),

        notes =
          COALESCE(
            $5,
            notes
          ),

        updated_by = $6,

        updated_at = NOW()

      WHERE id = $7

      RETURNING *
    `;

    const values = [

      data.airline_fee,

      data.agency_fee,

      data.refund_amount,

      data.new_debit_balance,

      data.notes,

      actorId,

      id,
    ];

    const result =
      await db.query(
        query,
        values
      );

    return result.rows[0];
  }

  async softDelete(
    id: string,
    actorId: string
  ) {

    const query = `

      UPDATE ticket_adjustments

      SET

        is_deleted = true,

        updated_by = $1,

        updated_at = NOW()

      WHERE id = $2
    `;

    await db.query(
      query,
      [
        actorId,
        id
      ]
    );
  }

  async findAllAdjustment(
    page = 1,
    limit = 10,
    adjustmentType = '',
    search = ''
  ) {

    const offset =
      (page - 1) * limit;

    let query = `

      SELECT

        ta.*,

        sri.ticket_number,

        sri.customer_name,

        sri.pnr

      FROM ticket_adjustments ta

      INNER JOIN
      service_request_items sri

      ON sri.id = ta.item_id

      WHERE ta.is_deleted = false
    `;

    let countQuery = `

      SELECT COUNT(*) AS total

      FROM ticket_adjustments ta

      WHERE ta.is_deleted = false
    `;

    const values: any[] = [];

    if (adjustmentType) {

      values.push(adjustmentType);

      query += `
        AND ta.adjustment_type =
        $${values.length}
      `;

      countQuery += `
        AND adjustment_type =
        $${values.length}
      `;
    }

    if (search) {

      values.push(`%${search}%`);

      query += `
        AND (

          sri.ticket_number
          ILIKE $${values.length}

          OR sri.customer_name
          ILIKE $${values.length}

          OR sri.pnr
          ILIKE $${values.length}

          OR ta.adjustment_reference
          ILIKE $${values.length}

        )
      `;

      countQuery += `
        AND adjustment_reference
        ILIKE $${values.length}
      `;
    }

    query += `
      ORDER BY ta.created_at DESC
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
}