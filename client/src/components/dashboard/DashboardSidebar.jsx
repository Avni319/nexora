import {
  FiHome,
  FiFolder,
  FiUsers,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const navLinks = [
  { to: "/dashboard", icon: FiHome, label: "Dashboard" },
  { to: "/organizations", icon: FiUsers, label: "Organizations" },
  { to: "/projects", icon: FiFolder, label: "Projects" },
  { to: "/profile", icon: FiUser, label: "Profile" },
  { to: "/settings", icon: FiSettings, label: "Settings" },
];

function DashboardSidebar() {
  const { user, logout } = useAuth();

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-violet-600 text-white shadow-md shadow-violet-200"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-100 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 text-sm font-bold text-white shadow-lg shadow-violet-200">
          N
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900">Nexora</h1>
          <p className="text-xs text-slate-400">Developer Workspace</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-5">
        <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Menu
        </p>
        {navLinks.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/dashboard"}
            className={linkClasses}
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-slate-100 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-bold text-white">
            {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{user?.fullName}</p>
            <p className="truncate text-xs text-slate-400">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
        >
          <FiLogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
