const express = require("express");
const router = express.Router();
const authMiddleware = require("./authMiddleware");

// Mock patients data
let patients = [];

// Get all patients
router.get("/", authMiddleware, (req, res) => {
  res.json(patients);
});

// Get patient profile
router.get("/:id", authMiddleware, (req, res) => {
  const patient = patients.find(p => p.id === req.params.id);
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }
  res.json(patient);
});

// Update patient profile
router.put("/:id", authMiddleware, (req, res) => {
  const index = patients.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Patient not found" });
  }
  patients[index] = { ...patients[index], ...req.body };
  res.json(patients[index]);
});

// Get patient medical history
router.get("/:id/medical-history", authMiddleware, (req, res) => {
  res.json([]);
});

// Get patient prescriptions
router.get("/:id/prescriptions", authMiddleware, (req, res) => {
  res.json([]);
});

// Get patient appointments
router.get("/:id/appointments", authMiddleware, (req, res) => {
  res.json([]);
});

module.exports = router;
