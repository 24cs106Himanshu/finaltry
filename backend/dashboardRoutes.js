const express = require("express");
const router = express.Router();
const authMiddleware = require("./authMiddleware");

// Get dashboard stats
router.get("/stats", authMiddleware, (req, res) => {
  const stats = {
    patient: {
      totalAppointments: 5,
      upcomingAppointments: 2,
      activePrescriptions: 3,
      medicalRecords: 8
    },
    doctor: {
      totalPatients: 25,
      todayAppointments: 5,
      totalAppointments: 120,
      activePrescriptions: 45
    },
    admin: {
      totalUsers: 150,
      totalDoctors: 15,
      totalPatients: 135,
      todayAppointments: 25
    }
  };

  const userStats = stats[req.user.role] || stats.patient;
  res.json(userStats);
});

module.exports = router;
