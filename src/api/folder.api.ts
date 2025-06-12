import axios from "axios";
import type { IFolder } from "../types/Folder";

export const createFolder = async (folder: string): Promise<IFolder> => {
  try {
    const res = await axios.post<IFolder>(
      "http://localhost:3000/api/v1/folders",
      { name: folder }
    );
    return res.data;
  } catch (error) {
    console.error("Error creating folder:", error);
    throw error;
  }
};

export const getFolders = async (): Promise<IFolder[]> => {
  try {
    const res = await axios.get<IFolder[]>(
      "http://localhost:3000/api/v1/folders"
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw error;
  }
};

export const getFolderById = async (id: string): Promise<IFolder> => {
  try {
    const res = await axios.get<IFolder>(
      `http://localhost:3000/api/v1/folders/${id}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching folder by ID:", error);
    throw error;
  }
};

export const appendCaptureToFolder = async (
  folderId: string,
  captureId: string
): Promise<IFolder> => {
  try {
    const res = await axios.post<IFolder>(
      `http://localhost:3000/api/v1/folders/${folderId}/capture`,
      { captureId }
    );
    return res.data;
  } catch (error) {
    console.error("Error appending capture to folder:", error);
    throw error;
  }
};
export const removeCaptureFromFolder = async (
  folderId: string,
  captureId: string
): Promise<IFolder> => {
  try {
    const res = await axios.delete<IFolder>(
      `http://localhost:3000/api/v1/folders/${folderId}/captures/${captureId}`
    );
    return res.data;
  } catch (error) {
    console.error("Error removing capture from folder:", error);
    throw error;
  }
};
