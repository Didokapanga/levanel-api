import { db }
from '../database/connection';

export class DashboardRepository {

  /*
    Vue financière globale
  */

  async getFinancialOverview() {

    const query = `

      SELECT

        /*
          Revenus
        */

        COALESCE(SUM(

          CASE
            WHEN direction = 'income'
            THEN amount
            ELSE 0
          END

        ), 0)
        AS total_income,

        /*
          Dépenses
        */

        COALESCE(SUM(

          CASE
            WHEN direction = 'expense'
            THEN amount
            ELSE 0
          END

        ), 0)
        AS total_expense,

        /*
          Profit net
        */

        COALESCE(SUM(

          CASE
            WHEN direction = 'income'
            THEN amount
            ELSE -amount
          END

        ), 0)
        AS net_profit

      FROM financial_ledger

      WHERE is_deleted = false
    `;

    const result =
      await db.query(query);

    return result.rows[0];
  }

  /*
    Statistiques opérations
  */

  async getOperationStats() {

    const query = `

      SELECT

        COUNT(*) AS total_items,

        COUNT(*) FILTER (
          WHERE item_type = 'ticket'
        ) AS total_tickets,

        COUNT(*) FILTER (
          WHERE item_status = 'cancelled'
        ) AS cancelled_items,

        COUNT(*) FILTER (
          WHERE item_status = 'modified'
        ) AS modified_items,

        COUNT(*) FILTER (
          WHERE item_status = 'refunded'
        ) AS refunded_items

      FROM service_request_items

      WHERE is_deleted = false
    `;

    const result =
      await db.query(query);

    return result.rows[0];
  }

  /*
    Statistiques paiements
  */

  async getPaymentStats() {

    const query = `

      SELECT

        COUNT(*) AS total_payments,

        COALESCE(SUM(amount), 0)
        AS total_paid

      FROM customer_payments

      WHERE is_deleted = false
    `;

    const result =
      await db.query(query);

    return result.rows[0];
  }

  /*
    Statistiques dossiers
  */

  async getRequestStats() {

    const query = `

      SELECT

        COUNT(*) AS total_requests,

        COUNT(*) FILTER (
          WHERE status = 'pending'
        ) AS pending_requests,

        COUNT(*) FILTER (
          WHERE status = 'completed'
        ) AS completed_requests,

        COUNT(*) FILTER (
          WHERE status = 'cancelled'
        ) AS cancelled_requests

      FROM service_requests

      WHERE is_deleted = false
    `;

    const result =
      await db.query(query);

    return result.rows[0];
  }

  /*
    Top compagnies
  */

  async getTopAirlines() {

    const query = `

      SELECT

        airlines.name,

        COUNT(*) AS total_sales,

        COALESCE(SUM(

          sri.service_fee
          +

          sri.commission_amount

        ), 0)
        AS revenue

      FROM service_request_items sri

      INNER JOIN airlines
      ON airlines.id = sri.airline_id

      WHERE sri.is_deleted = false

      GROUP BY airlines.name

      ORDER BY revenue DESC

      LIMIT 10
    `;

    const result =
      await db.query(query);

    return result.rows;
  }

  /*
    Top clients
  */

  async getTopClients() {

    const query = `

      SELECT

        clients.name,

        COUNT(*) AS total_operations,

        COALESCE(SUM(
          sr.total_amount
        ), 0)
        AS total_business

      FROM service_requests sr

      INNER JOIN clients
      ON clients.id = sr.client_id

      WHERE sr.is_deleted = false

      GROUP BY clients.name

      ORDER BY total_business DESC

      LIMIT 10
    `;

    const result =
      await db.query(query);

    return result.rows;
  }

  /*
    Balances faibles
  */

  async getLowBalances() {

    const query = `

      SELECT

        contracts.id,

        contracts.contract_reference,

        contracts.contract_type,

        COALESCE(
          cautions.amount_remaining,
          0
        ) AS caution_remaining,

        COALESCE(
          stocks.amount_remaining,
          0
        ) AS stock_remaining

      FROM contracts

      LEFT JOIN cautions
      ON cautions.contract_id = contracts.id

      LEFT JOIN stocks
      ON stocks.contract_id = contracts.id

      WHERE contracts.is_deleted = false

      AND (

        COALESCE(
          cautions.amount_remaining,
          999999
        ) < 100

        OR

        COALESCE(
          stocks.amount_remaining,
          999999
        ) < 100
      )

      ORDER BY contracts.created_at DESC
    `;

    const result =
      await db.query(query);

    return result.rows;
  }

  /*
    Revenus mensuels
  */

  async getMonthlyRevenue() {

    const query = `

      SELECT

        TO_CHAR(
          created_at,
          'YYYY-MM'
        ) AS month,

        COALESCE(SUM(amount), 0)
        AS income

      FROM financial_ledger

      WHERE direction = 'income'
      AND is_deleted = false

      GROUP BY month

      ORDER BY month ASC
    `;

    const result =
      await db.query(query);

    return result.rows;
  }

  /*
    Cashflow mensuel
  */

  async getMonthlyCashflow() {

    const query = `

      SELECT

        TO_CHAR(
          created_at,
          'YYYY-MM'
        ) AS month,

        COALESCE(SUM(

          CASE
            WHEN direction = 'income'
            THEN amount
            ELSE 0
          END

        ), 0)
        AS total_income,

        COALESCE(SUM(

          CASE
            WHEN direction = 'expense'
            THEN amount
            ELSE 0
          END

        ), 0)
        AS total_expense,

        COALESCE(SUM(

          CASE
            WHEN direction = 'income'
            THEN amount
            ELSE -amount
          END

        ), 0)
        AS net_cashflow

      FROM financial_ledger

      WHERE is_deleted = false

      GROUP BY month

      ORDER BY month ASC
    `;

    const result =
      await db.query(query);

    return result.rows;
  }

  /*
    Profit par compagnie
  */

  async getProfitByAirline() {

    const query = `

      SELECT

        airlines.name,

        COALESCE(SUM(

          sri.service_fee
          +

          sri.commission_amount
          -

          sri.partner_service_fee

        ), 0)
        AS profit

      FROM service_request_items sri

      INNER JOIN airlines
      ON airlines.id = sri.airline_id

      WHERE sri.is_deleted = false

      GROUP BY airlines.name

      ORDER BY profit DESC
    `;

    const result =
      await db.query(query);

    return result.rows;
  }

  /*
    Pertes annulation
  */

  async getCancellationLosses() {

    const query = `

      SELECT

        COALESCE(SUM(amount), 0)
        AS cancellation_losses

      FROM financial_ledger

      WHERE entry_type =
      'airline_cancellation_fee'

      AND direction = 'expense'

      AND is_deleted = false
    `;

    const result =
      await db.query(query);

    return result.rows[0];
  }

  /*
    Graphique journalier
  */

  async getDailyRevenueChart() {

    const query = `

      SELECT

        TO_CHAR(
          created_at,
          'YYYY-MM-DD'
        ) AS day,

        COALESCE(SUM(amount), 0)
        AS revenue

      FROM financial_ledger

      WHERE direction = 'income'
      AND is_deleted = false

      GROUP BY day

      ORDER BY day ASC
    `;

    const result =
      await db.query(query);

    return result.rows;
  }

  /*
    Alertes critiques
  */

  async getCriticalAlerts() {

    const query = `

      SELECT

        'LOW_BALANCE'
        AS alert_type,

        contracts.contract_reference,

        COALESCE(
          cautions.amount_remaining,
          stocks.amount_remaining
        ) AS balance

      FROM contracts

      LEFT JOIN cautions
      ON cautions.contract_id = contracts.id

      LEFT JOIN stocks
      ON stocks.contract_id = contracts.id

      WHERE (

        COALESCE(
          cautions.amount_remaining,
          999999
        ) < 100

        OR

        COALESCE(
          stocks.amount_remaining,
          999999
        ) < 100
      )

      LIMIT 20
    `;

    const result =
      await db.query(query);

    return result.rows;
  }
}