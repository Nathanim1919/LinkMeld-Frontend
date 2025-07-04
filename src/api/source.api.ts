import axios from "axios";

export const getSources = async (): Promise<{
  siteNames: string[];
  siteNameCounts?: Record<string, number>;
}> => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/sources",{
      withCredentials: true
    });
    if (!response.data || !Array.isArray(response.data.siteNames)) {
      throw new Error("Failed to fetch sources");
    }
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching sources:", error);
    throw error;
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
