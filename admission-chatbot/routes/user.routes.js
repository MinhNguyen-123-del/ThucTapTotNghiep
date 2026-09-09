const express = require("express");

// Import Controller
// Công dụng: lấy hàm xử lý User từ Controller
const userController = require("../controllers/user.controller");

const router = express.Router();

// GET /api/users
// Công dụng: gọi Controller để lấy danh sách User
router.get("/", userController.getUsers);

module.exports = router;