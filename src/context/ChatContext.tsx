import { createContext, useState, useContext } from "react";
import { sendMessage } from "../api/chat.api";

export type IMessage = {
  role: "user" | "assistant";
  content: string;
  references?: { id: string; title: string; url: string }[]; // Adjusted type for references
};

type ChatContextType = {
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
  userMessage: string;
  setUserMessage: (message: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isStreaming: boolean;
  setIsStreaming: (streaming: boolean) => void;
  clearMessages: () => void;
  addMessage: (captureId: string) => void;
  updateMessage: (index: number, message: IMessage) => void;
  removeMessage: (index: number) => void;
  cancelStream: () => void;
  chatFailed: boolean;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatFailed, setChatFailed] = useState(false);

  const clearMessages = () => setMessages([]);

  const addMessage = (captureId: string) => {
    if (!userMessage.trim()) return;

    const userMessageObj: IMessage = { role: "user", content: userMessage.trim() };
    const updatedMessages = [...messages, userMessageObj]; // include the new message

    if (chatFailed){
      setMessages(updatedMessages.slice(0, -1)); // remove the last failed message
      // setChatFailed(false);
    } else {
      setMessages(updatedMessages); // add the new user message
    }
    setIsLoading(true);
    setIsStreaming(true);


    const controller = new AbortController();
    setAbortController(controller);

    sendMessage(updatedMessages, captureId)
      .then((response) => {
        const newMessage: IMessage = {
          role: "assistant",
          content: response.data.response, // not `response.data.response`, since you're already returning `res.data` directly
          references: response.references,
        };
        setMessages((prev) => [...prev, newMessage]);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Request aborted by user");
        } else {
          console.error("Error sending message:", error);
          // setChatFailed(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
        setIsStreaming(false);
        setUserMessage(""); // Clear input after sending
        setAbortController(null);
      });
  };

  // setMessages((prev) => [...prev, message]);

  const updateMessage = (index: number, message: IMessage) => {
    setMessages((prev) => {
      const newMessages = [...prev];
      newMessages[index] = message;
      return newMessages;
    });
  };

  const removeMessage = (index: number) => {
    setMessages((prev) => prev.filter((_, i) => i !== index));
  };

  const cancelStream = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
      setIsStreaming(false);
      setIsLoading(false);
    }
  };
  

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        isLoading,
        setIsLoading,
        isStreaming,
        setIsStreaming,
        clearMessages,
        addMessage,
        updateMessage,
        removeMessage,
        userMessage,
        setUserMessage,
        cancelStream,
        chatFailed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
};
