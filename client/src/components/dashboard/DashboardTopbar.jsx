import { Search, Bell } from "lucide-react";
import useAuth from "../../hooks/useAuth";

function DashboardTopbar() {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-100 bg-white px-6">

      {/* Search */}
      <div className="flex w-full max-w-sm items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
        <Search size={15} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search projects, tasks..."
          className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <p className="hidden text-sm text-slate-400 lg:block">{today}</p>

        <button className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50">
          <Bell size={17} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-bold text-white">
          {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
        </div>
      </div>

    </header>
  );
}

export default DashboardTopbar;
