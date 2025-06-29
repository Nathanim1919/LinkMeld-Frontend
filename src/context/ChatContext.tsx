import { createContext, useState, useContext } from "react";

type IMessage = {
  role: "user" | "assistant";
  content: string;
  references?: { id: string; title: string; url: string }[]; // Adjusted type for references
};

type ChatContextType = {
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isStreaming: boolean;
  setIsStreaming: (streaming: boolean) => void;
  clearMessages: () => void;
  addMessage: (message: IMessage) => void;
  updateMessage: (index: number, message: IMessage) => void;
  removeMessage: (index: number) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const clearMessages = () => setMessages([]);

  const addMessage = (message: IMessage) =>
    setMessages((prev) => [...prev, message]);

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
