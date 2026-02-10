# Quick Start Guide

## 🚀 Getting Started

### Step 1: Fix MongoDB Authentication

The backend code is ready, but you need to configure MongoDB Atlas:

1. **Go to**: https://cloud.mongodb.com
2. **Login** to your MongoDB Atlas account
3. **Select your project** (Medicare)

### Step 2: Create/Verify Database User

1. Click **"Database Access"** in the left sidebar
2. Click **"Add New Database User"** (or edit existing)
3. Set credentials:
   - **Username**: `MedicareAdmin`
   - **Password**: `medicarehHMS`
   - **Authentication Method**: Password
4. Set **Database User Privileges**: 
   - Choose "Built-in Role"
   - Select **"Atlas admin"** or **"Read and write to any database"**
5. Click **"Add User"** or **"Update User"**

### Step 3: Whitelist Your IP Address

1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"**
   - This adds `0.0.0.0/0` to the whitelist
4. Click **"Confirm"**

### Step 4: Wait for Changes to Propagate

⏱️ Wait **1-2 minutes** for MongoDB Atlas to apply the changes.

### Step 5: Test the Connection

```bash
cd backend
node test-connection.js
```

You should see:
```
✅ MongoDB connected successfully!
Database: medicareDB
```

### Step 6: Start the Server

```bash
npm start
```

You should see:
```
Server running on port 5000
Environment: development
MongoDB connected successfully: medicare-shard-00-01.tywnvby.mongodb.net
Database: medicareDB
```

### Step 7: Test Registration

Open a new terminal and run:

```bash
node test-register.js
```

Or use curl:

```bash
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"password\":\"password123\",\"role\":\"patient\"}"
```

## 🎯 Expected Response

Successful registration:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

## 🔧 Troubleshooting

### "bad auth: authentication failed"
- Username or password is incorrect in MongoDB Atlas
- User doesn't exist
- User doesn't have proper permissions
- **Solution**: Double-check Step 2 above

### "Could not connect to any servers"
- IP address not whitelisted
- Network/firewall blocking connection
- **Solution**: Complete Step 3 above

### "User already exists"
- Email is already registered
- **Solution**: Use a different email or delete the user from MongoDB

### Server won't start
- Port 5000 is already in use
- **Solution**: Change PORT in `.env` file or kill the process using port 5000

## 📚 Additional Resources

- `MONGODB_SETUP.md` - Detailed MongoDB configuration guide
- `FIXES_APPLIED.md` - List of all fixes applied to the backend
- `.env.example` - Environment variable template
- `test-connection.js` - Test MongoDB connection
- `test-register.js` - Test registration endpoint

## 🎉 You're All Set!

Once you see "MongoDB connected successfully", your backend is ready to accept registrations!
