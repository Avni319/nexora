import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { KanbanSquare, CheckCircle2, Users, Clock, MessageSquare, FolderOpen, Video, Calendar } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { getTasks } from "../../services/taskService";

const quickLinks = [
  { label: "Kanban", path: "kanban", icon: KanbanSquare, color: "bg-violet-100 text-violet-600 hover:bg-violet-200" },
  { label: "Chat", path: "chat", icon: MessageSquare, color: "bg-blue-100 text-blue-600 hover:bg-blue-200" },
  { label: "Files", path: "files", icon: FolderOpen, color: "bg-orange-100 text-orange-600 hover:bg-orange-200" },
  { label: "Meetings", path: "meetings", icon: Video, color: "bg-pink-100 text-pink-600 hover:bg-pink-200" },
  { label: "Calendar", path: "calendar", icon: Calendar, color: "bg-emerald-100 text-emerald-600 hover:bg-emerald-200" },
];

function ProjectOverview() {
  const { projectId } = useParams();
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks(token, projectId)
      .then((r) => setTasks(r.tasks))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [projectId]);

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "DONE").length;
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const pending = tasks.filter((t) => t.status === "TODO").length;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  const statCards = [
    { label: "Total Tasks", value: total, icon: KanbanSquare, color: "bg-violet-100 text-violet-600" },
    { label: "Completed", value: done, icon: CheckCircle2, color: "bg-emerald-100 text-emerald-600" },
    { label: "In Progress", value: inProgress, icon: Clock, color: "bg-amber-100 text-amber-600" },
    { label: "Pending", value: pending, icon: Users, color: "bg-slate-100 text-slate-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
        <p className="mt-1 text-sm text-slate-500">Project at a glance</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {loading
          ? [...Array(4)].map((_, i) => <div key={i} className="h-24 animate-pulse rounded-2xl bg-white border border-slate-100" />)
          : statCards.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                  <Icon size={18} />
                </div>
                <p className="text-2xl font-bold text-slate-900">{value}</p>
                <p className="mt-0.5 text-sm text-slate-500">{label}</p>
              </div>
            ))}
      </div>

      {/* Progress bar */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-700">Overall Progress</p>
          <span className="text-sm font-bold text-violet-600">{progress}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-400">{done} of {total} tasks completed</p>
      </div>

      {/* Quick links */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <p className="mb-4 text-sm font-semibold text-slate-700">Quick Access</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {quickLinks.map(({ label, path, icon: Icon, color }) => (
            <Link
              key={label}
              to={path}
              className={`flex flex-col items-center gap-2.5 rounded-2xl px-4 py-4 text-xs font-semibold transition ${color}`}
            >
              <Icon size={20} />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectOverview;
