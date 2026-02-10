# Backend API Routes - Complete List

## ✅ All Required APIs Are Now Implemented

### 1. Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### 2. Appointments Routes (`/api/appointments`)
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/:id` - Get appointment by ID
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment
- `GET /api/appointments/time-slots` - Get available time slots
- `PUT /api/appointments/:id/reschedule` - Reschedule appointment

### 3. Prescriptions Routes (`/api/prescriptions`)
- `GET /api/prescriptions` - Get all prescriptions
- `POST /api/prescriptions` - Create prescription
- `GET /api/prescriptions/:id` - Get prescription by ID
- `PUT /api/prescriptions/:id` - Update prescription
- `GET /api/prescriptions/patient/:patientId` - Get patient prescriptions
- `GET /api/prescriptions/doctor/:doctorId` - Get doctor prescriptions

### 4. Medical Records Routes (`/api/records`)
- `GET /api/records` - Get all records
- `POST /api/records` - Create record
- `GET /api/records/:id` - Get record by ID
- `PUT /api/records/:id` - Update record
- `GET /api/records/patient/:patientId` - Get patient records
- `GET /api/records/doctor/:doctorId` - Get doctor records
- `POST /api/records/:id/upload` - Upload file

### 5. Doctors Routes (`/api/doctors`)
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/:id/availability` - Get doctor availability
- `PUT /api/doctors/:id` - Update doctor profile
- `GET /api/doctors/:id/appointments` - Get doctor appointments

### 6. Patients Routes (`/api/patients`)
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient profile
- `PUT /api/patients/:id` - Update patient profile
- `GET /api/patients/:id/medical-history` - Get medical history
- `GET /api/patients/:id/prescriptions` - Get patient prescriptions
- `GET /api/patients/:id/appointments` - Get patient appointments

### 7. Dashboard Routes (`/api/dashboard`)
- `GET /api/dashboard/stats` - Get dashboard statistics

### 8. Chatbot Routes (`/api/chatbot`)
- `POST /api/chatbot/message` - Send message to chatbot
- `GET /api/chatbot/history` - Get chat history
- `DELETE /api/chatbot/history` - Clear chat history

## 🔒 Authentication
Most routes require JWT authentication via `Authorization: Bearer <token>` header.

## 📦 Data Storage
Currently using in-memory storage (mock mode). Data persists during server runtime but resets on restart.

## 🚀 Deployment
Push to GitHub and Render will auto-deploy with all routes available.

## 🎯 Next Steps
1. Push code to GitHub ✅
2. Render auto-deploys backend
3. Netlify redeploys frontend
4. All APIs will be functional!
