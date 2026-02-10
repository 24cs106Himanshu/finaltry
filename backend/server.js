const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

dotenv.config();
connectDB();

const app = express();

/* ✅ ENHANCED CORS CONFIG - Allows all origins */
app.use(
  cors({
    origin: function(origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      
      // Allow all origins
      callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ 
    message: "Hospital Management Backend is running",
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api/auth", require("./authRoutes"));
app.use("/api/appointments", require("./appointmentsRoutes"));
app.use("/api/prescriptions", require("./prescriptionsRoutes"));
app.use("/api/records", require("./recordsRoutes"));
app.use("/api/doctors", require("./doctorsRoutes"));
app.use("/api/patients", require("./patientsRoutes"));
app.use("/api/dashboard", require("./dashboardRoutes"));
app.use("/api/chatbot", require("./chatbotRoutes"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
