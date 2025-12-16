import express from 'express';
import { authenticate } from './auth/auth.middleware';
import * as reports from './reporting/reports.controller';
import { requireReportPermission } from './reporting/guards/report-state.guard';

const router = express.Router();

router.post('/reporting/reports', authenticate, reports.create);
router.put('/reporting/reports/:reportId', authenticate, requireReportPermission('edit'), reports.update);
router.post('/reporting/reports/:reportId/finalize', authenticate, requireReportPermission('finalize'), reports.finalize);
router.post('/reporting/reports/:reportId/addendum', authenticate, requireReportPermission('addendum'), reports.addendum);

export default router;
