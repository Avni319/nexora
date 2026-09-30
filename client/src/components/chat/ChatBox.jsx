import { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import MessageBubble from "./MessageBubble";

function ChatBox({ messages }) {
  const { user } = useAuth();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-1">
      {messages.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-100">
            <MessageSquare size={28} className="text-violet-600" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-slate-700">No messages yet</h3>
          <p className="mt-1 text-sm text-slate-400">
            Start the conversation with your team.
          </p>
        </div>
      ) : (
        messages.map((message) => (
          <MessageBubble key={message._id} message={message} currentUser={user} />
        ))
      )}
      <div ref={bottomRef} />
    </div>
  );
}

export default ChatBox;
