import axios from "axios";
import type { IFolder } from "../types/Folder";

const API_BASE_URL = "http://localhost:3000/api/v1/folders";

// Configure axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Folder API Service
 * Provides methods for all folder-related operations
 */
export const FolderService = {
  /**
   * Create a new folder
   * @param {string} name - Name of the folder to create
   * @returns {Promise<IFolder>} Created folder object
   * @throws {Error} If creation fails
   */
  async create(name: string): Promise<IFolder> {
    try {
      const response = await apiClient.post<{ data: IFolder }>("/", { name });
      return response.data.data;
    } catch (error) {
      throw this.handleError(error, "Failed to create folder");
    }
  },

  /**
   * Get all folders
   * @returns {Promise<IFolder[]>} Array of folders
   * @throws {Error} If fetch fails
   */
  async getAll(): Promise<IFolder[]> {
    try {
      const response = await apiClient.get<{ data: { collections: IFolder[] } }>("/");
      return response.data.data;
    } catch (error) {
      throw this.handleError(error, "Failed to fetch folders");
    }
  },

  /**
   * Get folder by ID
   * @param {string} id - Folder ID
   * @returns {Promise<IFolder>} Folder object
   * @throws {Error} If fetch fails
   */
  async getById(id: string): Promise<IFolder> {
    try {
      const response = await apiClient.get<{ data: IFolder }>(`/${id}`);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error, "Failed to fetch folder");
    }
  },

  /**
   * Add capture to folder
   * @param {string} folderId - Folder ID
   * @param {string} captureId - Capture ID to add
   * @returns {Promise<IFolder>} Updated folder object
   * @throws {Error} If operation fails
   */
  async addCapture(folderId: string, captureId: string): Promise<IFolder> {
    try {
      const response = await apiClient.post<{ data: IFolder }>(
        `/${folderId}/captures`,
        { captureId }
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error, "Failed to add capture to folder");
    }
  },

  /**
   * Remove capture from folder
   * @param {string} folderId - Folder ID
   * @param {string} captureId - Capture ID to remove
   * @returns {Promise<IFolder>} Updated folder object
   * @throws {Error} If operation fails
   */
  async removeCapture(folderId: string, captureId: string): Promise<IFolder> {
    try {
      const response = await apiClient.delete<{ data: IFolder }>(
        `/${folderId}/captures/${captureId}`
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error, "Failed to remove capture from folder");
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