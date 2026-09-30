const messages = [
  { side: "left", name: "Rahul", text: "UI is done ✅", color: "bg-emerald-500" },
  { side: "right", name: "You", text: "Looks amazing 🚀", color: "bg-violet-500" },
  { side: "left", name: "Diya", text: "Shipping tonight!", color: "bg-blue-500" },
];

function ChatPreview() {
  return (
    <div className="mt-5 space-y-2.5">
      {messages.map((msg, i) => (
        <div key={i} className={`flex items-end gap-2 ${msg.side === "right" ? "flex-row-reverse" : ""}`}>
          <div className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${msg.color}`}>
            {msg.name[0]}
          </div>
          <div className={`rounded-2xl px-3 py-2 text-xs font-medium ${msg.side === "right" ? "bg-violet-600 text-white rounded-br-sm" : "bg-slate-100 text-slate-700 rounded-bl-sm"}`}>
            {msg.text}
          </div>
        </div>
      ))}
      <div className="flex items-center gap-1.5 pl-8">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: `${i * 120}ms` }} />
        ))}
        <span className="text-[10px] text-slate-400">Rahul is typing…</span>
      </div>
    </div>
  );
}

export default ChatPreview;
