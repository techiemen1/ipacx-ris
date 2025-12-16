import { db } from '../config/database';
import { v4 as uuid } from 'uuid';
import { audit } from '../common/audit/audit';

export async function createReport(studyId: string, userId: string) {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    const reportId = uuid();

    await client.query(
      `INSERT INTO reports
       (id, study_id, current_state, current_version, created_by)
       VALUES ($1, $2, 'DRAFT', 1, $3)`,
      [reportId, studyId, userId]
    );

    await client.query(
      `INSERT INTO report_versions
       (id, report_id, version, state, content, created_by)
       VALUES ($1, $2, 1, 'DRAFT', '{}'::jsonb, $3)`,
      [uuid(), reportId, userId]
    );

    await audit(userId, 'REPORT_CREATE', reportId);

    await client.query('COMMIT');
    return reportId;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

export async function updateReport(
  reportId: string,
  content: any,
  userId: string
) {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    const { rows } = await client.query(
      `SELECT current_version, current_state FROM reports WHERE id=$1`,
      [reportId]
    );

    if (!['DRAFT', 'PRELIM'].includes(rows[0].current_state)) {
      throw new Error('Report not editable');
    }

    const newVersion = rows[0].current_version + 1;

    await client.query(
      `INSERT INTO report_versions
       (id, report_id, version, state, content, created_by)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        uuid(),
        reportId,
        newVersion,
        rows[0].current_state,
        content,
        userId
      ]
    );

    await client.query(
      `UPDATE reports SET current_version=$1, updated_at=NOW() WHERE id=$2`,
      [newVersion, reportId]
    );

    await audit(userId, 'REPORT_UPDATE', reportId);

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

export async function finalizeReport(reportId: string, userId: string) {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    const { rows } = await client.query(
      `SELECT current_version FROM reports WHERE id=$1`,
      [reportId]
    );

    await client.query(
      `UPDATE reports
       SET current_state='FINAL',
           signed_by=$1,
           signed_at=NOW()
       WHERE id=$2`,
      [userId, reportId]
    );

    await audit(userId, 'REPORT_FINALIZE', reportId);

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

export async function addAddendum(
  reportId: string,
  content: any,
  userId: string
) {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    const { rows } = await client.query(
      `SELECT current_version FROM reports WHERE id=$1`,
      [reportId]
    );

    const newVersion = rows[0].current_version + 1;

    await client.query(
      `INSERT INTO report_versions
       (id, report_id, version, state, content, created_by)
       VALUES ($1, $2, $3, 'ADDENDUM', $4, $5)`,
      [uuid(), reportId, newVersion, content, userId]
    );

    await client.query(
      `UPDATE reports SET current_version=$1 WHERE id=$2`,
      [newVersion, reportId]
    );

    await audit(userId, 'REPORT_ADDENDUM', reportId);

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}
