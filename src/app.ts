import express from 'express';
import cors from 'cors';

import {
  swaggerUi,
  swaggerSpec,
} from './config/swagger';

import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import clientRoutes from './routes/client.routes';
import serviceRoutes from './routes/service.routes';
import systemRoutes from './routes/system.routes';
import airlineRoutes from './routes/airline.routes';
import partnerRoutes from './routes/partner.routes';
import contractRoutes from './routes/contract.routes';
import cautionRoutes from './routes/caution.routes';
import stockRoutes from './routes/stock.routes';
import serviceRequestRoutes from './routes/service-request.routes';
import serviceRequestItemRoutes from './routes/service-request-item.routes';
import customerPaymentRoutes from './routes/customer-payment.routes';
import financialLedgerRoutes from './routes/financial-ledger.routes';
import ticketAdjustmentRoutes from './routes/ticket-adjustment.routes';
import auditLogRoutes from './routes/audit-log.routes';
import dashboardRoutes from './routes/dashboard.routes';
import financialConsistencyRoutes from './routes/financial-consistency.routes';

import { errorMiddleware } from './middleware/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.json({
    message: 'Docker Hot Reload Working',
  });
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/systems', systemRoutes);
app.use('/api/airlines', airlineRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/cautions', cautionRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/service-requests', serviceRequestRoutes);
app.use('/api/service-request-items', serviceRequestItemRoutes);
app.use('/api/customer-payments', customerPaymentRoutes);
app.use('/api/financial-ledger', financialLedgerRoutes);
app.use('/api/ticket-adjustments', ticketAdjustmentRoutes);
app.use('/api/audit-logs', auditLogRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/financial-consistency', financialConsistencyRoutes);

app.use(errorMiddleware);

export default app;