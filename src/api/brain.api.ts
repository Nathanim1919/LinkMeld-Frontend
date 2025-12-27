import { api } from ".";
import type { Conversation } from "../stores/brain-store";

export const startConversation = async (conversation: Conversation) => {
  const response = await api.post('/brain/conversation/start', conversation);
  return response.data;
};

export const getConversations = async () => {
  const response = await api.get('/brain/conversations');
  return response.data;
};

export const getConversation = async (id: string) => {
  const response = await api.get(`/brain/conversation/${id}`);
  return response.data;
};