import { FolderKanban, Trash2, Users, ArrowRight, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const gradients = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-amber-600",
  "from-pink-500 to-rose-600",
  "from-cyan-500 to-blue-600",
];

function ProjectCard({ project, onDelete }) {
  const navigate = useNavigate();

  // Deterministic gradient based on name
  const gradientIndex =
    project.name.charCodeAt(0) % gradients.length;
  const gradient = gradients[gradientIndex];

  return (
    <div className="group flex flex-col rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Color strip */}
      <div className={`h-2 rounded-t-3xl bg-gradient-to-r ${gradient}`} />

      <div className="flex flex-1 flex-col p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-sm`}>
            <FolderKanban size={22} className="text-white" />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project._id);
            }}
            className="rounded-xl p-2 text-slate-300 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
            aria-label="Delete project"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Name + description */}
        <div className="mt-5 flex-1">
          <h2 className="text-xl font-bold text-slate-900 line-clamp-1">
            {project.name}
          </h2>
          <p className="mt-2 text-sm text-slate-500 line-clamp-2">
            {project.description || "No description provided"}
          </p>
        </div>

        {/* Org tag */}
        {project.organization?.name && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
            <Building2 size={13} className="text-slate-400" />
            <p className="text-xs font-medium text-slate-600 truncate">
              {project.organization.name}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <Users size={15} />
            <span>{project.members?.length || 1} member{(project.members?.length || 1) !== 1 ? "s" : ""}</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            Active
          </span>
        </div>

        {/* Open button */}
        <button
          onClick={() => navigate(`/projects/${project._id}`)}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${gradient} py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md`}
        >
          Open Workspace
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
