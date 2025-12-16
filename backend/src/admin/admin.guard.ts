// admin/admin.guard.ts
export function adminOnly(req, res, next) {
  if (!req.user.roles.includes('ADMIN')) {
    return res.status(403).json({ error: 'Admin only' });
  }
  next();
}
