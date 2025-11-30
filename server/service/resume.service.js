import fs from "fs/promises";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import Resume from "../models/resume.model.js";
import AppError from "../utils/AppError.js";

const upload = async (file, userId) => {
  const fileBuffer = await fs.readFile(file.path);
  const parsed = await pdfParse(fileBuffer);

  const resume = await Resume.create({
    user: userId,
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

const getResumeById = async (id) => {
  const resume = await Resume.findById(id);
  return resume;
};

const deleteResumeById = async (id) => {
  // 1. Find the document and get its file path
  const resume = await Resume.findById(id);

  if (!resume) {
    // Throwing an error here lets catchAsync handle the 404 response
    throw new AppError(`Resume not found with the ID: ${id}`, 404);
  }

  const filePath = resume.filePath;

  // 2. Delete the database document first
  // If this fails, we haven't deleted the file yet.
  const deleted = await Resume.findByIdAndDelete(id);

  // Safety check, though generally redundant if findById was successful
  if (!deleted) {
    throw new AppError(`Failed to delete resume with ID: ${id}`, 500);
  }

  // 3. Delete the physical file from the file system
  if (filePath) {
    try {
      // fs.unlink is the function for deleting files. We use fs.promises.unlink for async/await.
      await fs.unlink(filePath);
    } catch (error) {
      // Log the file deletion error, but proceed (the DB record is already gone).
      // This prevents the API call from failing just because the file is missing
      // on the disk (an orphaned file situation we are trying to fix).
      console.error(`Error deleting file at path ${filePath}:`, error.message);
    }
  }
};

const ResumeService = {
  upload,
  getResumeByUserId,
  getAllResumes,
  getResumeById,
  deleteResumeById,
};

export default ResumeService;
