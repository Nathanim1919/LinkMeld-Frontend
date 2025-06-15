import axios from "axios";


export const getSources = async (): Promise<string[]> => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/sources");
    console.log("Fetching sources from API", response);
    if (!response.data || !Array.isArray(response.data.siteNames)) {
      throw new Error("Failed to fetch sources");
    }
    const data = response.data;
    return data.siteNames as string[];
  } catch (error) {
    console.error("Error fetching sources:", error);
    throw error;
  }
};


export const getSourceById = async (id: string): Promise<string> => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/sources/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch source with ID ${id}`);
    }
    const data = await response.json();
    return data.source as string;
  } catch (error) {
    console.error(`Error fetching source by ID ${id}:`, error);
    throw error;
  }
};
