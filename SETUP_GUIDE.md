# MediConnect - Quick Setup Guide

This guide will help you set up and run the MediConnect Admin Panel on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** (comes with Node.js)
- **Git** (for cloning the repository)

## Quick Start (5 Minutes)

### Step 1: Clone the Repository

```bash
git clone https://github.com/fab-c14/MediConnect.git
cd MediConnect
```

### Step 2: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start MongoDB (if not running)
# On Windows: Run MongoDB as a service or use MongoDB Compass
# On macOS/Linux: 
sudo systemctl start mongod
# or
brew services start mongodb-community

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

**Expected Output:**
```
Server running in development mode on port 5000
MongoDB Connected: localhost
```

### Step 3: Setup Frontend (In a new terminal)

```bash
# Navigate to frontend directory (from project root)
cd mediconnect

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the development server
npm start
```

The admin panel will open automatically at `http://localhost:3000`

### Step 4: Create Initial Admin Account

Before logging in, you need to create an admin account. Use one of these methods:

**Method 1: Using cURL**
```bash
curl -X POST http://localhost:5000/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@mediconnect.com",
    "password": "admin123"
  }'
```

**Method 2: Using Postman or Thunder Client**
- URL: `POST http://localhost:5000/api/auth/setup`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "name": "Admin",
  "email": "admin@mediconnect.com",
  "password": "admin123"
}
```

**Method 3: Using Browser Console**
```javascript
fetch('http://localhost:5000/api/auth/setup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Admin',
    email: 'admin@mediconnect.com',
    password: 'admin123'
  })
}).then(r => r.json()).then(console.log);
```

### Step 5: Login

Go to `http://localhost:3000/login` and use:
- **Email**: `admin@mediconnect.com`
- **Password**: `admin123`

🎉 **Success!** You should now see the MediConnect Dashboard.

---

## Detailed Setup

### Backend Configuration

Edit `backend/.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration (Local)
MONGODB_URI=mongodb://localhost:27017/mediconnect

# JWT Configuration
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d

# Cloudinary Configuration (Optional - for cloud image storage)
# If not provided, images will be stored locally
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Admin Configuration
ADMIN_EMAIL=admin@mediconnect.com
ADMIN_PASSWORD=admin123

# CORS Configuration
CLIENT_URL=http://localhost:3000
```

### Frontend Configuration

Edit `mediconnect/.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Using MongoDB Atlas (Cloud Database)

If you prefer to use MongoDB Atlas instead of local MongoDB:

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `backend/.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mediconnect?retryWrites=true&w=majority
```

---

## Testing the Application

### 1. Backend Health Check

Visit: `http://localhost:5000/api/health`

Expected Response:
```json
{
  "success": true,
  "message": "MediConnect API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Frontend Pages

- **Landing Page**: `http://localhost:3000/`
- **Login Page**: `http://localhost:3000/login`
- **Dashboard**: `http://localhost:3000/dashboard` (after login)

### 3. Test API Endpoints

After logging in, you can test these endpoints:

**Get Dashboard Stats:**
```bash
curl -X GET http://localhost:5000/api/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Get Doctors List:**
```bash
curl -X GET http://localhost:5000/api/doctors \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Common Issues & Solutions

### Issue 1: MongoDB Connection Error

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017`

**Solution:**
- Make sure MongoDB is running: `sudo systemctl status mongod`
- Start MongoDB: `sudo systemctl start mongod`
- Or use MongoDB Atlas (cloud database)

### Issue 2: Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
- Change the port in `backend/.env`: `PORT=5001`
- Or kill the process using port 5000:
  ```bash
  # On Linux/Mac
  lsof -ti:5000 | xargs kill -9
  
  # On Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### Issue 3: CORS Error

**Error:** `Access to fetch at 'http://localhost:5000/api/...' has been blocked by CORS policy`

**Solution:**
- Make sure `CLIENT_URL` in `backend/.env` matches your frontend URL
- Restart the backend server after changing .env

### Issue 4: Module Not Found

**Error:** `Error: Cannot find module 'express'`

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 5: Admin Already Exists

**Error:** `Admin already exists. Please login.`

**Solution:**
- This means the initial admin was already created
- You can login with the existing credentials
- Or drop the database and start fresh:
  ```bash
  mongo
  use mediconnect
  db.dropDatabase()
  ```

---

## Development Workflow

### Backend Development

```bash
cd backend

# Start with auto-reload
npm run dev

# View logs in console
```

### Frontend Development

```bash
cd mediconnect

# Start development server
npm start

# Build for production
npm run build
```

### Database Management

**View Data (MongoDB Compass):**
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect to `mongodb://localhost:27017`
3. Browse the `mediconnect` database

**MongoDB Shell:**
```bash
# Connect to MongoDB
mongo

# Select database
use mediconnect

# View collections
show collections

# View admins
db.admins.find().pretty()

# View doctors
db.doctors.find().pretty()

# Clear all data
db.dropDatabase()
```

---

## Next Steps

After successful setup:

1. **Explore the Dashboard**
   - View statistics and charts
   - Navigate through different sections

2. **Add Doctors**
   - Go to Doctors section
   - Add sample doctor profiles

3. **Create Appointments**
   - Go to Appointments section
   - Create test appointments

4. **Add Users/Patients**
   - Go to Users section
   - Add patient records

5. **Customize the Theme**
   - Edit `mediconnect/src/theme.js`
   - Change colors and styles

6. **Explore the Code**
   - Backend: `backend/src/`
   - Frontend: `mediconnect/src/`

---

## Production Deployment

For production deployment guidelines, see:
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Deployment architecture
- [COMPLETE_ECOSYSTEM_ARCHITECTURE.md](./COMPLETE_ECOSYSTEM_ARCHITECTURE.md) - Full deployment guide

### Quick Production Checklist

- [ ] Change JWT_SECRET to a strong secret
- [ ] Use MongoDB Atlas for database
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Configure Cloudinary for images
- [ ] Set up proper CORS
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging
- [ ] Configure backups
- [ ] Use environment variables for all secrets

---

## Getting Help

### Documentation
- [README.md](./README.md) - Project overview
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Admin panel architecture
- [COMPLETE_ECOSYSTEM_ARCHITECTURE.md](./COMPLETE_ECOSYSTEM_ARCHITECTURE.md) - Complete system architecture
- [ARCHITECTURE_DIAGRAMS.md](./ARCHITECTURE_DIAGRAMS.md) - Visual diagrams

### API Documentation
- Backend endpoints: [backend/README.md](./backend/README.md)

### Support
- Create an issue on GitHub
- Check existing issues for solutions
- Review the documentation

---

## Success Indicators

You'll know everything is working when:

✅ Backend server starts without errors
✅ MongoDB connection is established
✅ Frontend loads at http://localhost:3000
✅ You can login successfully
✅ Dashboard displays statistics
✅ API calls work from the frontend
✅ You can create/view doctors, appointments, and users

---

## Summary

```bash
# Quick Setup Commands
git clone https://github.com/fab-c14/MediConnect.git
cd MediConnect

# Terminal 1: Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Terminal 2: Frontend
cd mediconnect
npm install
cp .env.example .env
npm start

# Terminal 3: Create Admin
curl -X POST http://localhost:5000/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@mediconnect.com","password":"admin123"}'

# Then visit: http://localhost:3000/login
```

Happy coding! 🚀
