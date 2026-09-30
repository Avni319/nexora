import { useRef, useState } from "react";
import { UploadCloud, File } from "lucide-react";

function FileUpload({ onSelect, uploading }) {
  const inputRef = useRef();
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) onSelect(file);
  };

  return (
    <>
      <input
        ref={inputRef}
        hidden
        type="file"
        onChange={(e) => onSelect(e.target.files[0])}
      />
      <div
        onClick={() => !uploading && inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`cursor-pointer rounded-3xl border-2 border-dashed p-10 text-center transition-all duration-200 ${
          uploading
            ? "cursor-not-allowed border-violet-300 bg-violet-50 opacity-70"
            : dragOver
            ? "border-violet-500 bg-violet-100 scale-[1.01]"
            : "border-slate-200 bg-slate-50 hover:border-violet-400 hover:bg-violet-50"
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition ${dragOver ? "bg-violet-200" : "bg-violet-100"}`}>
            <UploadCloud size={26} className="text-violet-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-700">
              {uploading ? "Uploading..." : dragOver ? "Drop to upload" : "Click or drag & drop to upload"}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Images, PDFs, ZIPs — up to 50MB
            </p>
          </div>
          {uploading && (
            <div className="w-48 overflow-hidden rounded-full bg-slate-200 h-1.5">
              <div className="h-full animate-pulse rounded-full bg-violet-500" style={{ width: "60%" }} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FileUpload;
