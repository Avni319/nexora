import { NavLink, useParams } from "react-router-dom";
import {
  LayoutDashboard,
  KanbanSquare,
  MessageSquare,
  FolderOpen,
  Calendar,
  Video,
} from "lucide-react";

const tabs = [
  { name: "Overview", icon: LayoutDashboard, path: "" },
  { name: "Kanban", icon: KanbanSquare, path: "kanban" },
  { name: "Chat", icon: MessageSquare, path: "chat" },
  { name: "Files", icon: FolderOpen, path: "files" },
  { name: "Calendar", icon: Calendar, path: "calendar" },
  { name: "Meetings", icon: Video, path: "meetings" },
];

function WorkspaceHeader() {
  const { projectId } = useParams();

  return (
    <div className="border-b border-slate-100 bg-white">
      <div className="flex gap-1 overflow-x-auto px-6 py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.name}
              to={`/projects/${projectId}/${tab.path}`}
              end={tab.path === ""}
              className={({ isActive }) =>
                `flex flex-shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                }`
              }
            >
              <Icon size={16} />
              {tab.name}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default WorkspaceHeader;
