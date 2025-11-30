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

const JobController = {
  searchJobs,
};

export default JobController;
