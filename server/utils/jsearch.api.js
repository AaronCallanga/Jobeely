/**
 * Executes a search query against the JSearch API.
 * @param {string} queryParams - The full query string for the API path (e.g., "query=developer jobs&page=1").
 * @returns {object} The parsed JSON response data.
 */
const fetchJsearch = async (queryParams) => {
  // IMPORTANT: Use environment variables for sensitive data like API keys!
  const BASE_URL = "https://jsearch.p.rapidapi.com/search";

  // Construct the full URL
  const url = `${BASE_URL}?${queryParams}`;

  const options = {
    method: "GET",
    headers: {
      // Using process.env to securely load keys
      "x-rapidapi-key": process.env.JSEARCH_API_KEY,
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // Throw a meaningful error if the API call fails (e.g., 403 Forbidden)
      throw new Error(`JSearch API failed with status: ${response.status}`);
    }

    return response.json(); // Return the parsed JSON object
  } catch (error) {
    // Log the internal error and re-throw a standardized one
    console.error("JSearch API Error:", error.message);
    throw new Error("Could not fetch data from the job search provider.");
  }
};

/**
 * Transforms the verbose JSearch API response into a simplified array of job objects.
 * @param {object} apiResponse - The raw JSON object returned by the JSearch API.
 * @returns {Array<object>} A clean, simplified array of job listings.
 */
const simplifyJobResponseMapper = (apiResponse) => {
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

const JSearchUtil = {
  fetchJsearch,
  simplifyJobResponseMapper,
};

export default JSearchUtil;
