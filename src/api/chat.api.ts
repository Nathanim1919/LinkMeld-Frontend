import axios from "axios";
import type { IMessage } from "../context/ChatContext";
// import { IChat } from "../types/chat.type";

interface IChat {
  id: string;
  success: boolean;
  data: {
    response: string;
  };
  references?: { id: string; title: string; url: string }[];
}

export const sendMessage = async (
  messages: IMessage[],
  captureId: string
): Promise<IChat> => {
  try {
    const res = await axios.post<IChat>(
      "http://localhost:3000/api/v1/ai/converse",
      { messages, captureId },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
