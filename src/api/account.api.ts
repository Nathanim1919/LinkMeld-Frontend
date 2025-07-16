import axios from "axios";

export const resetData = async (): Promise<void> => {
  const url = `http://52.156.88.58:3000/api/v1/account/reset`;

  try {
    await axios.post(url, null, {
      withCredentials: true, // Include credentials in the request
    });

    console.log(`✅ Successfully reset data:`);
    return; // Added return statement to indicate completion
  } catch (error) {
    console.error(`❌ Error resetting data:`, error);
    throw error;
  }
};

export const setGeminiApiKey = async (geminiApiKey: string): Promise<void> => {
  const url = `http://52.156.88.58:3000/api/v1/account/setGeminiApiKey`;

  try {
    await axios.post(
      url,
      { geminiApiKey },
      {
        withCredentials: true,
      }
    );

    console.log(`✅ Successfully set Gemini API key:`);
    return; // Added return statement to indicate completion
  } catch (error) {
    console.error(`❌ Error setting Gemini API key:`);
    throw error;
  }
};

export interface IUserProfile {
  userId: string;
  externalServices: {
    gemini: {
      hasApiKey: boolean;
    };
  };
}

export const getUserProfileInfo = async (): Promise<IUserProfile> => {
  const url = `http://52.156.88.58:3000/api/v1/account/profile`;

  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });
    return response.data.data; // Added return statement to indicate completion
  } catch (error) {
    console.error(`❌ Error retrieving user profile info:`, error);
    throw error;
  }
};
