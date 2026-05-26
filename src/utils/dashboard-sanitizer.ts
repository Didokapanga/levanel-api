export const sanitizeDashboard = (
  data: any
) => {

  return {

    /*
      KPI financiers
    */

    financial:
      data.financial,

    cancellation_losses:
      data.cancellation_losses,

    /*
      KPI opérations
    */

    operations:
      data.operations,

    payments:
      data.payments,

    requests:
      data.requests,

    /*
      Analytics
    */

    top_airlines:
      data.top_airlines,

    airline_profits:
      data.airline_profits,

    top_clients:
      data.top_clients,

    /*
      Monitoring
    */

    low_balances:
      data.low_balances,

    critical_alerts:
      data.critical_alerts,

    /*
      Graphiques
    */

    monthly_revenue:
      data.monthly_revenue,

    monthly_cashflow:
      data.monthly_cashflow,

    daily_revenue_chart:
      data.daily_revenue_chart,
  };
};