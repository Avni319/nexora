import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FolderOpen } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { getFiles, uploadFile, deleteFile } from "../../services/fileService";
import FileUpload from "../../components/files/FileUpload";
import FileGrid from "../../components/files/FileGrid";

function Files() {
  const { projectId } = useParams();
  const { token } = useAuth();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { fetchFiles(); }, [projectId]);

  const fetchFiles = async () => {
    try {
      const response = await getFiles(token, projectId);
      setFiles(response.files);
    } catch {
      toast.error("Unable to load files");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (selectedFile) => {
    if (!selectedFile) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("projectId", projectId);
      const response = await uploadFile(token, formData);
      setFiles((prev) => [response.file, ...prev]);
      toast.success("File uploaded");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this file?")) return;
    try {
      await deleteFile(token, id);
      setFiles((prev) => prev.filter((f) => f._id !== id));
      toast.success("File deleted");
    } catch {
      toast.error("Unable to delete file");
    }
  };

  const totalSize = files.reduce((acc, f) => acc + (f.fileSize || 0), 0);
  const formatSize = (b) => b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / (1024 * 1024)).toFixed(1)} MB`;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2.5 text-2xl font-bold text-slate-900">
            <FolderOpen size={24} className="text-violet-600" />
            Project Files
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {files.length} file{files.length !== 1 ? "s" : ""}
            {files.length > 0 && ` · ${formatSize(totalSize)} total`}
          </p>
        </div>
      </div>

      {/* Upload zone */}
      <FileUpload onSelect={handleUpload} uploading={uploading} />

      {/* File grid */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      ) : (
        <FileGrid files={files} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default Files;
