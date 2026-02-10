# Find Your MongoDB Credentials

## 🔍 Let's Find What You Actually Have

Your backend is trying to connect with:
- Username: `MedicareAdmin`
- Password: `medicarehHMS`

But this user might not exist. Let's find what you actually have!

## 📋 Step 1: Check MongoDB Atlas

1. Open: https://cloud.mongodb.com
2. Login to your account
3. Make sure you're in the correct project

## 📋 Step 2: Find Your Database User

1. Click **"Database Access"** in the left sidebar
2. You'll see a table with your users

**What do you see?**

### Scenario A: You see a user (any username)
✅ Great! Note down the username

**Common usernames:**
- `testuser`
- `Backend`
- `MedicareAdmin`
- Your email
- Something else

### Scenario B: You don't see any users
❌ You need to create one!

Click **"+ ADD NEW DATABASE USER"** and create:
- Username: `MedicareAdmin`
- Password: `medicarehHMS`
- Role: "Atlas admin"

## 📋 Step 3: Get/Reset Password

If you have a user but don't remember the password:

1. Click **"Edit"** on the user
2. Click **"Edit Password"**
3. Enter a new password: `medicarehHMS` (or any password you want)
4. Click **"Update User"**

## 📋 Step 4: Update .env File

Open `backend/.env` and update with your actual credentials:

```env
MONGO_URI=mongodb+srv://YOUR_ACTUAL_USERNAME:YOUR_ACTUAL_PASSWORD@medicare.tywnvby.mongodb.net/medicareDB?appName=Medicare
```

**Examples:**

If your username is `testuser` and password is `password123`:
```env
MONGO_URI=mongodb+srv://testuser:password123@medicare.tywnvby.mongodb.net/medicareDB?appName=Medicare
```

If your username is `Backend` and password is `medicarepass2026`:
```env
MONGO_URI=mongodb+srv://Backend:medicarepass2026@medicare.tywnvby.mongodb.net/medicareDB?appName=Medicare
```

If you created `MedicareAdmin` with password `medicarehHMS`:
```env
MONGO_URI=mongodb+srv://MedicareAdmin:medicarehHMS@medicare.tywnvby.mongodb.net/medicareDB?appName=Medicare
```

## 📋 Step 5: Test Connection

```bash
node test-connection.js
```

## 🎯 Quick Decision Tree

```
Do you have MongoDB Atlas account?
├─ NO → Create account at cloud.mongodb.com
└─ YES → Go to Database Access
    │
    ├─ See users listed?
    │  ├─ YES → Note username, reset password if needed
    │  └─ NO → Create new user (MedicareAdmin / medicarehHMS)
    │
    └─ Update .env with correct credentials
        │
        └─ Run: node test-connection.js
            │
            ├─ ✅ Success → Run: npm start
            └─ ❌ Failed → Check Network Access (add 0.0.0.0/0)
```

## 🆘 Still Stuck?

Try this command to test any connection string:

```bash
node test-any-connection.js "mongodb+srv://username:password@medicare.tywnvby.mongodb.net/"
```

Replace `username` and `password` with different combinations until one works!

## 💡 Pro Tip

The easiest solution:
1. Go to MongoDB Atlas → Database Access
2. Delete all existing users (if any)
3. Create ONE new user:
   - Username: `MedicareAdmin`
   - Password: `medicarehHMS`
   - Role: "Atlas admin"
4. Go to Network Access → Add `0.0.0.0/0`
5. Wait 2 minutes
6. Run `node test-connection.js`
7. Should work! ✅
