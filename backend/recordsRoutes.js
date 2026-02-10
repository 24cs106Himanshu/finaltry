const express = require("express");
const router = express.Router();
const authMiddleware = require("./authMiddleware");

// Mock records data
let records = [];

// Get all records
router.get("/", authMiddleware, (req, res) => {
  const userRecords = records.filter(
    rec => rec.patientId === req.user.id || rec.doctorId === req.user.id
  );
  res.json(userRecords);
});

// Create record
router.post("/", authMiddleware, (req, res) => {
  const newRecord = {
    id: Date.now().toString(),
    ...req.body,
    doctorId: req.user.id,
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  };
  records.push(newRecord);
  res.status(201).json(newRecord);
});

// Get record by ID
router.get("/:id", authMiddleware, (req, res) => {
  const record = records.find(rec => rec.id === req.params.id);
  if (!record) {
    return res.status(404).json({ message: "Record not found" });
  }
  res.json(record);
});

// Update record
router.put("/:id", authMiddleware, (req, res) => {
  const index = records.findIndex(rec => rec.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Record not found" });
  }
  records[index] = { ...records[index], ...req.body };
  res.json(records[index]);
});

// Get records by patient
router.get("/patient/:patientId", authMiddleware, (req, res) => {
  const patientRecords = records.filter(
    rec => rec.patientId === req.params.patientId
  );
  res.json(patientRecords);
});

// Get records by doctor
router.get("/doctor/:doctorId", authMiddleware, (req, res) => {
  const doctorRecords = records.filter(
    rec => rec.doctorId === req.params.doctorId
  );
  res.json(doctorRecords);
});

// Upload file
router.post("/:id/upload", authMiddleware, (req, res) => {
  res.json({ message: "File upload successful", fileUrl: "/uploads/sample.pdf" });
});

module.exports = router;
