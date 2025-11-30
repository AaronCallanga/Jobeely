import fs from "fs";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import Resume from "../models/resume.model.js";

const upload = async (file) => {
  if (!file)
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });

  const fileBuffer = fs.readFileSync(file.path);
  const parsed = await pdfParse(fileBuffer);

  const resume = await Resume.create({
    user: req.user._id,
    filePath: file.path,
    fileName: file.originalname,
    fileType: file.mimetype,
    extractedText: parsed.text,
  });

  return resume;
};

const getResumeByUserId = async (id) => {
  const resumes = await Resume.findOne({ user: id });
  return resumes;
};

const getAllResumes = async () => {
  const resumes = await Resume.find();
  return resumes;
};

const ResumeService = {
  upload,
  getResumeByUserId,
  getAllResumes,
};

export default ResumeService;
