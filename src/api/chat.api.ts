import { API_CONFIG, handleApiError, type ApiError } from ".";
import type { IMessage } from "../context/ChatContext";

// Enhanced chat types
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  references?: ChatReference[];
}

export interface ChatReference {
  id: string;
  title: string;
  url: string;
  excerpt?: string;
}

export interface ChatStreamEvent {
  type: "text" | "done" | "error" | "references";
  data: any;
}

export interface ChatRequest {
  messages: IMessage[];
  captureId: string;
  options?: {
    temperature?: number;
    maxTokens?: number;
    includeReferences?: boolean;
  };
}

export interface ChatResponse {
  message: string;
  references?: ChatReference[];
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// Enhanced streaming chat service
export const ChatService = {
  /**
   * Send a message and stream the response
   * @param request - Chat request parameters
   * @param callbacks - Event callbacks
   * @param signal - Abort signal for cancellation
   */
  async sendMessageStream(
    request: ChatRequest,
    callbacks: {
      onMessageChunk: (chunk: string) => void;
      onReferences?: (references: ChatReference[]) => void;
      onDone: () => void;
      onError: (error: string) => void;
    },
    signal?: AbortSignal
  ): Promise<void> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/ai/converse`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream",
        },
        body: JSON.stringify(request),
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error("No response body available");
      }

      await this.processStream(response.body, callbacks);
    } catch (error) {
      if (signal?.aborted) {
        console.log("Chat stream was aborted");
        return;
      }

      const apiError = handleApiError(error, "Failed to send message");
      callbacks.onError(apiError.message);
    }
  },

  /**
   * Send a single message and get complete response
   * @param request - Chat request parameters
   * @returns Promise<ChatResponse> Complete chat response
   */
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/ai/converse/sync`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      const apiError = handleApiError(error, "Failed to send message");
      throw new Error(apiError.message);
    }
  },

  /**
   * Get chat history for a capture
   * @param captureId - Capture ID
   * @param limit - Number of messages to return
   * @param offset - Number of messages to skip
   * @returns Promise<ChatMessage[]> Array of chat messages
   */
  async getChatHistory(
    captureId: string,
    limit?: number,
    offset?: number
  ): Promise<ChatMessage[]> {
    try {
      const params = new URLSearchParams();
      if (limit) params.append("limit", limit.toString());
      if (offset) params.append("offset", offset.toString());

      const response = await fetch(
        `${API_CONFIG.baseURL}/ai/chat/${captureId}?${params}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Accept": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.messages || [];
    } catch (error) {
      const apiError = handleApiError(error, "Failed to fetch chat history");
      throw new Error(apiError.message);
    }
  },

  /**
   * Clear chat history for a capture
   * @param captureId - Capture ID
   * @returns Promise<void>
   */
  async clearChatHistory(captureId: string): Promise<void> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/ai/chat/${captureId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      const apiError = handleApiError(error, "Failed to clear chat history");
      throw new Error(apiError.message);
    }
  },

  /**
   * Process streaming response
   */
  async processStream(
    stream: ReadableStream<Uint8Array>,
    callbacks: {
      onMessageChunk: (chunk: string) => void;
      onReferences?: (references: ChatReference[]) => void;
      onDone: () => void;
      onError: (error: string) => void;
    }
  ): Promise<void> {
    const reader = stream.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    try {
      while (true) {
        const { value, done } = await reader.read();
        
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        
        // Process complete events
        const events = buffer.split("\n\n");
        buffer = events.pop() || ""; // Keep incomplete event in buffer

        for (const event of events) {
          await this.processEvent(event.trim(), callbacks);
        }
      }

      // Process any remaining buffer
      if (buffer.trim()) {
        await this.processEvent(buffer.trim(), callbacks);
      }
    } finally {
      reader.releaseLock();
    }
  },

  /**
   * Process a single SSE event
   */
  async processEvent(
    event: string,
    callbacks: {
      onMessageChunk: (chunk: string) => void;
      onReferences?: (references: ChatReference[]) => void;
      onDone: () => void;
      onError: (error: string) => void;
    }
  ): Promise<void> {
    if (!event.startsWith("data:")) return;

    try {
      const jsonStr = event.replace("data:", "").trim();
      const data = JSON.parse(jsonStr);

      switch (data.type) {
        case "text":
          if (data.text) {
            callbacks.onMessageChunk(data.text);
          }
          break;
        case "references":
          if (data.references && callbacks.onReferences) {
            callbacks.onReferences(data.references);
          }
          break;
        case "done":
          callbacks.onDone();
          break;
        case "error":
          callbacks.onError(data.error || "Unknown error occurred");
          break;
        default:
          console.warn("Unknown event type:", data.type);
      }
    } catch (error) {
      console.error("Failed to parse SSE event:", error);
      callbacks.onError("Failed to parse server response");
    }
  },
};

// Legacy function for backward compatibility
export const sendMessageStream = async (
  messages: IMessage[],
  captureId: string,
  onMessageChunk: (chunk: string) => void,
  onDone: () => void,
  onError: (err: string) => void,
  signal?: AbortSignal
): Promise<void> => {
  return ChatService.sendMessageStream(
    { messages, captureId },
    { onMessageChunk, onDone, onError },
    signal
  );
};
