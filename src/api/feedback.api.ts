import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1/feedback";

// Configure axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Feedback API Service
 * Provides methods for all feedback-related operations
 */
export const FeedbackService = {
  /**
   * Submit feedback
   * @param {string} feedback - The feedback text to submit
   * @returns {Promise<void>} Resolves when feedback is successfully submitted
   * @throws {Error} If submission fails
   */
  async submit(feedbackData: {
    feedback: string;
    name?: string;
    profession?: string;
  }): Promise<void> {
    try {
      const response = await apiClient.post("/", { feedbackData });
      return response.data;
    } catch (error) {
      throw this.handleError(error, "Failed to submit feedback");
    }
  },

  /**
   * Get all feedbacks
   * @returns {Promise<string>} Resolves with the feedbacks data
   * @throws {Error} If fetching feedbacks fails
   */

  async getFeedbacks(): Promise<string> {
    try {
      const response = await apiClient.get<{ data: string }>("/getFeedbacks");
      return response.data.data;
    } catch (error) {
      throw this.handleError(error, "Failed to fetch feedbacks");
    }
  },

  /**
   * Handle API errors consistently
   * @private
   */
  handleError(error: unknown, defaultMessage: string): Error {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", {
        message: error.message,
        code: error.code,
        response: error.response?.data,
      });
      return new Error(error.response?.data?.message || defaultMessage);
    }
    console.error("Unexpected Error:", error);
    return new Error(defaultMessage);
  },
};
