import { FileText, ChevronRight } from "lucide-react";

const pages = ["Getting Started", "Authentication", "API Reference", "Deployment"];

function DocsPreview() {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-slate-100 bg-white">
      <div className="border-b border-slate-100 px-4 py-3 flex items-center gap-2">
        <FileText size={13} className="text-violet-500" />
        <p className="text-xs font-bold text-slate-700">README.md</p>
      </div>
      <div className="divide-y divide-slate-50">
        {pages.map((p) => (
          <div key={p} className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50">
            <p className="text-xs text-slate-600">{p}</p>
            <ChevronRight size={12} className="text-slate-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocsPreview;
