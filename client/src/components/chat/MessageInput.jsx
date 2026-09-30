import { useState } from "react";
import { Send, Loader2, Smile } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { sendMessage } from "../../services/chatService";
import socket from "../../socket/socket";

function MessageInput({ projectId, setMessages }) {
  const { token } = useAuth();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!text.trim() || loading) return;
    try {
      setLoading(true);
      const response = await sendMessage(token, { projectId, text });
      socket.emit("send-message", { ...response.message, projectId });
      setMessages((prev) => [...prev, response.message]);
      setText("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t border-slate-100 bg-white p-4">
      <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 transition focus-within:border-violet-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-violet-100">
        <button
          type="button"
          className="text-slate-400 transition hover:text-slate-600"
          aria-label="Emoji"
        >
          <Smile size={18} />
        </button>
        <input
          type="text"
          placeholder="Message your team..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />
        <button
          disabled={loading || !text.trim()}
          onClick={handleSend}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-700 disabled:opacity-40"
          aria-label="Send message"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
