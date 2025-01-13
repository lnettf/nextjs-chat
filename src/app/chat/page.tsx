"use client";
import { MessageList } from "./components/MessageList";
import { MessageInput } from "./components/MessageInput";
import { useChat } from "./hooks/useChat";

export default function ChatPage() {
  const { messages, input, loading, setInput, sendMessage } = useChat();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-4 bg-white rounded shadow">
        <MessageList messages={messages} />
        <MessageInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          loading={loading}
        />
      </div>
    </div>
  );
}
