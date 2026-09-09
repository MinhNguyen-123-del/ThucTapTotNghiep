const express = require("express");

const app = express();

const PORT = 3000;


// ==============================
// MIDDLEWARE
// ==============================

// Cho phép server đọc dữ liệu JSON
// từ request body
app.use(express.json());


// ==============================
// IMPORT ROUTES
// ==============================

const userRoutes = require("./routes/user.routes");
const admissionRoutes = require("./routes/admission.routes");
const chatbotRoutes = require("./routes/chatbot.routes");


// ==============================
// SỬ DỤNG ROUTES
// ==============================

// API User
app.use("/api/users", userRoutes);

// API Tuyển sinh
app.use("/api/admissions", admissionRoutes);

// API Chatbot
app.use("/api/chatbot", chatbotRoutes);


// ==============================
// API KIỂM TRA SERVER
// ==============================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Admission Chatbot API đang chạy!"
    });
});


// ==============================
// KHỞI ĐỘNG SERVER
// ==============================

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});