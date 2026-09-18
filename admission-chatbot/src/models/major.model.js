const mongoose = require("mongoose");

// Schema lưu thông tin ngành học
const majorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    tuition: {
        type: Number
    }
});

// Tạo Model Major
module.exports = mongoose.model("Major", majorSchema);