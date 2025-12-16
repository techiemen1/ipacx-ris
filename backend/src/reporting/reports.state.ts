export type ReportState = 'DRAFT' | 'PRELIM' | 'FINAL' | 'ADDENDUM';

export const REPORT_STATE_RULES = {
  DRAFT: ['edit', 'prelim'],
  PRELIM: ['edit', 'finalize'],
  FINAL: ['addendum'],
  ADDENDUM: []
};
