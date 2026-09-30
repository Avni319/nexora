import { FolderKanban } from "lucide-react";
import ProjectCard from "./ProjectCard";

function ProjectGrid({ projects, onDelete }) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-100">
          <FolderKanban size={28} className="text-violet-600" />
        </div>
        <h2 className="mt-5 text-xl font-bold text-slate-800">No projects found</h2>
        <p className="mt-2 max-w-xs text-sm text-slate-500">
          Create your first project and start collaborating with your team.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ProjectGrid;
