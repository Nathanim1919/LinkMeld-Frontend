import type { IMessage } from "../context/ChatContext";
import { api } from ".";

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
    const res = await api.post<IChat>("ai/converse",
      { messages, captureId },
    );
    return res.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
