const express = require("express");
const router = express.Router();
const authMiddleware = require("./authMiddleware");

// Mock doctors data
const doctors = [
  {
    id: "1",
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    email: "doctor@medicare.com",
    specialization: "Cardiology",
    experience: 8,
    consultationFee: 150
  },
  {
    id: "2",
    firstName: "Dr. Michael",
    lastName: "Smith",
    email: "doctor2@medicare.com",
    specialization: "Neurology",
    experience: 12,
    consultationFee: 200
  }
];

// Get all doctors
router.get("/", (req, res) => {
  res.json(doctors);
});

// Get doctor by ID
router.get("/:id", (req, res) => {
  const doctor = doctors.find(doc => doc.id === req.params.id);
  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }
  res.json(doctor);
});

// Get doctor availability
router.get("/:id/availability", (req, res) => {
  const slots = [
    { time: "09:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: false },
    { time: "02:00 PM", available: true },
    { time: "03:00 PM", available: true },
    { time: "04:00 PM", available: true }
  ];
  res.json(slots);
});

// Update doctor profile
router.put("/:id", authMiddleware, (req, res) => {
  const index = doctors.findIndex(doc => doc.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Doctor not found" });
  }
  doctors[index] = { ...doctors[index], ...req.body };
  res.json(doctors[index]);
});

// Get doctor appointments
router.get("/:id/appointments", authMiddleware, (req, res) => {
  res.json([]);
});

module.exports = router;
