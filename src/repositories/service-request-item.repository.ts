import { db }
from '../database/connection';

import { BaseRepository }
from './base.repository';

export class ServiceRequestItemRepository
extends BaseRepository {

  constructor() {
    super(
      'service_request_items'
    );
  }

  async create(
    data: any,
    actorId: string
  ) {

    const query = `
      INSERT INTO service_request_items (

        request_id,

        item_reference,

        item_type,

        customer_name,

        airline_id,

        system_id,

        ticket_number,

        pnr,

        route,

        travel_class,

        departure_date,

        issued_at,

        tht_amount,

        tax_amount,

        partner_service_fee,

        service_fee,

        cancellation_fee,

        modification_fee,

        commission_amount,

        ttc_amount,

        debit_balance,

        notes,

        created_by

      )
      VALUES (

        $1, $2, $3, $4,
        $5, $6, $7, $8,
        $9, $10, $11, $12,
        $13, $14, $15, $16,
        $17, $18, $19, $20,
        $21, $22, $23

      )

      RETURNING *
    `;

    const values = [

      data.request_id,

      data.item_reference,

      data.item_type,

      data.customer_name,

      data.airline_id,

      data.system_id,

      data.ticket_number,

      data.pnr,

      data.route,

      data.travel_class,

      data.departure_date,

      data.issued_at,

      data.tht_amount,

      data.tax_amount,

      data.partner_service_fee,

      data.service_fee,

      data.cancellation_fee,

      data.modification_fee,

      data.commission_amount,

      data.ttc_amount,

      data.debit_balance,

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

  async findAllItems(
    page = 1,
    limit = 10,
    search = '',
    requestReference = ''
  ) {

    const offset =
      (page - 1) * limit;

    let query = `

      SELECT

        sri.*,

        sr.request_reference,

        airlines.name
        AS airline_name,

        systems.name
        AS system_name

      FROM service_request_items sri

      INNER JOIN service_requests sr
      ON sr.id = sri.request_id

      LEFT JOIN airlines
      ON airlines.id = sri.airline_id

      LEFT JOIN systems
      ON systems.id = sri.system_id

      WHERE sri.is_deleted = false
    `;

    let countQuery = `

      SELECT COUNT(*) AS total

      FROM service_request_items sri

      INNER JOIN service_requests sr
      ON sr.id = sri.request_id

      WHERE sri.is_deleted = false
    `;

    const values: any[] = [];

    if (search) {

      values.push(`%${search}%`);

      query += `
        AND (

          sri.customer_name
          ILIKE $${values.length}

          OR sri.ticket_number
          ILIKE $${values.length}

          OR sri.pnr
          ILIKE $${values.length}

          OR sr.request_reference
          ILIKE $${values.length}

        )
      `;

      countQuery += `
        AND (

          sri.customer_name
          ILIKE $${values.length}

          OR sri.ticket_number
          ILIKE $${values.length}

          OR sri.pnr
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
      ORDER BY sri.created_at DESC
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

      UPDATE service_request_items

      SET

        customer_name =
          COALESCE(
            $1,
            customer_name
          ),

        route =
          COALESCE(
            $2,
            route
          ),

        travel_class =
          COALESCE(
            $3,
            travel_class
          ),

        departure_date =
          COALESCE(
            $4,
            departure_date
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

      data.customer_name,

      data.route,

      data.travel_class,

      data.departure_date,

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
}