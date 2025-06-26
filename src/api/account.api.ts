import axios from "axios";
import type { Capture } from "../types/Capture";

export const resetData = async (
): Promise<void> => {
  const url = `http://localhost:3000/api/v1/account/reset`;

  try {
    const response = await axios.post<Capture>(url, null, {
      withCredentials: true, // Include credentials in the request
    });

    console.log(`✅ Successfully reset data:`, response.data);
    return response.data;

  } catch (error) {
    console.error(`❌ Error resetting data:`, error);
    throw error;
  }
};