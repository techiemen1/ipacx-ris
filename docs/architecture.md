# iPacx RIS – Architecture

## Overview
iPacx RIS is a modular, vendor-neutral Radiology Information System designed
to integrate with multiple PACS engines (Orthanc, dcm4chee-arc) using DICOM,
DICOMweb, and HL7/FHIR standards.

## Core Components
- Frontend: React (future)
- Backend: Node.js / FastAPI (future)
- Database: PostgreSQL
- PACS:
  - Orthanc (lightweight)
  - dcm4chee-arc (enterprise)
- Deployment: Docker + Portainer

## Design Principles
- Zero vendor lock-in
- Security by default
- Hospital-grade scalability
- Offline-friendly architecture
