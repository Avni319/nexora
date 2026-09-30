function MessageBubble({ message, currentUser }) {
  const isMine = message.sender?._id === currentUser?._id;

  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const initials = message.sender?.fullName?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className={`flex items-end gap-2.5 mb-4 ${isMine ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      {!isMine && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-400 to-slate-600 text-xs font-bold text-white">
          {initials}
        </div>
      )}

      {/* Bubble */}
      <div className={`flex max-w-sm flex-col ${isMine ? "items-end" : "items-start"}`}>
        {!isMine && (
          <p className="mb-1 ml-1 text-xs font-semibold text-slate-600">
            {message.sender?.fullName}
          </p>
        )}
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
            isMine
              ? "rounded-br-sm bg-violet-600 text-white"
              : "rounded-bl-sm bg-white border border-slate-100 text-slate-800"
          }`}
        >
          {message.text}
        </div>
        <p className={`mt-1 text-[11px] ${isMine ? "text-slate-400" : "ml-1 text-slate-400"}`}>
          {time}
        </p>
      </div>
    </div>
  );
}

export default MessageBubble;
