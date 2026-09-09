const express = require("express");

// Import Controller tuyển sinh
const admissionController = require("../controllers/admission.controller");

const router = express.Router();

// GET /api/admissions
// Công dụng: lấy danh sách thông tin tuyển sinh
router.get("/", admissionController.getAdmissions);

// GET /api/admissions/:id
// Công dụng: lấy thông tin tuyển sinh theo ID
router.get("/:id", admissionController.getAdmissionById);

module.exports = router;