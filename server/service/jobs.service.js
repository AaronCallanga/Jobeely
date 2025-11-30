import AppError from "../utils/AppError.js";
import { fetchJsearch } from "../utils/jsearch.api.js";

/**
 * Searches for jobs based on location and criteria.
 * @param {string} query - The job search query (e.g., "developer jobs in chicago").
 * @param {number} page - The page number to fetch.
 * @returns {object} The job search results data.
 */
const searchJobs = async (query, page = 1, country = ph) => {
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

    return data;
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
