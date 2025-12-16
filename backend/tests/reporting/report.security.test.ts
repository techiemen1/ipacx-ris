import { updateReport } from '../../src/reporting/reports.service';

describe('Report Security', () => {
  const reportId = '33333333-3333-3333-3333-333333333333';
  const fakeUser = '44444444-4444-4444-4444-444444444444';

  it('rejects update by unauthorized user', async () => {
    await expect(
      updateReport(reportId, { hack: true }, fakeUser)
    ).rejects.toThrow();
  });
});
