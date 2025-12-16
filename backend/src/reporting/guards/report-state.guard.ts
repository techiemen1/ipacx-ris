// reporting/guards/report-state.guard.ts
import { Request, Response, NextFunction } from 'express';
import { REPORT_STATE_RULES } from '../reports.state';
import { getReportState } from '../reports.service';

export function requireReportPermission(action: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const reportId = req.params.reportId;
    const user = req.user!;

    const state = await getReportState(reportId);

    const allowedRoles = REPORT_STATE_RULES[state]?.[action] || [];
    const ok = user.roles.some(r => allowedRoles.includes(r));

    if (!ok) {
      return res.status(403).json({
        error: `Action ${action} not allowed in state ${state}`
      });
    }

    next();
  };
}
