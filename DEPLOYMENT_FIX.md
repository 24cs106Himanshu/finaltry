# Fix Registration Issue

## Problem
The backend is deployed but missing environment variables.

## Solution

### Step 1: Add Environment Variables to Backend

1. Go to: https://vercel.com/param-shahs-projects-b04d3345/backend/settings/environment-variables

2. Add these environment variables:

**Variable Name:** `JWT_SECRET`
**Value:** `ebdf49adbd0b13797b838e081550f3768a89084231d07c36e93862263b4b5923bf8febfd1352917480985cf87388621ad0a89e49f455adcf0b0dcf8c06c1e70b`

**Variable Name:** `MONGO_URI`
**Value:** (leave empty or add your MongoDB URI)

**Variable Name:** `NODE_ENV`
**Value:** `production`

**Variable Name:** `PORT`
**Value:** `5000`

3. Click "Save"

### Step 2: Redeploy Backend

After adding environment variables, redeploy:

```bash
cd backend
vercel --prod
```

### Step 3: Test Backend API

Visit: https://backend-dun-seven-84.vercel.app/

Should return:
```json
{
  "message": "Hospital Management Backend is running",
  "status": "OK",
  "timestamp": "..."
}
```

### Step 4: Update Frontend Environment Variable

1. Go to: https://vercel.com/param-shahs-projects-b04d3345/medicare-frontend/settings/environment-variables

2. Verify `VITE_API_URL` is set to:
```
https://backend-dun-seven-84.vercel.app/api
```

3. If not set, add it and redeploy:

```bash
cd client
vercel --prod
```

## Alternative: Quick Fix via CLI

```bash
# Set backend env vars
cd backend
vercel env add JWT_SECRET production
# Paste: ebdf49adbd0b13797b838e081550f3768a89084231d07c36e93862263b4b5923bf8febfd1352917480985cf87388621ad0a89e49f455adcf0b0dcf8c06c1e70b

vercel env add NODE_ENV production
# Type: production

vercel env add MONGO_URI production
# Press Enter (leave empty for mock mode)

# Redeploy
vercel --prod
```

After this, registration should work!
