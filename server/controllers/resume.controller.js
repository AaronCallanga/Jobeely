import catchAsync from "../utils/catchAsync.js";
import fs from "fs";
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import Resume from "../models/resume.model.js"

const uploadResume = catchAsync(async (req, res) => {
    const file = req.file;

    if (!file) return res.status(400).json({success: false, message: 'No file uploaded'});

    const fileBuffer = fs.readFileSync(file.path);
    const parsed = await pdfParse(fileBuffer);

    const resume = await Resume.create({
        user: req.user._id,
        filePath: file.path,
        fileName: file.originalname,
        fileType: file.mimetype,
        extractedText: parsed.text,
    })

    res.status(201).json({
        success: true,
        message: "Resume uploaded and parsed!",
        data: resume,
    });
});

const getResumeByUserId = catchAsync(async (req, res) => {
   const resumes = await Resume.findOne({user: req.params.userId});

   if (!resumes) return res.status(404).json({success: false, message: `No Resume Found For User ${req.params.userId}`});

   res.status(200).json({success: true, message: "Resumes Found", data: resumes});
});

const getAllResumes = catchAsync(async (req, res) => {
    const resumes = await Resume.find();

    if (!resumes) return res.status(404).json({success: false, message: `No Resume Found`});

    res.status(200).json({success: true, message: "Resumes Found", data: resumes});
})

const ResumeController = {
    uploadResume,
    getResumeByUserId,
    getAllResumes
}

export default ResumeController;