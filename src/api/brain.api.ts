import { api, API_CONFIG } from ".";
import type { Conversation } from "../stores/brain-store";

// export const startConversation = async (conversation: Conversation) => {
//   const response = await api.post('/brain/conversation/start', conversation);
//   return response.data;
// };

// api.tsx
export const startConversationStream = async (
  conversation: Conversation,
  onDelta?: (delta: string) => void,
  onUsage?: (usage: any) => void
): Promise<Conversation> => {
  // Using better-auth which handles auth via cookies
  // credentials: "include" will send the auth cookies

  const response = await fetch(`${API_CONFIG.baseURL}brain/conversation/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(conversation),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type');
  const isJsonResponse = contentType && contentType.includes('application/json');

  if (isJsonResponse) {
    // Backend returned complete JSON response
    const result = await response.json();
    const serverConversation = result.data;

    // Call onDelta with the assistant content for frontend updates
    if (onDelta && serverConversation.messages) {
      const assistantMessage = serverConversation.messages.find((m: any) => m.role === 'assistant');
      if (assistantMessage) {
        onDelta(assistantMessage.content);
      }
    }

    // Call usage callback if provided
    if (onUsage) onUsage(undefined);

    // Return the conversation from server response
    return {
      id: serverConversation._id || serverConversation.id,
      _id: serverConversation._id,
      title: serverConversation.title,
      createdAt: new Date(serverConversation.createdAt).getTime(),
      context: serverConversation.context,
      messages: serverConversation.messages.map((msg: any) => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        createdAt: new Date(msg.timestamp || msg.createdAt).getTime(),
        status: msg.status || 'sent',
      })),
      lastActivity: serverConversation.lastActivity ? new Date(serverConversation.lastActivity).getTime() : undefined,
      isActive: serverConversation.isActive,
    };
  } else {
    // Handle Server-Sent Events (SSE) streaming response
    if (!response.body) throw new Error("No response body from stream");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let assistantText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Process complete lines from buffer
      const lines = buffer.split('\n');
      buffer = lines.pop() || ""; // Keep incomplete line in buffer

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('data: ')) {
          try {
            const data = JSON.parse(trimmedLine.slice(6)); // Remove 'data: ' prefix

            if (data.delta) {
              assistantText += data.delta;
              if (onDelta) onDelta(data.delta);
            }

            if (data.usage && onUsage) {
              onUsage(data.usage);
            }

            if (data.done && data.conversation) {
              // Return the complete conversation from the done event
              const serverConversation = data.conversation;
              return {
                id: serverConversation._id || serverConversation.id,
                _id: serverConversation._id,
                title: serverConversation.title,
                createdAt: new Date(serverConversation.createdAt).getTime(),
                context: serverConversation.context,
                messages: serverConversation.messages.map((msg: any) => ({
                  id: msg.id,
                  role: msg.role,
                  content: msg.content,
                  createdAt: new Date(msg.timestamp || msg.createdAt).getTime(),
                  status: msg.status || 'sent',
                })),
                lastActivity: serverConversation.lastActivity ? new Date(serverConversation.lastActivity).getTime() : undefined,
                isActive: serverConversation.isActive,
              };
            }
          } catch (error) {
            console.warn('Failed to parse SSE data:', trimmedLine, error);
          }
        }
      }
    }

    // Fallback if stream ended without done event
    return {
      ...conversation,
      messages: [
        ...conversation.messages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: assistantText,
          createdAt: Date.now(),
          status: "sent",
        },
      ],
    };
  }
};

export const sendMessage = async (id: string, message: string) => {
  const response = await api.post(`/brain/conversation/${id}/message`, { message });
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