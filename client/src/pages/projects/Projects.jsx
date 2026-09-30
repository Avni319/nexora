import { useEffect, useMemo, useState } from "react";
import { Search, Plus, FolderKanban, LayoutGrid, List } from "lucide-react";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";
import { getProjects, deleteProject } from "../../services/projectService";
import CreateProjectModal from "../../components/projects/CreateProjectModal";
import ProjectGrid from "../../components/projects/ProjectsGrid";

function Projects() {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await getProjects(token);
      setProjects(response.projects);
    } catch {
      toast.error("Unable to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleProjectCreated = (project) => {
    setProjects((prev) => [project, ...prev]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project? This action cannot be undone.")) return;
    try {
      await deleteProject(token, id);
      toast.success("Project deleted");
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  const filteredProjects = useMemo(() =>
    projects.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    ),
  [projects, search]);

  const orgsCount = new Set(projects.map((p) => p.organization?._id)).size;

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
          <p className="mt-1 text-slate-500">
            {projects.length} project{projects.length !== 1 ? "s" : ""} across {orgsCount} organization{orgsCount !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
        >
          <Plus size={17} />
          New Project
        </button>
      </div>

      {/* Stats + Search row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Mini stats */}
        <div className="flex gap-4">
          {[
            { label: "Total", value: projects.length, color: "text-slate-900" },
            { label: "Active", value: projects.length, color: "text-emerald-600" },
            { label: "Orgs", value: orgsCount, color: "text-violet-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-2xl border border-slate-100 bg-white px-5 py-3 shadow-sm">
              <p className="text-xs text-slate-400">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-sm flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-3xl bg-slate-100" />
          ))}
        </div>
      ) : (
        <ProjectGrid projects={filteredProjects} onDelete={handleDelete} />
      )}

      {/* Modal */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
}

export default Projects;
