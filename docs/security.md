# Security Model – iPacx RIS (Phase 0)

## Scope
This document defines **infrastructure-level security controls**.
Application security will be defined in later phases.

## Core Principles
- No PHI stored outside PACS or database
- No secrets committed to Git
- Strong isolation between services
- Minimal exposed ports

## Container Security
- All services run in Docker
- No privileged containers
- Volumes explicitly defined
- Secrets via environment variables only

## Network Segmentation
- Core network: Portainer, future API gateway
- DB network: PostgreSQL only
- PACS network (future): DICOM & DICOMweb only

## Data Protection
- Database volumes isolated
- PACS storage isolated
- Backups handled via scripts
- No DICOM files in git

## Audit Readiness
- Architecture decisions recorded (ADR)
- Deployment steps documented
- Access patterns defined before implementation
