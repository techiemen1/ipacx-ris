import { resolvePermissions } from '../../src/reporting/reports.permissions';

describe('Report Permissions', () => {
  it('allows edit in DRAFT for radiologist', () => {
    const perms = resolvePermissions('DRAFT', ['RADIOLOGIST']);
    expect(perms.canEdit).toBe(true);
  });

  it('disables edit in FINAL', () => {
    const perms = resolvePermissions('FINAL', ['RADIOLOGIST']);
    expect(perms.canEdit).toBe(false);
  });

  it('allows addendum only after FINAL', () => {
    const perms = resolvePermissions('FINAL', ['RADIOLOGIST']);
    expect(perms.canAddAddendum).toBe(true);
  });
});
