import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Hash } from "lucide-react";
import ChatBox from "../../components/chat/ChatBox";
import MessageInput from "../../components/chat/MessageInput";
import useAuth from "../../hooks/useAuth";
import { getMessages } from "../../services/chatService";
import socket from "../../socket/socket";

function Chat() {
  const { projectId } = useParams();
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
    socket.emit("join-project", projectId);
    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => { socket.off("receive-message"); };
  }, [projectId]);

  const loadMessages = async () => {
    try {
      const response = await getMessages(token, projectId);
      setMessages(response.messages);
    } catch {
      // handled silently
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm" style={{ height: "calc(100vh - 220px)", minHeight: "500px" }}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100">
          <Hash size={17} className="text-violet-600" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Project Chat</h2>
          <p className="text-xs text-slate-400">Real-time team messaging</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-xs text-slate-400">Live</span>
        </div>
      </div>

      {/* Messages */}
      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-600 border-t-transparent" />
        </div>
      ) : (
        <ChatBox messages={messages} />
      )}

      {/* Input */}
      <MessageInput projectId={projectId} setMessages={setMessages} />
    </div>
  );
}

export default Chat;
