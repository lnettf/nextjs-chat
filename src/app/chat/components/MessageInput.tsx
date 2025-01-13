interface MessageInputProps {
  input: string;
  setInput: (value: string) => void;
  sendMessage: () => void;
  loading: boolean;
}

export function MessageInput({
  input,
  setInput,
  sendMessage,
  loading,
}: MessageInputProps) {
  return (
    <div className="flex">
      <input
        type="text"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Ask about cars..."
        disabled={loading}
      />
      <button
        onClick={sendMessage}
        className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Loading..." : "Send"}
      </button>
    </div>
  );
}
