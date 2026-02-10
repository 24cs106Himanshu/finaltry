# Complete Deployment Settings & Environment Variables

## 🎯 NETLIFY - Frontend Settings

### Build Settings
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Development Command: vite
```

### Root Directory
```
client
```

### Environment Variables
Go to: Site Settings → Environment Variables → Add Variable

```
VITE_API_URL=https://finaltry-l46x.onrender.com/api
```

### Build Configuration (netlify.toml)
Already created in `client/netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

## 🚀 RENDER - Backend Settings

### Service Type
```
Web Service
```

### Build Settings
```
Build Command: npm install
Start Command: npm start
```

### Root Directory
```
backend
```

### Environment Variables
Go to: Dashboard → Your Service → Environment → Add Environment Variable

```
JWT_SECRET=ebdf49adbd0b13797b838e081550f3768a89084231d07c36e93862263b4b5923bf8febfd1352917480985cf87388621ad0a89e49f455adcf0b0dcf8c06c1e70b

NODE_ENV=production

MONGO_URI=
(leave empty for mock mode, or add MongoDB connection string)

PORT=5000
```

### Auto-Deploy
```
✅ Enable Auto-Deploy from GitHub
Branch: main
```

---

## 📋 Step-by-Step Setup

### NETLIFY Setup:

1. **Go to Netlify Dashboard**: https://app.netlify.com
2. **Select your site**: `celadon-fenglisu-cf4178`
3. **Site Settings → Build & Deploy → Build Settings**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. **Site Settings → Build & Deploy → Environment Variables**:
   - Click "Add Variable"
   - Key: `VITE_API_URL`
   - Value: `https://finaltry-l46x.onrender.com/api`
   - Click "Save"
5. **Deploys → Trigger Deploy → Clear cache and deploy site**

### RENDER Setup:

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Select your service**: `finaltry`
3. **Environment**:
   - Click "Add Environment Variable"
   - Add each variable:
     ```
     JWT_SECRET = ebdf49adbd0b13797b838e081550f3768a89084231d07c36e93862263b4b5923bf8febfd1352917480985cf87388621ad0a89e49f455adcf0b0dcf8c06c1e70b
     NODE_ENV = production
     MONGO_URI = (leave empty)
     PORT = 5000
     ```
   - Click "Save Changes"
4. **Settings → Build & Deploy**:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `backend`
5. Render will auto-deploy from GitHub

---

## 🔗 Your URLs

**Frontend (Netlify)**: https://celadon-fenglisu-cf4178.netlify.app
**Backend (Render)**: https://finaltry-l46x.onrender.com
**GitHub Repo**: https://github.com/24cs106Himanshu/finaltry

---

## ✅ Verification Checklist

After deployment, verify:

1. **Backend Health Check**:
   - Visit: https://finaltry-l46x.onrender.com/
   - Should return: `{"message":"Hospital Management Backend is running","status":"OK"}`

2. **Frontend Loading**:
   - Visit: https://celadon-fenglisu-cf4178.netlify.app
   - Should show login page

3. **API Connection**:
   - Try registering a new account
   - Should work without errors

4. **All Features**:
   - ✅ Registration
   - ✅ Login
   - ✅ Dashboard
   - ✅ Profile
   - ✅ Appointments
   - ✅ Prescriptions
   - ✅ Medical Records

---

## 🐛 Troubleshooting

### If frontend shows API errors:
1. Check Netlify environment variable is set correctly
2. Clear cache and redeploy on Netlify
3. Check browser console for exact error

### If backend is not responding:
1. Check Render logs for errors
2. Verify all environment variables are set
3. Check if service is running (not sleeping)

### If registration fails:
1. Check backend logs on Render
2. Verify JWT_SECRET is set
3. Test backend directly: `https://finaltry-l46x.onrender.com/api/auth/register`

---

## 📝 Notes

- **Mock Mode**: Backend runs without database (data resets on restart)
- **Free Tier**: Render free tier may sleep after inactivity (takes 30s to wake up)
- **CORS**: Already configured to allow all origins
- **Auto-Deploy**: Both services auto-deploy when you push to GitHub

---

## 🎉 You're All Set!

Your hospital management system is now fully deployed and ready to use!
