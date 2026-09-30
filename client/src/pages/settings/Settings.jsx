import { useState } from "react";
import { Settings as SettingsIcon, User, Bell, Shield, Trash2, LogOut, Moon, Sun, Monitor } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const themes = [
  { label: "Light", icon: Sun },
  { label: "System", icon: Monitor },
  { label: "Dark", icon: Moon },
];

function Settings() {
  const { user, logout } = useAuth();
  const [activeTheme, setActiveTheme] = useState("System");
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    mentions: true,
  });

  const handleDangerAction = (action) => {
    toast.error(`${action} — coming soon`);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-slate-500">Manage your account preferences</p>
      </div>

      {/* Account */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-100">
            <User size={15} className="text-violet-600" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Account</h2>
        </div>
        <div className="rounded-2xl border border-slate-100 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 font-bold text-white">
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{user?.fullName}</p>
              <p className="text-sm text-slate-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Theme */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100">
            <Monitor size={15} className="text-slate-600" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Appearance</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {themes.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => { setActiveTheme(label); toast.success(`${label} theme — coming soon`); }}
              className={`flex flex-col items-center gap-2 rounded-2xl border py-4 text-sm font-semibold transition ${
                activeTheme === label
                  ? "border-violet-400 bg-violet-50 text-violet-700"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-400">Dark mode is coming soon.</p>
      </div>

      {/* Notifications */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100">
            <Bell size={15} className="text-blue-600" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Notifications</h2>
        </div>
        <div className="space-y-3">
          {Object.entries(notifications).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
              <div>
                <p className="text-sm font-semibold capitalize text-slate-900">{key === "email" ? "Email notifications" : key === "browser" ? "Browser push" : "Mention alerts"}</p>
                <p className="text-xs text-slate-400">{key === "email" ? "Receive activity by email" : key === "browser" ? "Desktop push notifications" : "When someone @mentions you"}</p>
              </div>
              <button
                onClick={() => setNotifications((p) => ({ ...p, [key]: !p[key] }))}
                className={`relative h-6 w-11 rounded-full transition-colors ${val ? "bg-violet-600" : "bg-slate-200"}`}
              >
                <span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${val ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="rounded-3xl border border-red-100 bg-red-50/50 p-6">
        <div className="mb-5 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-100">
            <Shield size={15} className="text-red-600" />
          </div>
          <h2 className="text-base font-bold text-red-800">Danger Zone</h2>
        </div>
        <div className="space-y-3">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-2xl border border-red-200 bg-white px-5 py-3.5 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
          >
            <LogOut size={16} />
            Sign out of Nexora
          </button>
          <button
            onClick={() => handleDangerAction("Delete account")}
            className="flex w-full items-center gap-3 rounded-2xl border border-red-200 bg-white px-5 py-3.5 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
          >
            <Trash2 size={16} />
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
