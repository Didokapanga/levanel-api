import { db }
from '../database/connection';

export class FinancialConsistencyService {

  /*
    Vérification globale
  */

  async runGlobalCheck() {

    const [

      overpaidRequests,

      negativeBalances,

      invalidCompletedRequests,

      invalidPendingRequests,

      missingPaymentLedgers,

      negativeCautionBalances,

      negativeStockBalances,

      cancelledWithoutAdjustment,

      refundWithoutExpenseLedger,

    ] = await Promise.all([

      this.getOverpaidRequests(),

      this.getNegativeBalances(),

      this.getInvalidCompletedRequests(),

      this.getInvalidPendingRequests(),

      this.getMissingPaymentLedgers(),

      this.getNegativeCautionBalances(),

      this.getNegativeStockBalances(),

      this.getCancelledWithoutAdjustment(),

      this.getRefundWithoutExpenseLedger(),
    ]);

    return {

      overpaid_requests:
        overpaidRequests,

      negative_balances:
        negativeBalances,

      invalid_completed_requests:
        invalidCompletedRequests,

      invalid_pending_requests:
        invalidPendingRequests,

      missing_payment_ledgers:
        missingPaymentLedgers,

      negative_caution_balances:
        negativeCautionBalances,

      negative_stock_balances:
        negativeStockBalances,

      cancelled_without_adjustment:
        cancelledWithoutAdjustment,

      refund_without_expense_ledger:
        refundWithoutExpenseLedger,
    };
  }

  /*
    Trop payé
  */

  async getOverpaidRequests() {

    const query = `

      SELECT *

      FROM service_requests

      WHERE amount_paid > total_amount

      AND is_deleted = false
    `;

    const result =
      await db.query(query);

    return result.rows;
  }

  /*
    Solde négatif
  */

  async getNegativeBalances() {

    const query = `

      SELECT *

      FROM service_requests

      WHERE (total_amount - amount_paid) < 0

      AND is_deleted = false
    `;

    const result =
      await db.query(query);

    return result.rows;
  }

  /*
    Completed incohérent
  */

  async getInvalidCompletedRequests() {

    const query = `

      SELECT *

      FROM service_requests

      WHERE status = 'completed'

      AND (total_amount - amount_paid) > 0

      AND is_deleted = false
    `;

    const result =
      await db.query(query);

    return result.rows;
  }

  /*
    Pending incohérent
  */

  async getInvalidPendingRequests() {

    const query = `

      SELECT *

      FROM service_requests

      WHERE status = 'pending'
      
      AND (total_amount - amount_paid) <= 0

      AND is_deleted = false
    `;

    const result =
      await db.query(query);

    return result.rows;
  }

  /*
    Paiement sans ledger
  */

  async getMissingPaymentLedgers() {

    const query = `

      SELECT cp.*

      FROM customer_payments cp

      LEFT JOIN financial_ledger fl
      ON fl.payment_id = cp.id

      WHERE fl.id IS NULL

      AND cp.is_deleted = false
    `;

    const result =
      await db.query(query);

    return result.rows;
  }

  /*
    Caution négative
  */

  async getNegativeCautionBalances() {

    const query = `

      SELECT *

      FROM cautions

      WHERE amount_remaining < 0

      AND is_deleted = false
    `;

    const result =
      await db.query(query);

    return result.rows;
  }

  /*
    Stock négatif
  */

  async getNegativeStockBalances() {

    const query = `

      SELECT *

      FROM stocks

      WHERE amount_remaining < 0

      AND is_deleted = false
    `;

    const result =
      await db.query(query);

    return result.rows;
  }

  /*
    Ticket annulé
    sans adjustment
  */

  async getCancelledWithoutAdjustment() {

    const query = `

      SELECT sri.*

      FROM service_request_items sri

      LEFT JOIN ticket_adjustments ta
      ON ta.item_id = sri.id

      WHERE sri.item_status = 'cancelled'

      AND ta.id IS NULL

      AND sri.is_deleted = false
    `;

    const result =
      await db.query(query);

    return result.rows;
  }

  /*
    Refund sans ledger expense
  */

  async getRefundWithoutExpenseLedger() {

    const query = `

      SELECT cp.*

      FROM customer_payments cp

      LEFT JOIN financial_ledger fl
      ON fl.payment_id = cp.id
      AND fl.direction = 'expense'

      WHERE cp.payment_type = 'refund'

      AND fl.id IS NULL

      AND cp.is_deleted = false
    `;

    const result =
      await db.query(query);

    return result.rows;
  }
}