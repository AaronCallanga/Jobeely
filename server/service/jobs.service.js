import AppError from "../utils/AppError.js";
import { fetchJsearch } from "../utils/jsearch.api.js";

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
    const data = await fetchJsearch(queryParams);

    // 3. Business Logic/Transformation (e.g., simplifying the data structure)
    // For simplicity, we just return the full data object here.

    return simplifyJobResponse(data);
  } catch (error) {
    // Service logs the API error and throws it up to the controller/catchAsync
    console.error("Job Search Service Error:", error.message);
    throw error; // Re-throw the error for the controller/global handler
  }
};

const JobService = {
  searchJobs,
};

export default JobService;

/**
 * Transforms the verbose JSearch API response into a simplified array of job objects.
 * @param {object} apiResponse - The raw JSON object returned by the JSearch API.
 * @returns {Array<object>} A clean, simplified array of job listings.
 */
const simplifyJobResponse = (apiResponse) => {
  // 1. Initial check: Ensure the response is valid and contains a data array
  if (!apiResponse || !apiResponse.data || !Array.isArray(apiResponse.data)) {
    return [];
  }

  // 2. Map through the 'data' array with defensive checks
  return apiResponse.data.map((job) => {
    // Safeguard 1: Accessing nested property (apply_options)
    const applyLink =
      job.job_apply_link ||
      job.apply_options?.[0]?.apply_link || // Uses ?. to check job.apply_options and [0] existence
      null;

    // Safeguard 2: Accessing nested property (job_highlights.Qualifications)
    const keyQualifications = job.job_highlights?.Qualifications
      ? job.job_highlights.Qualifications.slice(0, 3)
      : []; // Defaults to an empty array

    // Safeguard 3: Shortening the description, ensuring the description exists and is a string
    const safeDescription =
      job.job_description && typeof job.job_description === "string"
        ? job.job_description.substring(0, 200) + "..."
        : "No description provided.";

    // Safeguard 4: Checking complex salary calculation fields
    const salaryRange =
      job.job_min_salary && job.job_max_salary && job.job_salary_currency
        ? `${job.job_min_salary} - ${job.job_max_salary} ${job.job_salary_currency}`
        : null;

    // Safeguard 5: Providing fallback for basic fields that might be null
    const safeEmploymentType =
      job.job_employment_type_text || job.job_employment_type || "N/A";
    const safePostedDate = job.job_posted_human_readable || "Unknown";
    const safeLocation = job.job_location || "Remote/TBD";

    // Return the simplified, flattened object
    return {
      id: job.job_id || "N/A", // Basic fallback for ID
      title: job.job_title || "Untitled Job",
      company: job.employer_name || "Anonymous Employer",
      location: safeLocation,
      employmentType: safeEmploymentType,
      isRemote: job.job_is_remote === true, // Explicit check for boolean
      posted: safePostedDate,
      logo: job.employer_logo || null,
      summary: safeDescription,
      applyUrl: applyLink,

      // Safeguard 6: Ensure required_experience is safely accessed and defaulted
      minExperience:
        job.job_required_experience?.required_experience_in_months || null,

      salaryRange: salaryRange,
      highlights: keyQualifications,
    };
  });
};
