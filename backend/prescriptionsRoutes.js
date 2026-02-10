const express = require("express");
const router = express.Router();
const authMiddleware = require("./authMiddleware");

// Mock prescriptions data
let prescriptions = [];

// Get all prescriptions
router.get("/", authMiddleware, (req, res) => {
  const userPrescriptions = prescriptions.filter(
    pres => pres.patientId === req.user.id || pres.doctorId === req.user.id
  );
  res.json(userPrescriptions);
});

// Create prescription
router.post("/", authMiddleware, (req, res) => {
  const newPrescription = {
    id: Date.now().toString(),
    ...req.body,
    doctorId: req.user.id,
    status: "Active",
    prescribedDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  };
  prescriptions.push(newPrescription);
  res.status(201).json(newPrescription);
});

// Get prescription by ID
router.get("/:id", authMiddleware, (req, res) => {
  const prescription = prescriptions.find(pres => pres.id === req.params.id);
  if (!prescription) {
    return res.status(404).json({ message: "Prescription not found" });
  }
  res.json(prescription);
});

// Update prescription
router.put("/:id", authMiddleware, (req, res) => {
  const index = prescriptions.findIndex(pres => pres.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Prescription not found" });
  }
  prescriptions[index] = { ...prescriptions[index], ...req.body };
  res.json(prescriptions[index]);
});

// Get prescriptions by patient
router.get("/patient/:patientId", authMiddleware, (req, res) => {
  const patientPrescriptions = prescriptions.filter(
    pres => pres.patientId === req.params.patientId
  );
  res.json(patientPrescriptions);
});

// Get prescriptions by doctor
router.get("/doctor/:doctorId", authMiddleware, (req, res) => {
  const doctorPrescriptions = prescriptions.filter(
    pres => pres.doctorId === req.params.doctorId
  );
  res.json(doctorPrescriptions);
});

module.exports = router;
