import * as service from './reports.service';

export async function create(req, res) {
  const reportId = await service.createReport(
    req.body.studyId,
    req.user.userId
  );
  res.json({ reportId });
}

export async function update(req, res) {
  await service.updateReport(
    req.params.reportId,
    req.body.content,
    req.user.userId
  );
  res.sendStatus(204);
}

export async function finalize(req, res) {
  await service.finalizeReport(
    req.params.reportId,
    req.user.userId
  );
  res.sendStatus(204);
}

export async function addendum(req, res) {
  await service.addAddendum(
    req.params.reportId,
    req.body.content,
    req.user.userId
  );
  res.sendStatus(204);
}
