const FAQ = require("../models/faq.model");
const Admission = require("../models/admission.model");

// ======================================================
// 1. Chuẩn hóa câu hỏi
// ======================================================
const normalizeQuestion = (question) => {
    return question
        .toLowerCase()
        .trim()
        .replace(/\bppgd\b/g, "phương pháp giảng dạy")
        .replace(/\bpp\b/g, "phương pháp")
        .replace(/\bđg\b/g, "đánh giá")
        .replace(/\bcntt\b/g, "công nghệ thông tin")
        .replace(/\bit\b/g, "công nghệ thông tin")
        .replace(/\bsv\b/g, "sinh viên")
        .replace(/\bgv\b/g, "giảng viên")
        .replace(/\bctdt\b/g, "chương trình đào tạo");
};


// ======================================================
// 2. Xác định Intent của câu hỏi
// ======================================================
const detectIntent = (question) => {

    // Chuẩn hóa câu hỏi
    const q = question.toLowerCase();

    // --------------------------------------------------
    // Intent: điểm chuẩn
    // --------------------------------------------------
    const scoreKeywords = [
        "điểm",
        "điểm chuẩn",
        "bao nhiêu điểm",
        "lấy bao nhiêu",
        "đậu bao nhiêu",
        "trúng tuyển"
    ];

    if (scoreKeywords.some(keyword => q.includes(keyword))) {
        return "admission_score";
    }


    // --------------------------------------------------
    // Intent: cơ hội việc làm
    // --------------------------------------------------
    const jobKeywords = [
        "việc làm",
        "cơ hội việc làm",
        "cơ hội nghề nghiệp",
        "ra trường làm gì",
        "học xong làm gì",
        "sau khi tốt nghiệp",
        "nghề nghiệp",
        "xin việc",
        "làm nghề gì",
        "công việc"
    ];

    if (jobKeywords.some(keyword => q.includes(keyword))) {
        return "job_opportunity";
    }


    // --------------------------------------------------
    // Intent: chương trình / quy trình đào tạo
    // --------------------------------------------------
    const trainingKeywords = [
        "chương trình đào tạo",
        "quy trình đào tạo",
        "chương trình học",
        "học những gì",
        "học gì",
        "được học gì",
        "các môn học",
        "ctdt"
    ];

    if (trainingKeywords.some(keyword => q.includes(keyword))) {
        return "training_program";
    }


    // --------------------------------------------------
    // Intent: phương pháp giảng dạy và đánh giá
    // --------------------------------------------------
    const teachingKeywords = [
        "phương pháp giảng dạy",
        "phương pháp dạy",
        "cách dạy",
        "giảng dạy như thế nào",
        "học như thế nào",
        "đánh giá",
        "thi như thế nào",
        "kiểm tra như thế nào",
        "ppgd"
    ];

    if (teachingKeywords.some(keyword => q.includes(keyword))) {
        return "teaching_evaluation";
    }


    // --------------------------------------------------
    // Không xác định được Intent
    // --------------------------------------------------
    return "unknown";
};

// ======================================================
// 3. Tìm FAQ theo Intent
// ======================================================
const getFAQByIntent = async (intent) => {

    const intentKeywords = {

        job_opportunity: [
            "cơ hội làm việc",
            "việc làm",
            "ra trường làm gì"
        ],

        training_program: [
            "quy trình đào tạo",
            "chương trình đào tạo",
            "đào tạo"
        ],

        teaching_evaluation: [
            "phương pháp giảng dạy",
            "đánh giá",
            "học và thi"
        ]
    };

    const keywords = intentKeywords[intent];

    if (!keywords) {
        return null;
    }

    for (const keyword of keywords) {

        const faq = await FAQ.findOne({
            question: {
                $regex: keyword,
                $options: "i"
            }
        });

        if (faq) {
            return faq.answer;
        }
    }

    return null;
};


// ======================================================
// 4. Xử lý câu hỏi chatbot
// ======================================================
const askAI = async (question) => {

    // Chuẩn hóa câu hỏi
    const normalizedQuestion = normalizeQuestion(question);

    console.log("Câu hỏi gốc:", question);
    console.log("Câu hỏi chuẩn hóa:", normalizedQuestion);

    // Xác định Intent
    const intent = detectIntent(normalizedQuestion);

    console.log("Intent:", intent);


    // ==================================================
    // 5. Nếu là câu hỏi FAQ
    // ==================================================
    if (intent !== "unknown") {

        const faqAnswer = await getFAQByIntent(intent);

        if (faqAnswer) {
            return faqAnswer;
        }
    }


    // ==================================================
    // 6. Nếu không phải FAQ → tìm thông tin tuyển sinh
    // ==================================================
    const admissions = await Admission.find()
        .populate("major");


// ======================================================
// Tìm ngành dựa trên tên hoặc mã ngành
// ======================================================
console.log("CÂU HỎI CHUẨN HÓA:", normalizedQuestion);

console.log(
    "DỮ LIỆU NGÀNH:",
    admissions.map(item => ({
        name: item.major?.name,
        code: item.major?.code
    }))
);
const admission = admissions.find(item => {

    // Nếu dữ liệu tuyển sinh chưa liên kết ngành
    // thì bỏ qua bản ghi này
    if (!item.major) {
        return false;
    }

    // Lấy tên ngành
    const majorName = item.major.name
        .toLowerCase()
        .trim();

    // Lấy mã ngành
    const majorCode = item.major.code
        ? item.major.code.toLowerCase().trim()
        : "";

    // Kiểm tra tên ngành
    const matchName = normalizedQuestion.includes(majorName);

    // Kiểm tra mã ngành
    const matchCode = majorCode &&
        normalizedQuestion.includes(majorCode);

    return matchName || matchCode;
});

    // ==================================================
    // 8. Nếu tìm thấy ngành
    // ==================================================
    if (admission) {

        // Nếu người dùng hỏi điểm
        if (intent === "admission_score") {

            return `Ngành ${admission.major.name} có điểm ${admission.score} theo phương thức ${admission.method}, chỉ tiêu ${admission.quota}.`;
        }

        // Nếu chưa xác định được Intent
        return `Ngành ${admission.major.name} có điểm ${admission.score} theo phương thức ${admission.method}, chỉ tiêu ${admission.quota}.`;
    }


    // ==================================================
    // 9. Không tìm thấy thông tin
    // ==================================================
    return "Xin lỗi, tôi chưa tìm thấy thông tin phù hợp.";
};


module.exports = {
    askAI
};