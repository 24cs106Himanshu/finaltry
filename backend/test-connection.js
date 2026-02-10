const mongoose = require("mongoose");
require("dotenv").config();

const testConnection = async () => {
  console.log("Testing MongoDB connection...");
  console.log("URI:", process.env.MONGO_URI.replace(/:[^:@]+@/, ":****@")); // Hide password
  
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ MongoDB connected successfully!");
    console.log("Database:", mongoose.connection.db.databaseName);
    await mongoose.connection.close();
    console.log("Connection closed.");
  } catch (error) {
    console.error("❌ MongoDB connection failed:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    if (error.reason) {
      console.error("Reason:", error.reason);
    }
  }
  process.exit(0);
};

testConnection();
