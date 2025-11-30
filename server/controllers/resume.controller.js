import catchAsync from "../utils/catchAsync.js";
import ResumeService from "../service/resume.service.js";

const uploadResume = catchAsync(async (req, res) => {
  const file = req.file;

  const resume = await ResumeService.upload(file);

  res.status(201).json({
    success: true,
    message: "Resume uploaded and parsed!",
    data: resume,
  });
});

const getResumeByUserId = catchAsync(async (req, res) => {
  const resumes = await ResumeService.getResumeByUserId(req.params.userId);

  if (!resumes)
    return res.status(404).json({
      success: false,
      message: `No Resume Found For User ${req.params.userId}`,
    });

  res
    .status(200)
    .json({ success: true, message: "Resumes Found", data: resumes });
});

const getAllResumes = catchAsync(async (req, res) => {
  const resumes = await ResumeService.getAllResumes();

  if (!resumes)
    return res.status(404).json({ success: false, message: `No Resume Found` });

  res
    .status(200)
    .json({ success: true, message: "Resumes Found", data: resumes });
});

const getResumeById = catchAsync(async (req, res) => {
  const resume = await ResumeService.getResumeById(req.params.id);

  if (!resume)
    return res.status(404).json({ success: false, message: `No Resume Found` });

  res
    .status(200)
    .json({ success: true, message: "Resume Found", data: resume });
});

const deleteResumeById = catchAsync(async (req, res) => {
    const resumeId = req.params.id; // Assuming the ID comes from the route parameters

    // 1. Delegate deletion logic to the service (file deletion included)
    await ResumeService.deleteResumeById(resumeId);

    // 2. Send successful HTTP response (204 No Content is often used for successful deletion)
    res.status(204).json({
        success: true,
        data: null // Explicitly return null or an empty object for 204
    });
});

const ResumeController = {
  uploadResume,
  getResumeByUserId,
  getAllResumes,
  getResumeById,
  deleteResumeById
};

export default ResumeController;
