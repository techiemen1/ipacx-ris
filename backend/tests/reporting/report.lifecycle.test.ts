import {
  createReport,
  updateReport,
  finalizeReport,
  addAddendum
} from '../../src/reporting/reports.service';

describe('Report Lifecycle', () => {
  const studyId = '11111111-1111-1111-1111-111111111111';
  const radiologistId = '22222222-2222-2222-2222-222222222222';

  let reportId: string;

  it('creates a draft report', async () => {
    reportId = await createReport(studyId, radiologistId);
    expect(reportId).toBeDefined();
  });

  it('allows editing draft report', async () => {
    await updateReport(reportId, { findings: 'Normal' }, radiologistId);
  });

  it('finalizes report', async () => {
    await finalizeReport(reportId, radiologistId);
  });

  it('prevents editing finalized report', async () => {
    await expect(
      updateReport(reportId, { findings: 'Changed' }, radiologistId)
    ).rejects.toThrow();
  });

  it('allows addendum after finalization', async () => {
    await addAddendum(reportId, { note: 'Correction added' }, radiologistId);
  });
});
