"use client";

import { useState } from "react";
import { createChatCompletion } from "../chatCompletion";

interface Message {
  role: string;
  content: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", content: input.trim() };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const data = await createChatCompletion(updatedMessages);

      setMessages([
        ...updatedMessages,
        { role: "assistant", content: data.choices[0].message.content },
      ]);
    } catch (error: any) {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "Error: " + error.message },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    input,
    loading,
    setInput,
    sendMessage,
  };
};
