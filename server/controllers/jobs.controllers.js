import JobService from "../service/jobs.service.js";
import catchAsync from "../utils/catchAsync.js";

const searchJobs = catchAsync(async (req, res) => {
  // 1. Controller extracts data from the request (using req.query for GET requests)
  const { query, page, country } = req.query;

  // 2. Controller delegates business logic to the service, AWAITING the result
  const results = await JobService.searchJobs(query, page, country);

  // 3. Controller sends the final HTTP response
  res.status(200).json({
    success: true,
    message: "Job search results retrieved successfully.",
    data: results, // Assuming the API response has a 'data' field
  });
});

const getJobDetail = catchAsync(async (req, res) => {
    const jobId = req.params.jobId;

    // Delegate to the service to fetch from the external API
    const jobDetail = await JobService.getJobDetailFromApi(jobId);

    res.status(200).json({
        success: true,
        message: `Detailed job view for external ID ${externalId} retrieved.`,
        data: jobDetail,
    });
});

const getSavedJobs = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const jobs = await JobService.getSavedJobs(userId);

  res.status(200).json({
    success: true,
    message: `${jobs.length} saved jobs retrieved.`,
    count: jobs.length,
    data: jobs,
  });
});

const saveJob = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const jobData = req.body;

  // Basic validation to ensure required fields are present before saving
  if (!jobData.externalId || !jobData.title || !jobData.description) {
    throw new AppError(
      "Missing required job fields (externalId, title, description) in request body.",
      400
    );
  }

  const savedJob = await JobService.saveJob(jobData, userId);

  res.status(201).json({
    success: true,
    message: "Job successfully bookmarked.",
    data: savedJob,
  });
});

const getSavedJobDetail = catchAsync(async (req, res) => {
  const savedJobId = req.params.id; // This is the MongoDB _id

  const job = await JobService.getSavedJobDetail(savedJobId);

  // Check if the job belongs to the user (optional, but good security)
  if (job.user.toString() !== req.user._id.toString()) {
    throw new AppError(
      "Access denied. Job not found or does not belong to this user.",
      403
    );
  }

  res.status(200).json({
    success: true,
    message: "Saved job details retrieved.",
    data: job, 
  });
});

const deleteSavedJob = catchAsync(async (req, res) => {
  const savedJobId = req.params.id; // This is the MongoDB _id
  const userId = req.user._id;

  await JobService.deleteSavedJob(savedJobId, userId);

  // 204 No Content is standard for successful deletion
  res.status(204).json({
    success: true,
    data: null,
    message: `Saved job with ID ${savedJobId} successfully deleted.`,
  });
});

const JobController = {
  searchJobs,
  getSavedJobs,
  saveJob,
  getSavedJobDetail,
  deleteSavedJob,
};

export default JobController;
