import type { Capture } from "../types/Capture";
import axios from "axios";

export const getCaptures = async (): Promise<Capture[]> => {
  try {
    const response = await axios.get<Capture[]>(
      "http://localhost:3000/api/v1/captures"
    );
    console.log("Fetched captures:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching captures:", error);
    throw error;
  }
};

export const getCapturesBasedOnFilter = async (
  filter: string,
  id: string | null = null
): Promise<Capture[]> => {
  try {
    let url = "http://localhost:3000/api/v1/captures";

    switch (filter) {
      case "bookmarks":
        url = "http://localhost:3000/api/v1/captures/bookmarks";
        break;
      case "folder":
        url = "http://localhost:3000/api/v1/captures/folder";
        break;
      case "source":
        url = "http://localhost:3000/api/v1/captures/source";
        break;
      default:
        // If filter is 'all' or any other value, use the default captures endpoint
        url = "http://localhost:3000/api/v1/captures";
    }
    const response = await axios.get<Capture[]>(url);
    console.log("Fetched captures based on filter:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching captures based on filter:", error);
    throw error;
  }
};
