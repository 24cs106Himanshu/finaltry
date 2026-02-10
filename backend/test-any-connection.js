// Test any MongoDB connection string
// Usage: node test-any-connection.js "your-connection-string"

const mongoose = require("mongoose");

const testConnection = async (uri) => {
  console.log("Testing MongoDB connection...");
  console.log("URI:", uri.replace(/:[^:@]+@/, ":****@")); // Hide password
  
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      dbName: "medicareDB",
    });
    console.log("\n✅ SUCCESS! MongoDB connected!");
    console.log("Host:", mongoose.connection.host);
    console.log("Database:", mongoose.connection.db.databaseName);
    console.log("\n🎉 This connection string works! Update your .env file with it.");
    await mongoose.connection.close();
  } catch (error) {
    console.error("\n❌ FAILED! MongoDB connection error:");
    console.error("Error:", error.message);
    
    if (error.message.includes("bad auth")) {
      console.error("\n💡 This means:");
      console.error("   - Username or password is incorrect");
      console.error("   - User doesn't exist in MongoDB Atlas");
      console.error("\n🔧 To fix:");
      console.error("   1. Go to MongoDB Atlas → Database Access");
      console.error("   2. Check your username and password");
      console.error("   3. Or create a new user");
    } else if (error.message.includes("Could not connect")) {
      console.error("\n💡 This means:");
      console.error("   - IP address not whitelisted");
      console.error("   - Network/firewall issue");
      console.error("\n🔧 To fix:");
      console.error("   1. Go to MongoDB Atlas → Network Access");
      console.error("   2. Add 0.0.0.0/0 to allow all IPs");
    }
  }
  process.exit(0);
};

// Get connection string from command line argument or use .env
const connectionString = process.argv[2] || process.env.MONGO_URI;

if (!connectionString) {
  console.error("❌ No connection string provided!");
  console.error("\nUsage:");
  console.error('  node test-any-connection.js "mongodb+srv://username:password@cluster.mongodb.net/"');
  console.error("\nOr set MONGO_URI in .env file and run:");
  console.error("  node test-any-connection.js");
  process.exit(1);
}

// Load .env if no argument provided
if (!process.argv[2]) {
  require("dotenv").config();
}

testConnection(connectionString);
