import axios from "axios";

export const resetData = async (): Promise<void> => {
  const url = `http://localhost:3000/api/v1/account/reset`;

  try {
    const response = await axios.post(url, null, {
      withCredentials: true, // Include credentials in the request
    });

    console.log(`✅ Successfully reset data:`, response.data);
    return; // Added return statement to indicate completion
  } catch (error) {
    console.error(`❌ Error resetting data:`, error);
    throw error;
  }
};

export const setGeminiApiKey = async (geminiApiKey: string): Promise<void> => {
  const url = `http://localhost:3000/api/v1/account/setGeminiApiKey`;

  try {
    const response = await axios.post(
      url,
      { geminiApiKey },
      {
        withCredentials: true,
      }
    );

    console.log(`✅ Successfully set Gemini API key:`, response.data);
    return; // Added return statement to indicate completion
  } catch (error) {
    console.error(`❌ Error setting Gemini API key:`, error);
    throw error;
  }
};


export interface IUserProfile {
    userId: string,
    externalServices: {
        gemini: {
            hasApiKey: boolean
        }
    },
}

export const getUserProfileInfo = async (): Promise<IUserProfile> => {
  const url = `http://localhost:3000/api/v1/account/profile`;

  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });
    return response.data; // Added return statement to indicate completion
  } catch (error) {
    console.error(`❌ Error retrieving user profile info:`, error);
    throw error;
  }
};
