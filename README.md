# MediConnect - Healthcare Management Ecosystem

MediConnect is a comprehensive healthcare management platform that connects patients, doctors, and clinic administrators through a unified digital ecosystem.

## 🏥 Overview

MediConnect provides an end-to-end solution for modern healthcare management with:
- **Patient Mobile App**: Book appointments, manage health records, consult doctors
- **Doctor Mobile App**: Manage schedule, conduct consultations, handle patients
- **Admin Panel**: Centralized management console for clinic operations

## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Patient Features
- 📱 User Registration & Authentication
- 👨‍⚕️ Search & Browse Doctors
- 📅 Book & Manage Appointments
- 💊 Access Medical Records & Prescriptions
- 💳 Integrated Payment System
- 🔔 Push Notifications & Reminders
- 💬 Chat with Doctors
- ⭐ Rate & Review Doctors

### Doctor Features
- 🔐 Doctor Registration & Verification
- 📊 Schedule Management
- 👥 Patient Management
- 📝 Prescription Writing
- 🎥 Video Consultations
- 💰 Earnings Dashboard
- 📈 Analytics & Reports

### Admin Features
- 🎯 Dashboard with Real-time Analytics
- 👨‍⚕️ Doctor Management (CRUD)
- 📅 Appointment Management
- 👤 User/Patient Management
- 📊 Reports & Analytics
- ⚙️ System Settings
- 💾 Backup & Restore
- ✅ Verification & Approval Workflow

## 🏗️ Architecture

MediConnect follows a modern microservices architecture with three main components:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Patient App    │    │   Doctor App    │    │   Admin Panel   │
│  (React Native) │    │  (React Native) │    │   (React.js)    │
└────────┬────────┘    └────────┬────────┘    └────────┬────────┘
         │                      │                       │
         └──────────────────────┼───────────────────────┘
                                │
                         REST API / WebSocket
                                │
                    ┌───────────▼──────────┐
                    │   Backend Services   │
                    │  (Node.js + Express) │
                    └───────────┬──────────┘
                                │
                    ┌───────────┴──────────┐
                    │   MongoDB Database   │
                    └──────────────────────┘
```

For detailed architecture documentation, see:
- [Complete Ecosystem Architecture](./COMPLETE_ECOSYSTEM_ARCHITECTURE.md) - Full system architecture
- [Admin Panel Architecture](./ARCHITECTURE.md) - Admin panel specific architecture

## 🛠️ Technology Stack

### Frontend
- **React.js** - Admin panel web interface
- **React Native** - Cross-platform mobile apps (Coming Soon)
- **Material-UI** - Component library
- **Chart.js** - Data visualization
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Socket.IO** - Real-time communication (Coming Soon)

### DevOps & Tools
- **Git** - Version control
- **Docker** - Containerization (Coming Soon)
- **MongoDB Atlas** - Cloud database (Production)

## 📁 Project Structure

```
MediConnect/
├── backend/                  # Backend API Server
│   ├── src/
│   │   ├── models/          # Mongoose models
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   └── config/          # Configuration files
│   ├── server.js            # Entry point
│   ├── package.json
│   └── .env.example
│
├── medibuddy/               # Frontend Admin Panel
│   ├── public/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── context/         # React context
│   │   └── theme.js         # MUI theme
│   ├── package.json
│   └── .env.example
│
├── ARCHITECTURE.md          # Admin panel architecture
├── COMPLETE_ECOSYSTEM_ARCHITECTURE.md  # Full system architecture
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mediconnect
JWT_SECRET=your_secret_key
```

5. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd medibuddy
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm start
```

The admin panel will open at `http://localhost:3000`

### Initial Admin Setup

1. First, start the backend server
2. Create initial admin account by making a POST request:
```bash
curl -X POST http://localhost:5000/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@mediconnect.com",
    "password": "admin123"
  }'
```

3. Login with these credentials at `http://localhost:3000/login`

## 📚 Documentation

- [Complete Ecosystem Architecture](./COMPLETE_ECOSYSTEM_ARCHITECTURE.md) - Comprehensive system architecture
- [Admin Panel Architecture](./ARCHITECTURE.md) - Detailed admin panel documentation
- [Backend API Documentation](./backend/README.md) - API endpoints and usage
- Mobile Apps - Coming Soon

## 🎨 Design Theme

MediConnect uses a vibrant color scheme:
- **Primary Color**: Orange (#FF6B35) - Energy and warmth
- **Secondary Color**: Emerald (#10B981) - Health and growth
- **Background**: Light gray (#F9FAFB) - Clean and modern

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation and sanitization
- Secure file upload handling
- Environment-based configuration

## 🚧 Development Status

### Completed ✅
- Backend API architecture
- Admin authentication system
- Doctor management (CRUD)
- Appointment management
- User management
- Dashboard with analytics
- Database models and schemas
- Admin panel UI framework
- Landing page

### In Progress 🔄
- Complete admin panel features
- Mobile applications (Patient & Doctor)
- Video consultation integration
- Payment gateway integration
- Real-time notifications

### Planned 📋
- Advanced analytics
- Multi-language support
- Telemedicine features
- AI-powered recommendations
- Wearables integration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Material-UI for the component library
- Chart.js for data visualization
- MongoDB for the database solution
- All contributors and supporters

## 📞 Support

For support, email support@mediconnect.com or create an issue in the repository.

---

**Note**: This project is currently in active development. The mobile applications are planned for future releases. The admin panel serves as the management console for the entire MediConnect ecosystem.