import { db }
from '../database/connection';

import { BaseRepository }
from './base.repository';

export class CustomerPaymentRepository
extends BaseRepository {

  constructor() {
    super('customer_payments');
  }

  async create(
    data: any,
    actorId: string
  ) {

    const query = `

      INSERT INTO customer_payments (

        request_id,

        payment_reference,

        payment_method,

        payment_type,

        amount,

        currency,

        observation,

        created_by

      )

      VALUES (

        $1, $2, $3, $4,
        $5, $6, $7, $8

      )

      RETURNING *
    `;

    const values = [

      data.request_id,

      data.payment_reference,

      data.payment_method,

      data.payment_type,

      data.amount,

      data.currency || 'USD',

      data.observation,

      actorId,
    ];

    const result =
      await db.query(
        query,
        values
      );

    return result.rows[0];
  }

  async recalculateAmountPaid(
    requestId: string
  ) {

    const query = `

      UPDATE service_requests

      SET

        amount_paid = sub.total_paid,

        updated_at = NOW()

      FROM (

        SELECT

          request_id,

          COALESCE(

            SUM(

              CASE

                WHEN payment_type = 'payment'
                THEN amount

                WHEN payment_type = 'refund'
                THEN -amount

                WHEN payment_type = 'adjustment'
                THEN amount

                ELSE 0

              END

            ),

            0

          ) AS total_paid

        FROM customer_payments

        WHERE is_deleted = false

        AND request_id = $1

        GROUP BY request_id

      ) sub

      WHERE service_requests.id =
        sub.request_id
    `;

    await db.query(
      query,
      [requestId]
    );
  }

  async findAllPayment(
    page = 1,
    limit = 10,
    search = '',
    requestReference = ''
  ) {

    const offset =
      (page - 1) * limit;

    let query = `

      SELECT

        cp.*,

        sr.request_reference

      FROM customer_payments cp

      INNER JOIN service_requests sr
      ON sr.id = cp.request_id

      WHERE cp.is_deleted = false
    `;

    let countQuery = `

      SELECT COUNT(*) AS total

      FROM customer_payments cp

      INNER JOIN service_requests sr
      ON sr.id = cp.request_id

      WHERE cp.is_deleted = false
    `;

    const values: any[] = [];

    if (search) {

      values.push(`%${search}%`);

      query += `
        AND (

          cp.payment_reference
          ILIKE $${values.length}

          OR cp.payment_method
          ILIKE $${values.length}

          OR sr.request_reference
          ILIKE $${values.length}

        )
      `;

      countQuery += `
        AND (

          cp.payment_reference
          ILIKE $${values.length}

          OR cp.payment_method
          ILIKE $${values.length}

          OR sr.request_reference
          ILIKE $${values.length}

        )
      `;
    }

    if (requestReference) {

      values.push(requestReference);

      query += `
        AND sr.request_reference =
        $${values.length}
      `;

      countQuery += `
        AND sr.request_reference =
        $${values.length}
      `;
    }

    query += `
      ORDER BY cp.created_at DESC
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

  async update(
    id: string,
    data: any,
    actorId: string
  ) {

    const query = `

      UPDATE customer_payments

      SET

        payment_method =
          COALESCE(
            $1,
            payment_method
          ),

        payment_type =
          COALESCE(
            $2,
            payment_type
          ),

        amount =
          COALESCE(
            $3,
            amount
          ),

        currency =
          COALESCE(
            $4,
            currency
          ),

        observation =
          COALESCE(
            $5,
            observation
          )

      WHERE id = $6

      RETURNING *
    `;

    const values = [

      data.payment_method,

      data.payment_type,

      data.amount,

      data.currency,

      data.observation,

      id,
    ];

    const result =
      await db.query(
        query,
        values
      );

    return result.rows[0];
  }
}