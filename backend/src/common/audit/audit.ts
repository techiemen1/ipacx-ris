import { db } from '../../config/database';
import { v4 as uuid } from 'uuid';

export async function audit(
  userId: string,
  action: string,
  reportId: string
) {
  await db.query(
    `INSERT INTO report_audit_log
     (id, user_id, action, report_id)
     VALUES ($1, $2, $3, $4)`,
    [uuid(), userId, action, reportId]
  );
}
