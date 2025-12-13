# Security Model – iPacx RIS

## Authentication
- JWT-based authentication
- Role-Based Access Control (RBAC)

## Roles
- Admin
- Radiologist
- Technologist
- Reception / Billing

## Data Protection
- TLS for all services
- Encrypted secrets via environment variables
- No credentials stored in git

## Audit
- All patient access logged
- Report edits tracked
- PACS access audited
