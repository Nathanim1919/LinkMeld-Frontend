import axios, { AxiosError } from "axios";
import type { Capture } from "../types/Capture";

const API_BASE_URL = "http://localhost:3000/api/v1";

// Configure axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Strongly typed filter
export type CaptureFilter = "all" | "bookmarks" | "folder" | "source";

interface ApiResponse<T> {
  data: T;
  message?: string;
}

interface ErrorResponse {
  message: string;
  code?: string;
  details?: unknown;
}

export const CaptureService = {
  /**
   * Get captures based on filter
   * @param {CaptureFilter} filter - Filter type
   * @param {string | null} id - Optional ID for folder/source filters
   * @returns {Promise<Capture[]>} Array of captures
   * @throws {ErrorResponse} If request fails
   */
  async getCapturesBasedOnFilter(filter: CaptureFilter, id: string | null = null): Promise<Capture[]> {
    try {
      let endpoint = "/captures";
      
      switch (filter) {
        case "bookmarks":
          endpoint = "/captures/bookmarked";
          break;
        case "folder":
          if (!id) throw new Error("Folder ID is required");
          endpoint = `/folders/${id}/captures`;
          break;
        case "source":
          if (!id) throw new Error("Source ID is required");
          endpoint = `/sources/${id}/captures`;
          break;
      }

      const response = await apiClient.get<ApiResponse<Capture[]>>(endpoint);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error, "Failed to fetch captures");
    }
  },

  /**
   * Toggle bookmark status for a capture
   * @param {string} captureId - Capture ID
   * @returns {Promise<Capture>} Updated capture
   * @throws {ErrorResponse} If request fails
   */
  async toggleBookmark(captureId: string): Promise<Capture> {
    try {
      const response = await apiClient.patch<ApiResponse<Capture>>(
        `/captures/${captureId}/bookmark`
      );
      return response.data.data;
    } catch (error) {
      console.log(error)
      throw this.handleError(error, "Failed to toggle bookmark");
    }
  },

  /**
   * Search captures
   * @param {string} searchTerm - Search query
   * @returns {Promise<Capture[]>} Array of matching captures
   * @throws {ErrorResponse} If request fails
   */
  async search(searchTerm: string): Promise<Capture[]> {
    try {
      const response = await apiClient.get<ApiResponse<Capture[]>>(
        `/captures/search`,
        { params: { query: searchTerm } }
      );
      console.log("Search response:", response.data);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error, "Search failed");
    }
  },

  /**
   * Get capture by ID
   * @param {string} captureId - Capture ID
   * @returns {Promise<Capture | null>} Capture or null if not found
   */
  async getById(captureId: string): Promise<Capture | null> {
    try {
      const response = await apiClient.get<ApiResponse<Capture>>(
        `/captures/${captureId}`
      );
      return response.data.data;
    } catch (error) {
      if ((error as AxiosError).response?.status === 404) {
        return null;
      }
      throw this.handleError(error, "Failed to fetch capture");
    }
  },

  /**
   * Generate AI summary for capture
   * @param {string} captureId - Capture ID
   * @returns {Promise<{success: boolean, data?: Capture, error?: ErrorResponse}>} Result object
   */
  async generateSummary(captureId: string): Promise<{
    success: boolean;
    summary?: string;
    error?: ErrorResponse;
  }> {
    try {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: { summary: string; captureId: string };
      }>("/ai/summary", { captureId });
      
      return { 
        success: true, 
        summary: response.data.data.summary 
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        error: {
          message: axiosError.response?.data?.message || axiosError.message || "Summary generation failed",
          code: axiosError.code,
          details: axiosError.response?.data
        }
      };
    }
  },

  /**
   * Handle API errors consistently
   * @private
   */
handleError(error: unknown, defaultMessage: string): ErrorResponse {
    const axiosError = error as AxiosError;
    console.error("API Error:", {
      message: axiosError.message,
      code: axiosError.code,
      response: axiosError.response?.data,
    });

    return {
      message: axiosError.response?.data?.message || defaultMessage,
      code: axiosError.code,
      details: axiosError.response?.data
    };
  }
};