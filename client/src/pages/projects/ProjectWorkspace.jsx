import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WorkspaceHeader from "../../components/workspace/WorkspaceHeader";
import useAuth from "../../hooks/useAuth";
import { getProjects } from "../../services/projectService";
import { ArrowLeft, FolderKanban } from "lucide-react";
import { Link } from "react-router-dom";

function ProjectWorkspace() {
  const { projectId } = useParams();
  const { token } = useAuth();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await getProjects(token);
        const found = response.projects?.find((p) => p._id === projectId);
        if (found) setProject(found);
      } catch {
        // silence
      }
    };
    loadProject();
  }, [projectId, token]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      {/* Workspace top bar */}
      <div className="flex items-center gap-4 border-b border-slate-100 px-6 py-4">
        <Link
          to="/projects"
          className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <ArrowLeft size={15} />
          Projects
        </Link>
        <div className="h-5 w-px bg-slate-200" />
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
            <FolderKanban size={15} className="text-violet-600" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">
              {project?.name || "Project Workspace"}
            </h1>
            {project?.organization?.name && (
              <p className="text-xs text-slate-400">{project.organization.name}</p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <WorkspaceHeader />

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default ProjectWorkspace;
