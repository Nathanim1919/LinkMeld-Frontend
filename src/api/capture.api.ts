import type { Capture } from "../types/Capture";
import axios from "axios";

// Strongly typed filter
export type CaptureFilter = "all" | "bookmarks" | "folder" | "source";

export const getCapturesBasedOnFilter = async (
  filter: CaptureFilter,
  id: string | null = null
): Promise<Capture[]> => {
  const baseUrl = "http://localhost:3000/api/v1";
  let url = `${baseUrl}/captures`;

  try {
    switch (filter) {
      case "bookmarks":
        url = `${baseUrl}/captures/bookmarked`;
        break;

      case "folder":
        if (!id)
          throw new Error(
            "Folder ID is required for fetching folder captures."
          );
        url = `${baseUrl}/folders/${id}/captures`;
        break;

      case "source":
        if (!id)
          throw new Error(
            "Source ID is required for fetching source captures."
          );
        url = `${baseUrl}/sources/${id}/captures`;
        break;
      case "all":
      default:
        url = `${baseUrl}/captures`;
        break;
    }

    const response = await axios.get<Capture[]>(url, {
      withCredentials: true, // Include credentials in the request
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error fetching captures based on filter:", error);
    throw error;
  }
};

export const bookMarkOrUnbookMarkCapture = async (
  captureId: string
): Promise<Capture> => {
  const url = `http://localhost:3000/api/v1/captures/${captureId}/bookmark`;

  try {
    const response = await axios.post<Capture>(url, null, {
      withCredentials: true, // Include credentials in the request
    });

    return response.data;
  } catch (error) {
    console.error(`❌ Error bookmarking or unbookmarking capture:`, error);
    throw error;
  }
};


export const searchCaptures = async (searchTerm: string): Promise<Capture[]> => {
  const url = `http://localhost:3000/api/v1/captures/search?query=${encodeURIComponent(searchTerm)}`;

  try {
    const response = await axios.get<Capture[]>(url, {
      withCredentials: true, // Include credentials in the request
    });


    console.log(`🔍 Search results for "${searchTerm}":`, response.data);

    return response.data.data;
  } catch (error) {
    console.error(`❌ Error searching captures:`, error);
    throw error;
  }
}



export const getCaptureById  = async (captureId: string): Promise<Capture | null> => {
  const url = `http://localhost:3000/api/v1/captures/${captureId}`;

  try {
    const response = await axios.get<Capture>(url, {
      withCredentials: true, // Include credentials in the request
    });

    console.log(`📄 Capture fetched by ID ${captureId}:`, response.data);

    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching capture by ID ${captureId}:`, error);
    return null;
  }
}



export const generateSummary = async (captureId: string): Promise<Capture | null> => {
  const url = `http://localhost:3000/api/v1/ai/summary`;

  try {
    const response = await axios.post<Capture>(url, { captureId }, {
      withCredentials: true, // Include credentials in the request
    });

    console.log(`📝 Summary generated for capture ID ${captureId}:`, response.data);

    return response.data;
  } catch (error) {
    console.error(`❌ Error generating summary for capture ID ${captureId}:`, error);
    return null;
  }
};