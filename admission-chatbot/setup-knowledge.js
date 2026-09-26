require("dotenv").config();

const fs = require("fs");
const path = require("path");

const API_KEY = process.env.GEMINI_API_KEY;

const KNOWLEDGE_STORE =
    "fileSearchStores/admissionchatbotknowledge-rmcp8tdse8g1";

const knowledgeDir =
    path.join(__dirname, "knowledge");


async function uploadFile(fileName) {

    const filePath =
        path.join(knowledgeDir, fileName);

    const fileBuffer =
        fs.readFileSync(filePath);

    const fileSize =
        fileBuffer.length;


    console.log("\n--------------------------------");
    console.log("Đang upload:", fileName);
    console.log("Dung lượng:", fileSize, "bytes");


    // ============================================
    // 1. START RESUMABLE UPLOAD
    // ============================================

    const startUrl =
        `https://generativelanguage.googleapis.com/upload/v1beta/${KNOWLEDGE_STORE}:uploadToFileSearchStore?key=${API_KEY}`;


    const startResponse =
        await fetch(startUrl, {
            method: "POST",

            headers: {
                "X-Goog-Upload-Protocol":
                    "resumable",

                "X-Goog-Upload-Command":
                    "start",

                "X-Goog-Upload-Header-Content-Length":
                    String(fileSize),

                "X-Goog-Upload-Header-Content-Type":
                    "text/plain",

                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                displayName: fileName
            })
        });


    console.log(
        "START status:",
        startResponse.status
    );


    if (!startResponse.ok) {

        const errorText =
            await startResponse.text();

        throw new Error(
            `Không thể khởi tạo upload ${fileName}:\n${errorText}`
        );
    }


    // ============================================
    // 2. LẤY UPLOAD URL
    // ============================================

    const uploadUrl =
        startResponse.headers.get(
            "x-goog-upload-url"
        );


    if (!uploadUrl) {

        throw new Error(
            "Google không trả về x-goog-upload-url."
        );
    }


    console.log(
        "Upload URL đã nhận."
    );


    // ============================================
    // 3. UPLOAD + FINALIZE
    // ============================================

    const uploadResponse =
        await fetch(uploadUrl, {

            method: "POST",

            headers: {

                "Content-Length":
                    String(fileSize),

                "X-Goog-Upload-Offset":
                    "0",

                "X-Goog-Upload-Command":
                    "upload, finalize",

                "Content-Type":
                    "text/plain"
            },

            body: fileBuffer
        });


    console.log(
        "UPLOAD status:",
        uploadResponse.status
    );


    const responseText =
        await uploadResponse.text();


    if (!uploadResponse.ok) {

        throw new Error(
            `Upload ${fileName} thất bại:\n${responseText}`
        );
    }


    console.log(
        "✓ Upload thành công:",
        fileName
    );

    console.log(
        "Google response:",
        responseText
    );
}


// ============================================
// MAIN
// ============================================

async function setupKnowledge() {

    try {

        console.log("================================");
        console.log("UPLOAD KNOWLEDGE BASE - REST");
        console.log("================================");


        if (!API_KEY) {

            throw new Error(
                "Không tìm thấy GEMINI_API_KEY trong .env"
            );
        }


        const files =
            fs.readdirSync(knowledgeDir)
                .filter(
                    file =>
                        file
                            .toLowerCase()
                            .endsWith(".txt")
                );


        console.log(
            `\nTìm thấy ${files.length} tài liệu:\n`
        );


        files.forEach(file => {
            console.log(" -", file);
        });


        // Upload tuần tự
        for (const fileName of files) {

            await uploadFile(fileName);

        }


        console.log("\n================================");
        console.log("KNOWLEDGE BASE HOÀN TẤT");
        console.log("================================");

        console.log(
            "\nKnowledge Store:"
        );

        console.log(
            KNOWLEDGE_STORE
        );

        console.log(
            "\nSố tài liệu:",
            files.length
        );


    } catch (error) {

        console.error("\n================================");
        console.error("RAG SETUP ERROR");
        console.error("================================");

        console.error(error.message);

    }
}


setupKnowledge();