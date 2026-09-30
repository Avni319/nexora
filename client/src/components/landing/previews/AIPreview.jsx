import { Sparkles } from "lucide-react";

function AIPreview() {
  return (
    <div className="mt-5 space-y-3">
      <div className="rounded-xl bg-slate-800 px-4 py-3">
        <p className="text-xs text-slate-400">You asked</p>
        <p className="mt-1 text-sm font-medium text-white">Explain JWT Authentication</p>
      </div>
      <div className="rounded-xl border border-violet-100 bg-violet-50 px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={12} className="text-violet-500" />
          <p className="text-xs font-semibold text-violet-600">Nexora AI</p>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">JWT (JSON Web Token) is a compact, self-contained token used for secure authentication…</p>
        <div className="mt-2 flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AIPreview;
