# Medicare Vercel Deployment Guide

This guide will help you deploy the Medicare healthcare management system to Vercel.

## 🚀 Deployment Options

### Option 1: Deploy Backend + Frontend Separately (Recommended)

#### Deploy Backend:
1. Go to [vercel.com](https://vercel.com) and login
2. Click "New Project"
3. Import your GitHub repository
4. Set **Root Directory** to `backend`
5. Add environment variables:
   - `MONGO_URI` = (leave empty for mock mode or add your MongoDB URI)
   - `JWT_SECRET` = `ebdf49adbd0b13797b838e081550f3768a89084231d07c36e93862263b4b5923bf8febfd1352917480985cf87388621ad0a89e49f455adcf0b0dcf8c06c1e70b`
   - `NODE_ENV` = `production`
6. Click "Deploy"
7. Copy your backend URL (e.g., `https://your-backend.vercel.app`)

#### Deploy Frontend:
1. Click "New Project" again
2. Import the same repository
3. Set **Root Directory** to `client`
4. Add environment variable:
   - `VITE_API_URL` = `https://your-backend.vercel.app/api`
5. Click "Deploy"

### Option 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy Backend
cd backend
vercel --prod

# Deploy Frontend
cd ../client
vercel --prod
```

## 🔧 CORS Configuration

The backend is configured to accept requests from any origin. If you need to restrict it:

1. In Vercel dashboard, go to backend project
2. Settings → Environment Variables
3. Add `CLIENT_URL` = `https://your-frontend.vercel.app`

## 🎯 Testing Your Deployment

After deployment:
1. Visit your frontend URL
2. Register a new account with your name
3. Login and check your profile
4. Test appointments, prescriptions, and records

## 🔍 Troubleshooting CORS Issues

If you get "No Access-Control-Allow-Origin" error:

### Fix 1: Update Backend CORS
The backend `server.js` is already configured with proper CORS headers. Make sure to redeploy after any changes.

### Fix 2: Check Environment Variables
In Vercel dashboard:
- Backend: Verify `JWT_SECRET` is set
- Frontend: Verify `VITE_API_URL` points to your backend

### Fix 3: Verify vercel.json
Both `backend/vercel.json` and `client/vercel.json` are configured with proper headers.

### Fix 4: Test API Directly
Visit `https://your-backend.vercel.app/` - should return:
```json
{
  "message": "Hospital Management Backend is running",
  "status": "OK",
  "timestamp": "..."
}
```

## 📱 Features

✅ Authentication with JWT
✅ Role-based dashboards (Patient/Doctor/Admin)
✅ Mock mode (no database required)
✅ Responsive design
✅ Dark/Light mode
✅ Real-time updates

## 🔒 Security

- JWT tokens expire in 24 hours
- CORS configured for production
- Environment variables secured in Vercel
- Mock mode for development/testing

## 🎨 Demo Accounts (if using mock data)

- **Patient**: `patient@medicare.com` / `password123`
- **Doctor**: `doctor@medicare.com` / `password123`
- **Admin**: `admin@medicare.com` / `password123`

Your Medicare app is now deployed and ready to use!