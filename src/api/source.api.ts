import axios from "axios";

export const getSources = async (): Promise<{
  siteNames: string[];
  siteNameCounts?: Record<string, number>;
}> => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/sources", {
      withCredentials: true,
      timeout: 5000, // Add timeout to prevent hanging
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log("Full API response:", response); // Debug log

    // Validate response structure
    if (!response.data || typeof response.data !== 'object') {
      throw new Error("Invalid API response structure");
    }

    // Check for success flag if your API uses it
    if (response.data.success === false) {
      throw new Error(response.data.message || "API request failed");
    }

    // Extract data from the correct property (response.data.data or response.data)
    const data = response.data.data || response.data;
    console.log("Source data:", data);

    // Validate required fields
    if (!Array.isArray(data.siteNames)) {
      throw new Error("Invalid siteNames data format");
    }

    // Return the properly formatted data
    return {
      siteNames: data.siteNames,
      siteNameCounts: data.counts || data.siteNameCounts
    };

  } catch (error) {
    console.error("Detailed error fetching sources:", error);
    
    // Handle specific error cases
    let errorMessage = "Failed to fetch sources";
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with a status code outside 2xx
        errorMessage = `API Error: ${error.response.status} - ${error.response.data?.message || 'No message'}`;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = "No response from server";
      } else {
        // Something happened in setting up the request
        errorMessage = `Request error: ${error.message}`;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};

export const getSourceById = async (id: string): Promise<string> => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/sources/${id}`, {
      withCredentials: true
    });
    if (!response.data || typeof response.data.source !== "string") {
      throw new Error("Failed to fetch source by ID");
    }
    return response.data.source;
  } catch (error) {
    console.error(`Error fetching source by ID ${id}:`, error);
    throw error;
  }
};
