import catchAsync from "../utils/catchAsync.js";
import fs from "fs";
import pdfParse from "pdf-parse";
import Resume from "../models/resume.model.js"

const uploadResume = catchAsync(async (req, res) => {
    const file = req.file;

    if (!file) return res.status(400).json({success: false, message: 'No file uploaded'});

    const fileBuffer = fs.readFileSync(file.path);
    const parsed = await pdfParse(file.pdfFile);

    const resume = await Resume.create({
        user: req.user._id,
        filePath: file.path,
        fileName: file.originalname,
        fileType: file.mimeType,
        extractedText: parsed.text,
    })

    res.status(201).json({
        success: true,
        message: "Resume uploaded and parsed!",
        data: resume,
    });
})

const ResumeController = {
    uploadResume
}

export default ResumeController;