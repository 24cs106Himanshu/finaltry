# MongoDB Connection Setup

## Current Issue
The backend is experiencing authentication errors with MongoDB Atlas.

## Troubleshooting Steps

### 1. Verify MongoDB Atlas Credentials
- Username: `MedicareAdmin`
- Password: `medicarehHMS`
- Cluster: `medicare.tywnvby.mongodb.net`

### 2. Check MongoDB Atlas Settings
Go to your MongoDB Atlas dashboard and verify:

1. **Database User**
   - Go to "Database Access"
   - Ensure user `MedicareAdmin` exists
   - Password is `medicarehHMS`
   - User has "Read and write to any database" permissions

2. **Network Access**
   - Go to "Network Access"
   - Add `0.0.0.0/0` to allow access from anywhere (for development)
   - Or add your current IP address

3. **Database Name**
   - The database will be created automatically as `medicareDB`

### 3. Connection String Formats

Try these connection strings in your `.env` file:

**Option 1 (Current):**
```
MONGO_URI=mongodb+srv://MedicareAdmin:medicarehHMS@medicare.tywnvby.mongodb.net/medicareDB?retryWrites=true&w=majority
```

**Option 2 (URL Encoded Password):**
If password has special characters, encode it:
```
MONGO_URI=mongodb+srv://MedicareAdmin:medicarehHMS@medicare.tywnvby.mongodb.net/medicareDB?retryWrites=true&w=majority
```

**Option 3 (Without Database Name):**
```
MONGO_URI=mongodb+srv://MedicareAdmin:medicarehHMS@medicare.tywnvby.mongodb.net/?retryWrites=true&w=majority
```

### 4. Test Connection
Run the test script:
```bash
node test-connection.js
```

### 5. Common Issues

**"bad auth: authentication failed"**
- Wrong username or password
- User doesn't exist in MongoDB Atlas
- User doesn't have proper permissions

**"Could not connect to any servers"**
- IP address not whitelisted
- Network/firewall issues

**"MongoServerError: user is not allowed"**
- User doesn't have permissions for the database

## Creating a New Database User

1. Go to MongoDB Atlas Dashboard
2. Click "Database Access" in the left sidebar
3. Click "Add New Database User"
4. Choose "Password" authentication
5. Username: `MedicareAdmin`
6. Password: `medicarehHMS` (or auto-generate)
7. Database User Privileges: "Atlas admin" or "Read and write to any database"
8. Click "Add User"

## Whitelisting IP Address

1. Go to MongoDB Atlas Dashboard
2. Click "Network Access" in the left sidebar
3. Click "Add IP Address"
4. Click "Allow Access from Anywhere" (0.0.0.0/0) for development
5. Click "Confirm"

## Alternative: Use Local MongoDB

If Atlas continues to have issues, install MongoDB locally:

```bash
# Install MongoDB Community Edition
# Then use this connection string:
MONGO_URI=mongodb://localhost:27017/medicareDB
```
