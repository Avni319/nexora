import { FolderOpen } from "lucide-react";
import FileCard from "./FileCard";

function FileGrid({ files, onDelete }) {
  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100">
          <FolderOpen size={24} className="text-slate-400" />
        </div>
        <p className="mt-4 font-semibold text-slate-700">No files yet</p>
        <p className="mt-1 text-sm text-slate-400">Upload files to share with your team</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {files.map((file) => (
        <FileCard key={file._id} file={file} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default FileGrid;
