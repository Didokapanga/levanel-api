import { DashboardRepository }
from '../repositories/dashboard.repository';

const repository =
  new DashboardRepository();

export class DashboardService {

  /*
    Dashboard global
  */

  async getOverview() {

    const financial =
      await repository.getFinancialOverview();

    const operations =
      await repository.getOperationStats();

    const payments =
      await repository.getPaymentStats();

    const requests =
      await repository.getRequestStats();

    const topAirlines =
      await repository.getTopAirlines();

    const topClients =
      await repository.getTopClients();

    const airlineProfits =
      await repository.getProfitByAirline();

    const lowBalances =
      await repository.getLowBalances();

    const monthlyRevenue =
      await repository.getMonthlyRevenue();

    const monthlyCashflow =
      await repository.getMonthlyCashflow();

    const dailyRevenueChart =
      await repository.getDailyRevenueChart();

    const cancellationLosses =
      await repository.getCancellationLosses();

    const criticalAlerts =
      await repository.getCriticalAlerts();

    return {

      financial,

      cancellation_losses:
        cancellationLosses,

      operations,

      payments,

      requests,

      top_airlines:
        topAirlines,

      airline_profits:
        airlineProfits,

      top_clients:
        topClients,

      low_balances:
        lowBalances,

      critical_alerts:
        criticalAlerts,

      monthly_revenue:
        monthlyRevenue,

      monthly_cashflow:
        monthlyCashflow,

      daily_revenue_chart:
        dailyRevenueChart,
    };
  }

  /*
    Revenus mensuels
  */

  async getMonthlyRevenue() {

    return await repository
      .getMonthlyRevenue();
  }

  /*
    Cashflow mensuel
  */

  async getMonthlyCashflow() {

    return await repository
      .getMonthlyCashflow();
  }

  /*
    Graphique journalier
  */

  async getDailyRevenueChart() {

    return await repository
      .getDailyRevenueChart();
  }

  /*
    Profit compagnies
  */

  async getProfitByAirline() {

    return await repository
      .getProfitByAirline();
  }

  /*
    Pertes annulation
  */

  async getCancellationLosses() {

    return await repository
      .getCancellationLosses();
  }

  /*
    Alertes critiques
  */

  async getCriticalAlerts() {

    return await repository
      .getCriticalAlerts();
  }

  /*
    Top compagnies
  */

  async getTopAirlines() {

    return await repository
      .getTopAirlines();
  }

  /*
    Top clients
  */

  async getTopClients() {

    return await repository
      .getTopClients();
  }

  /*
    Balances faibles
  */

  async getLowBalances() {

    return await repository
      .getLowBalances();
  }
}