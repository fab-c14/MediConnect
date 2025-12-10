# MediConnect - Architecture Diagrams

This document provides visual representations of the MediConnect ecosystem architecture.

## System Overview Diagram

```
                    MEDICONNECT ECOSYSTEM
                    =====================

┌─────────────────────────────────────────────────────────────────────┐
│                        END USERS                                     │
│                                                                      │
│   ┌──────────┐         ┌──────────┐         ┌──────────┐          │
│   │ Patient  │         │  Doctor  │         │  Admin   │          │
│   │ (Mobile) │         │ (Mobile) │         │  (Web)   │          │
│   └──────────┘         └──────────┘         └──────────┘          │
└─────────────────────────────────────────────────────────────────────┘
        │                      │                      │
        │                      │                      │
        └──────────────────────┴──────────────────────┘
                               │
                          REST API
                               │
┌─────────────────────────────────────────────────────────────────────┐
│                     BACKEND LAYER                                    │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                  API Gateway / Load Balancer                │   │
│  └────────────────────────────────────────────────────────────┘   │
│                               │                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │              Node.js + Express Backend                      │   │
│  │                                                              │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │   │
│  │  │   Auth   │  │  Doctor  │  │  Appt    │  │  Payment │  │   │
│  │  │  Module  │  │  Module  │  │  Module  │  │  Module  │  │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │   │
│  └────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               │
┌─────────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                      │
│                                                                      │
│  ┌────────────┐    ┌────────────┐    ┌────────────┐               │
│  │  MongoDB   │    │   Redis    │    │ Cloudinary │               │
│  │  Database  │    │   Cache    │    │   Images   │               │
│  └────────────┘    └────────────┘    └────────────┘               │
└─────────────────────────────────────────────────────────────────────┘
```

## Patient Journey Flowchart

```
START: Patient Downloads App
         │
         ▼
    Registration
    (Email/Social)
         │
         ▼
   Complete Profile
   (Medical History)
         │
         ▼
  ┌──────────────────┐
  │  Home Dashboard  │
  └──────────────────┘
         │
         ├──► Browse Doctors ──┐
         │                     │
         ├──► View History     │
         │                     │
         └──► Manage Profile   │
                               │
                               ▼
                     ┌──────────────────┐
                     │  Select Doctor   │
                     └──────────────────┘
                               │
                               ▼
                     ┌──────────────────┐
                     │  Choose Slot     │
                     └──────────────────┘
                               │
                               ▼
                     ┌──────────────────┐
                     │  Make Payment    │
                     └──────────────────┘
                               │
                               ▼
                     ┌──────────────────┐
                     │  Confirmation    │
                     └──────────────────┘
                               │
                               ▼
                     ┌──────────────────┐
                     │  Get Reminders   │
                     └──────────────────┘
                               │
                               ▼
                     ┌──────────────────┐
                     │  Consultation    │
                     │  (Video/Chat)    │
                     └──────────────────┘
                               │
                               ▼
                     ┌──────────────────┐
                     │  Prescription    │
                     │  & Records       │
                     └──────────────────┘
                               │
                               ▼
                     ┌──────────────────┐
                     │  Rate & Review   │
                     └──────────────────┘
                               │
                               ▼
                            END
```

## Doctor Workflow Diagram

```
START: Doctor Registration
         │
         ▼
   Submit Documents
   (Certificates,
    Licenses)
         │
         ▼
  Admin Verification ◄──────── Admin Panel
         │
    [Rejected]───► Resubmit
         │
    [Approved]
         │
         ▼
   Set Availability
   & Schedule
         │
         ▼
  ┌──────────────────┐
  │ Doctor Dashboard │
  └──────────────────┘
         │
         ├──► View Schedule
         │
         ├──► Patient List
         │
         ├──► Earnings
         │
         └──► Settings
         │
         ▼
  Appointment Request
     (from Patient)
         │
         ▼
   ┌─────────────┐
   │ Accept?     │
   └─────────────┘
    │          │
  [No]       [Yes]
    │          │
    │          ▼
    │    Appointment
    │    Confirmed
    │          │
    │          ▼
    │    Consultation
    │    (Video/Chat)
    │          │
    │          ▼
    │    Write
    │    Prescription
    │          │
    │          ▼
    │    Complete
    │    Consultation
    │          │
    │          ▼
    │    Payment
    │    Received
    │          │
    └──────────┘
         │
         ▼
      END
```

## Admin Panel Flow

```
START: Admin Login
         │
         ▼
   ┌──────────────────┐
   │    Dashboard     │
   │                  │
   │  ┌────────────┐  │
   │  │ Statistics │  │
   │  │  - Doctors │  │
   │  │  - Patients│  │
   │  │  - Appts   │  │
   │  └────────────┘  │
   └──────────────────┘
         │
         ├─────┬─────┬─────┬─────┬─────┐
         │     │     │     │     │     │
         ▼     ▼     ▼     ▼     ▼     ▼
    ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐
    │Doc │ │Appt│ │User│ │Rep │ │Set │ │Bkp │
    │Mgmt│ │Mgmt│ │Mgmt│ │ort │ │ing │ │up  │
    └────┘ └────┘ └────┘ └────┘ └────┘ └────┘
      │      │      │      │      │      │
      │      │      │      │      │      │
   [CRUD]  [View] [View] [Gen] [Conf] [B/R]
      │      │      │      │      │      │
      ▼      ▼      ▼      ▼      ▼      ▼
   Doctor  Appt   User   Anal  Syst  Data
   List   List   List   ytics  Conf  Mgmt
```

## Data Flow - Appointment Booking

```
┌─────────────┐
│   PATIENT   │
│  Mobile App │
└──────┬──────┘
       │ 1. Select Doctor & Slot
       ▼
┌─────────────────────────────┐
│     API Gateway             │
│  POST /appointments         │
└──────┬──────────────────────┘
       │ 2. Validate Request
       ▼
┌─────────────────────────────┐
│  Appointment Controller     │
│  - Check availability       │
│  - Create appointment       │
└──────┬──────────────────────┘
       │ 3. Save Data
       ▼
┌─────────────────────────────┐
│     MongoDB                 │
│  appointments collection    │
└──────┬──────────────────────┘
       │ 4. Trigger Events
       │
       ├──► ┌─────────────────┐
       │    │ Notification    │
       │    │ Service         │
       │    └─────────────────┘
       │          │
       │          ├──► Email to Patient
       │          ├──► SMS to Patient
       │          └──► Push to Doctor
       │
       ├──► ┌─────────────────┐
       │    │ Payment         │
       │    │ Service         │
       │    └─────────────────┘
       │          │
       │          └──► Process Payment
       │
       └──► ┌─────────────────┐
            │ Admin           │
            │ Dashboard       │
            └─────────────────┘
                  │
                  └──► Update Stats
```

## Authentication Flow

```
┌──────────────┐
│    Client    │
│ (Any Device) │
└──────┬───────┘
       │ 1. Login Request
       │ (email + password)
       ▼
┌─────────────────────────────┐
│  Auth Controller            │
│                             │
│  ┌────────────────────┐    │
│  │ Validate Input     │    │
│  └─────────┬──────────┘    │
│            ▼                │
│  ┌────────────────────┐    │
│  │ Query Database     │    │
│  └─────────┬──────────┘    │
│            ▼                │
│  ┌────────────────────┐    │
│  │ Compare Password   │    │
│  │ (bcrypt)           │    │
│  └─────────┬──────────┘    │
│            ▼                │
│  ┌────────────────────┐    │
│  │ Generate JWT       │    │
│  └─────────┬──────────┘    │
└────────────┼───────────────┘
             │ 2. Return Token
             ▼
┌─────────────────────────────┐
│         Client              │
│  Store Token in:            │
│  - LocalStorage (Web)       │
│  - SecureStore (Mobile)     │
└──────┬──────────────────────┘
       │ 3. Subsequent Requests
       │ Authorization: Bearer <token>
       ▼
┌─────────────────────────────┐
│   Auth Middleware           │
│                             │
│  ┌────────────────────┐    │
│  │ Extract Token      │    │
│  └─────────┬──────────┘    │
│            ▼                │
│  ┌────────────────────┐    │
│  │ Verify Token       │    │
│  │ (JWT Secret)       │    │
│  └─────────┬──────────┘    │
│            ▼                │
│  ┌────────────────────┐    │
│  │ Attach User        │    │
│  │ to Request         │    │
│  └─────────┬──────────┘    │
└────────────┼───────────────┘
             │ 4. Allow Access
             ▼
┌─────────────────────────────┐
│    Protected Resource       │
└─────────────────────────────┘
```

## Database Schema Relationships

```
┌─────────────────────┐
│      Admins         │
│─────────────────────│
│ _id (PK)            │
│ name                │
│ email               │
│ password (hashed)   │
│ role                │
└─────────────────────┘

┌─────────────────────┐         ┌─────────────────────┐
│      Doctors        │         │   Appointments      │
│─────────────────────│         │─────────────────────│
│ _id (PK)            │←────────│ doctor (FK)         │
│ name                │    1:N  │ _id (PK)            │
│ email               │         │ patientName         │
│ phone               │         │ patientEmail        │
│ specialization      │         │ patientPhone        │
│ qualification       │         │ appointmentDate     │
│ experience          │         │ appointmentTime     │
│ consultationFee     │         │ reason              │
│ availability        │         │ status              │
│ status              │         │ notes               │
└─────────────────────┘         └─────────────────────┘

┌─────────────────────┐
│       Users         │
│─────────────────────│
│ _id (PK)            │
│ name                │
│ email               │
│ phone               │
│ dateOfBirth         │
│ gender              │
│ bloodGroup          │
│ address             │
│ status              │
└─────────────────────┘
```

## Deployment Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    PRODUCTION ENVIRONMENT                 │
└──────────────────────────────────────────────────────────┘

                    ┌──────────────┐
                    │     CDN      │
                    │ (CloudFlare) │
                    └──────┬───────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                 Load Balancer                            │
│                 (NGINX / AWS ALB)                        │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│ Backend  │  │ Backend  │  │ Backend  │
│ Server 1 │  │ Server 2 │  │ Server N │
│ (Node.js)│  │ (Node.js)│  │ (Node.js)│
└────┬─────┘  └────┬─────┘  └────┬─────┘
     │             │             │
     └─────────────┼─────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌───────────────┐     ┌───────────────┐
│   MongoDB     │     │     Redis     │
│   Atlas       │     │    Cache      │
│  (Replica Set)│     │   (Cluster)   │
└───────────────┘     └───────────────┘

┌─────────────────────────────────────────────────────────┐
│              External Services                           │
├─────────────────────────────────────────────────────────┤
│  Cloudinary  │  Twilio  │  Stripe  │  SendGrid  │ FCM  │
│   (Images)   │ (SMS/Vid)│ (Payment)│  (Email)   │(Push)│
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              Frontend Hosting                            │
├─────────────────────────────────────────────────────────┤
│  Vercel/Netlify  │     App Store    │   Play Store     │
│   (Admin Panel)  │  (iOS Patient)   │ (Android Patient)│
│                  │  (iOS Doctor)    │ (Android Doctor) │
└─────────────────────────────────────────────────────────┘
```

## Scalability Strategy

```
Current (MVP)              Future (Scale)
─────────────              ───────────────

Single Server       ──►    Multiple Servers
                           + Load Balancer

MongoDB Local       ──►    MongoDB Atlas
                           + Replica Sets
                           + Sharding

No Cache           ──►     Redis Cache
                           + Session Store

Local Storage      ──►     CDN + Cloud Storage
                           (Cloudinary/S3)

Monolith           ──►     Microservices
                           + API Gateway

Manual Deploy      ──►     CI/CD Pipeline
                           + Kubernetes
```

## Security Layers

```
┌─────────────────────────────────────────────────────────┐
│                   SECURITY LAYERS                        │
└─────────────────────────────────────────────────────────┘

Layer 1: Network Security
├── HTTPS/TLS Encryption
├── DDoS Protection
├── Firewall Rules
└── Rate Limiting

Layer 2: Application Security
├── JWT Authentication
├── RBAC (Role-Based Access)
├── Input Validation
├── SQL Injection Prevention
└── XSS Protection

Layer 3: Data Security
├── Password Hashing (bcrypt)
├── Data Encryption at Rest
├── Data Encryption in Transit
└── PII Protection

Layer 4: Compliance
├── HIPAA Compliance
├── GDPR Compliance
├── Audit Logs
└── Data Backup

Layer 5: Monitoring
├── Error Tracking (Sentry)
├── Security Monitoring
├── Intrusion Detection
└── Access Logs
```

## Technology Stack Layers

```
┌─────────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │    React     │  │ React Native │  │ React Native │ │
│  │  (Admin Web) │  │ (Patient App)│  │ (Doctor App) │ │
│  │              │  │              │  │              │ │
│  │ Material-UI  │  │ React Nav    │  │ React Nav    │ │
│  │ Chart.js     │  │ Native Base  │  │ Native Base  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   BUSINESS LOGIC LAYER                   │
│  ┌────────────────────────────────────────────────────┐ │
│  │          Node.js + Express Backend                 │ │
│  │  ┌──────────────────────────────────────────────┐ │ │
│  │  │ Controllers | Middleware | Services          │ │ │
│  │  └──────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    DATA ACCESS LAYER                     │
│  ┌────────────────────────────────────────────────────┐ │
│  │              Mongoose ODM                          │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                      │
│  ┌──────────────┐  ┌──────────────┐                    │
│  │   MongoDB    │  │    Redis     │                    │
│  │  (Primary)   │  │   (Cache)    │                    │
│  └──────────────┘  └──────────────┘                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  INFRASTRUCTURE LAYER                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │   AWS    │ │  Docker  │ │   NGINX  │ │   CI/CD  │  │
│  │   / DO   │ │ / K8s    │ │    LB    │ │  GitHub  │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## Notes

These diagrams provide a visual overview of the MediConnect ecosystem. For detailed implementation information, refer to:
- [Complete Ecosystem Architecture](./COMPLETE_ECOSYSTEM_ARCHITECTURE.md)
- [Admin Panel Architecture](./ARCHITECTURE.md)
- [Backend API Documentation](./backend/README.md)
