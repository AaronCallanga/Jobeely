import AppError from "../utils/AppError.js";
import JSearchUtil from "../utils/jsearch.api.js";

/**
 * Searches for jobs based on location and criteria.
 * @param {string} query - The job search query (e.g., "developer jobs in chicago").
 * @param {number} page - The page number to fetch.
 * @returns {object} The job search results data.
 */
const searchJobs = async (query, page = 1, country = "ph") => {
  if (!query) {
    throw new AppError("Search query cannot be empty.", 400);
  }

  // 1. Prepare and encode parameters for the API call
  const encodedQuery = encodeURIComponent(query);

  // Construct the query string required by the API
  const queryParams = `query=${encodedQuery}&page=${page}&num_pages=1&country=${country}&date_posted=all`;

  try {
    // 2. Delegate the raw fetching to the utility
    const data = await JSearchUtil.fetchJsearch(queryParams);

    // 3. Business Logic/Transformation (e.g., simplifying the data structure)
    // For simplicity, we just return the full data object here.

    return JSearchUtil.simplifyJobResponseMapper(data);
  } catch (error) {
    // Service logs the API error and throws it up to the controller/catchAsync
    console.error("Job Search Service Error:", error.message);
    throw error; // Re-throw the error for the controller/global handler
  }
};

const getSavedJobs = async (userId) => {
  const savedJobs = await SavedJob.find({ user: userId })
    .select(
      "id title company location employmentType posted isRemote salaryRange savedAt externalId"
    )
    .sort({ savedAt: -1 }); // Show most recently saved jobs first

  return savedJobs;
};

const saveJob = async (jobData, userId) => {
  // Prevent duplicates: Check if the job is already saved by this user
  const existingJob = await SavedJob.findOne({
    user: userId,
    externalId: jobData.externalId,
  });

  if (existingJob) {
    throw new AppError("This job is already saved by the user.", 409); // 409 Conflict
  }

  // Create the new document using the jobData passed from the controller
  const savedJob = await SavedJob.create({
    ...jobData,
    user: userId,
    // The rest of the fields (title, description, company, etc.) map directly from jobData
  });

  return savedJob;
};

const getSavedJobDetail = async (savedJobId) => {
  const job = await SavedJob.findById(savedJobId);

  if (!job) {
    throw new AppError(`Saved job not found with ID: ${savedJobId}`, 404);
  }
  return job;
};

const deleteSavedJob = async (savedJobId, userId) => {
  // Find and delete, ensuring the job belongs to the user for security
  const deletedJob = await SavedJob.findOneAndDelete({
    _id: savedJobId,
    user: userId,
  });

  if (!deletedJob) {
    // Not found or not owned by the user
    throw new AppError(
      `Saved job not found or does not belong to the user.`,
      404
    );
  }
};

const JobService = {
  searchJobs,
};

export default JobService;
