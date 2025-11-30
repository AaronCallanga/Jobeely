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

const ResumeController = {
  uploadResume,
  getResumeByUserId,
  getAllResumes,
};

export default ResumeController;
