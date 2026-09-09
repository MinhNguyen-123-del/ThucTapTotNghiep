// Xử lý các chức năng liên quan đến tuyển sinh

const getAdmissions = (req, res) => {
    // Công dụng: lấy thông tin tuyển sinh
    res.json({
        success: true,
        message: "Thông tin tuyển sinh"
    });
};

const getAdmissionById = (req, res) => {
    // Công dụng: lấy thông tin tuyển sinh theo ID
    const id = req.params.id;

    res.json({
        success: true,
        message: `Thông tin tuyển sinh có ID: ${id}`
    });
};

module.exports = {
    getAdmissions,
    getAdmissionById
};