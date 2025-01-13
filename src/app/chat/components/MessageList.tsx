interface Message {
  role: string;
  content: string;
}

interface MessageListProps {
  messages: Message[];
}
const isUserMessage = (msg: Message) => msg.role === "user";

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="overflow-y-auto h-96 p-2 border border-gray-300 rounded mb-4">
      {messages.map((msg, idx) => {
        const _isUserMessage = isUserMessage(msg);
        return (
          <div
            key={idx}
            className={`mb-2 ${_isUserMessage ? "text-right" : "text-left"}`}
          >
            <pre className="whitespace-pre-wrap	">
              <p
                className={`inline-block px-4 py-2 rounded ${
                  _isUserMessage ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {msg.content}
              </p>
            </pre>
          </div>
        );
      })}
    </div>
  );
}
