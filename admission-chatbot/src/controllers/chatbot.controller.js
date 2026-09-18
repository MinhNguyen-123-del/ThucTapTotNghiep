const aiService = require("../services/ai.service");

const chat = async (req, res) => {
    try {
        // Lấy câu hỏi người dùng gửi lên
        const question = req.body.question;

        // Gọi AI Service xử lý
        const answer = await aiService.askAI(question);

        res.json({
            success: true,
            question: question,
            answer: answer
        });

    } catch (error) {
        // Công dụng: xử lý lỗi
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    chat
};