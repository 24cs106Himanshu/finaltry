const express = require("express");
const router = express.Router();
const authMiddleware = require("./authMiddleware");

// Mock appointments data
let appointments = [];

// Get all appointments
router.get("/", authMiddleware, (req, res) => {
  const userAppointments = appointments.filter(
    apt => apt.patientId === req.user.id || apt.doctorId === req.user.id
  );
  res.json(userAppointments);
});

// Create appointment
router.post("/", authMiddleware, (req, res) => {
  const newAppointment = {
    id: Date.now().toString(),
    ...req.body,
    patientId: req.user.id,
    status: "pending",
    createdAt: new Date().toISOString()
  };
  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
});

// Get appointment by ID
router.get("/:id", authMiddleware, (req, res) => {
  const appointment = appointments.find(apt => apt.id === req.params.id);
  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }
  res.json(appointment);
});

// Update appointment
router.put("/:id", authMiddleware, (req, res) => {
  const index = appointments.findIndex(apt => apt.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Appointment not found" });
  }
  appointments[index] = { ...appointments[index], ...req.body };
  res.json(appointments[index]);
});

// Delete appointment
router.delete("/:id", authMiddleware, (req, res) => {
  const index = appointments.findIndex(apt => apt.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Appointment not found" });
  }
  appointments.splice(index, 1);
  res.json({ message: "Appointment cancelled successfully" });
});

// Get time slots
router.get("/time-slots", authMiddleware, (req, res) => {
  const slots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];
  res.json(slots);
});

// Reschedule appointment
router.put("/:id/reschedule", authMiddleware, (req, res) => {
  const index = appointments.findIndex(apt => apt.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Appointment not found" });
  }
  appointments[index] = { ...appointments[index], ...req.body, status: "rescheduled" };
  res.json(appointments[index]);
});

module.exports = router;
