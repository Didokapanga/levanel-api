import { Router }
from 'express';

import { authMiddleware }
from '../middleware/auth.middleware';

import { AuditLogController }
from '../controllers/audit-log.controller';

const router = Router();

const controller =
  new AuditLogController();

router.get(
  '/',
  authMiddleware,
  controller.findAll
);

export default router;