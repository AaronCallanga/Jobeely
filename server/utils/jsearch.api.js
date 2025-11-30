//import fetch from 'node-fetch'; // Make sure you have 'node-fetch' installed if using Node.js versions prior to 18

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

export { fetchJsearch };