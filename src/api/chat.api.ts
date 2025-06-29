import axios from "axios";
// import { IChat } from "../types/chat.type";


interface IChat {  id: string;
  message: string;
  response: string;
  createdAt: string;
  updatedAt: string;
  references?: { id: string; title: string; url: string }[]; // Adjusted type for references
}

export const sendMessage = async (message: string): Promise<IChat> => {
  try {
    const res = await axios.post<IChat>(
      "http://localhost:3000/api/v1/chat",
      { message },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};