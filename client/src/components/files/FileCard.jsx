import { Download, Trash2, FileText, Image, FileArchive, File } from "lucide-react";
import { format } from "date-fns";

const formatFileSize = (bytes) => {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileIcon = (fileType) => {
  if (!fileType) return { Icon: File, color: "text-slate-500", bg: "bg-slate-100" };
  if (fileType.startsWith("image")) return { Icon: Image, color: "text-blue-500", bg: "bg-blue-100" };
  if (fileType.includes("zip") || fileType.includes("rar") || fileType.includes("tar")) return { Icon: FileArchive, color: "text-orange-500", bg: "bg-orange-100" };
  if (fileType.includes("pdf")) return { Icon: FileText, color: "text-red-500", bg: "bg-red-100" };
  return { Icon: FileText, color: "text-violet-500", bg: "bg-violet-100" };
};

function FileCard({ file, onDelete }) {
  const { Icon, color, bg } = getFileIcon(file.fileType);

  return (
    <div className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-3">
        {/* Icon / Preview */}
        <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${bg}`}>
          <Icon size={20} className={color} />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900" title={file.originalName}>
            {file.originalName}
          </p>
          <p className="mt-0.5 text-xs text-slate-400">
            {formatFileSize(file.fileSize)}
            {file.createdAt && ` · ${format(new Date(file.createdAt), "dd MMM yyyy")}`}
          </p>
        </div>

        {/* Delete */}
        <button
          onClick={() => onDelete(file._id)}
          className="flex-shrink-0 rounded-lg p-1.5 text-slate-300 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
          aria-label="Delete file"
        >
          <Trash2 size={15} />
        </button>
      </div>

      {/* Image preview */}
      {file.fileType?.startsWith("image") && (
        <div className="mt-3 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={`http://localhost:5000${file.fileUrl}`}
            alt={file.originalName}
            className="h-32 w-full object-cover"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>
      )}

      {/* Download */}
      <a
        href={`http://localhost:5000${file.fileUrl}`}
        target="_blank"
        rel="noreferrer"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-2 text-xs font-semibold text-slate-600 transition hover:bg-violet-600 hover:text-white"
      >
        <Download size={13} />
        Download
      </a>
    </div>
  );
}

export default FileCard;
