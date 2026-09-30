import { useEffect, useState } from "react";
import { X, Loader2, FolderKanban } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { createProject } from "../../services/projectService";
import { getOrganizations } from "../../services/organizationService";

function CreateProjectModal({ isOpen, onClose, onProjectCreated }) {
  const { token } = useAuth();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", organizationId: "" });

  useEffect(() => {
    if (!isOpen) return;
    getOrganizations(token).then((r) => setOrganizations(r.organizations)).catch(() => {});
  }, [isOpen, token]);

  if (!isOpen) return null;

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.organizationId) return toast.error("Name and organization required");
    try {
      setLoading(true);
      const response = await createProject(token, formData);
      toast.success("Project created!");
      onProjectCreated(response.project);
      setFormData({ name: "", description: "", organizationId: "" });
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100">
              <FolderKanban size={17} className="text-violet-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">New Project</h2>
              <p className="text-xs text-slate-400">Create a project workspace</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Project name *</label>
            <input
              name="name" value={formData.name} onChange={handleChange}
              placeholder="My Awesome Project"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
            <textarea
              rows={3} name="description" value={formData.description} onChange={handleChange}
              placeholder="What is this project about?"
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Organization *</label>
            <select
              name="organizationId" value={formData.organizationId} onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:bg-white"
            >
              <option value="">Select organization…</option>
              {organizations.map((o) => <option key={o._id} value={o._id}>{o.name}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            <button disabled={loading} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 hover:bg-violet-700 disabled:opacity-60">
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? "Creating…" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectModal;
