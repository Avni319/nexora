import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../../services/dashboardService";
import {
  FolderKanban,
  Users,
  CheckCircle2,
  HardDrive,
  ArrowRight,
  Plus,
  TrendingUp,
} from "lucide-react";

const statCards = [
  {
    title: "Projects",
    key: "projects",
    icon: FolderKanban,
    gradient: "from-violet-50 to-violet-100/60",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    change: "+12%",
    changeColor: "text-emerald-600 bg-emerald-50",
  },
  {
    title: "Organizations",
    key: "organizations",
    icon: Users,
    gradient: "from-blue-50 to-blue-100/60",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    change: "+8%",
    changeColor: "text-emerald-600 bg-emerald-50",
  },
  {
    title: "Total Tasks",
    key: "totalTasks",
    icon: CheckCircle2,
    gradient: "from-emerald-50 to-emerald-100/60",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    change: "+15%",
    changeColor: "text-emerald-600 bg-emerald-50",
  },
  {
    title: "Storage Used",
    key: "storage",
    icon: HardDrive,
    gradient: "from-orange-50 to-orange-100/60",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    change: "+4%",
    changeColor: "text-emerald-600 bg-emerald-50",
  },
];

const quickActions = [
  { label: "New Project", to: "/projects", icon: FolderKanban, color: "bg-violet-600 text-white hover:bg-violet-700" },
  { label: "New Organization", to: "/organizations", icon: Users, color: "bg-blue-600 text-white hover:bg-blue-700" },
];

function StatSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-10 w-10 rounded-xl bg-slate-100" />
        <div className="h-6 w-14 rounded-full bg-slate-100" />
      </div>
      <div className="mt-4 h-4 w-20 rounded bg-slate-100" />
      <div className="mt-2 h-8 w-16 rounded bg-slate-100" />
    </div>
  );
}

function Dashboard() {
  const { user, token } = useAuth();
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    projects: 0,
    organizations: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    storage: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboardStats(token);
      setStats(response.stats);
      setRecentProjects(response.recentProjects || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatValue = (card) => {
    if (card.key === "storage") return `${stats.storage} MB`;
    return stats[card.key] ?? 0;
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {greeting()}, {user?.fullName?.split(" ")[0]} 👋
          </h1>
          <p className="mt-1 text-slate-500">
            Here&apos;s what&apos;s happening in your workspace today.
          </p>
        </div>
        <div className="flex gap-3">
          {quickActions.map(({ label, to, icon: Icon, color }) => (
            <Link
              key={label}
              to={to}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${color}`}
            >
              <Plus size={16} />
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {loading
          ? [...Array(4)].map((_, i) => <StatSkeleton key={i} />)
          : statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className={`rounded-3xl bg-gradient-to-br ${card.gradient} border border-slate-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg}`}>
                      <Icon size={20} className={card.iconColor} />
                    </div>
                    <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${card.changeColor}`}>
                      <TrendingUp size={11} />
                      {card.change}
                    </span>
                  </div>
                  <p className="mt-5 text-sm text-slate-500">{card.title}</p>
                  <h2 className="mt-1 text-3xl font-bold text-slate-900">{getStatValue(card)}</h2>
                </div>
              );
            })}
      </div>

      {/* Bottom grid */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Recent Projects */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Projects</h2>
            <Link
              to="/projects"
              className="flex items-center gap-1 text-sm font-semibold text-violet-600 transition hover:gap-2"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 animate-pulse rounded-2xl bg-slate-100" />
              ))}
            </div>
          ) : recentProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
                <FolderKanban size={22} className="text-violet-600" />
              </div>
              <p className="font-semibold text-slate-700">No projects yet</p>
              <p className="mt-1 text-sm text-slate-400">Create your first project to get started.</p>
              <Link
                to="/projects"
                className="mt-4 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Create Project
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentProjects.slice(0, 5).map((project) => (
                <Link
                  key={project._id}
                  to={`/projects/${project._id}`}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition hover:border-violet-100 hover:bg-violet-50/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100">
                      <FolderKanban size={16} className="text-violet-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{project.name}</p>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {project.description || "No description"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      Active
                    </span>
                    <ArrowRight size={14} className="text-slate-400" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats / Activity */}
        <div className="space-y-5">
          {/* Task breakdown */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-bold text-slate-900">Task Overview</h2>
            <div className="space-y-3">
              {[
                { label: "Completed", value: stats.completedTasks, color: "bg-emerald-500", bg: "bg-emerald-100" },
                { label: "In Progress", value: Math.max(0, stats.totalTasks - stats.completedTasks - stats.pendingTasks), color: "bg-violet-500", bg: "bg-violet-100" },
                { label: "Pending", value: stats.pendingTasks, color: "bg-orange-400", bg: "bg-orange-100" },
              ].map(({ label, value, color, bg }) => {
                const percent = stats.totalTasks > 0 ? Math.round((value / stats.totalTasks) * 100) : 0;
                return (
                  <div key={label}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${color}`} />
                        <span className="font-medium text-slate-700">{label}</span>
                      </div>
                      <span className="font-semibold text-slate-900">{value}</span>
                    </div>
                    <div className={`h-2 overflow-hidden rounded-full ${bg}`}>
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${color}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-slate-900">Quick Access</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "All Projects", to: "/projects", icon: FolderKanban, color: "bg-violet-50 text-violet-700 hover:bg-violet-100" },
                { label: "Organizations", to: "/organizations", icon: Users, color: "bg-blue-50 text-blue-700 hover:bg-blue-100" },
                { label: "My Profile", to: "/profile", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" },
                { label: "Settings", to: "/settings", icon: HardDrive, color: "bg-orange-50 text-orange-700 hover:bg-orange-100" },
              ].map(({ label, to, icon: Icon, color }) => (
                <Link
                  key={label}
                  to={to}
                  className={`flex items-center gap-2.5 rounded-2xl px-4 py-3 text-sm font-semibold transition ${color}`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
