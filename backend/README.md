# MediConnect Backend

Backend API for MediConnect Admin Panel built with Node.js, Express, and MongoDB.

## Features

- Admin authentication with JWT
- Doctor management (CRUD operations)
- Appointment management
- User/Patient management
- Dashboard analytics
- Image upload support (Cloudinary or local storage)
- RESTful API with proper HTTP status codes

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
   - Set MongoDB connection string
   - Set JWT secret
   - (Optional) Add Cloudinary credentials for cloud image storage

## Running the Server

### Development mode with auto-reload:
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Authentication
- `POST /api/auth/setup` - Initial admin setup (one-time)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin info (protected)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics (protected)

### Doctors
- `GET /api/doctors` - Get all doctors (protected)
- `GET /api/doctors/:id` - Get single doctor (protected)
- `POST /api/doctors` - Create doctor (protected, with file upload)
- `PUT /api/doctors/:id` - Update doctor (protected, with file upload)
- `DELETE /api/doctors/:id` - Delete doctor (protected)

### Appointments
- `GET /api/appointments` - Get all appointments (protected)
- `GET /api/appointments/upcoming` - Get upcoming appointments (protected)
- `GET /api/appointments/:id` - Get single appointment (protected)
- `POST /api/appointments` - Create appointment (protected)
- `PUT /api/appointments/:id` - Update appointment (protected)
- `DELETE /api/appointments/:id` - Delete appointment (protected)

### Users
- `GET /api/users` - Get all users (protected)
- `GET /api/users/:id` - Get single user (protected)
- `POST /api/users` - Create user (protected, with file upload)
- `PUT /api/users/:id` - Update user (protected, with file upload)
- `DELETE /api/users/:id` - Delete user (protected)

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Image Upload

The API supports image uploads for doctor and user avatars. If Cloudinary credentials are provided in `.env`, images will be uploaded to Cloudinary. Otherwise, they will be stored locally in the `uploads/` folder.

## Database Schema

### Admin
- name, email, password, role, avatar

### Doctor
- name, email, phone, specialization, qualification, experience, consultationFee, avatar, address, availability, timings, status

### Appointment
- patientName, patientEmail, patientPhone, doctor (ref), appointmentDate, appointmentTime, reason, status, notes

### User
- name, email, phone, dateOfBirth, gender, bloodGroup, address, avatar, status
