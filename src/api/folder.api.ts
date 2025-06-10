import axios from "axios";
import type { IFolder } from "../types/Folder";

export const createFolder = async (
  folder: Omit<IFolder, "_id" | "createdAt" | "updatedAt">
): Promise<IFolder> => {
  try {
    const res = await axios.post<IFolder>(
      "http://localhost:3000/api/v1/folders",
      folder
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
