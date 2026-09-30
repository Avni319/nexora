import { Trash2, Calendar, User } from "lucide-react";
import { format } from "date-fns";

const priorityConfig = {
  LOW: { color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", label: "Low" },
  MEDIUM: { color: "bg-amber-100 text-amber-700", dot: "bg-amber-500", label: "Medium" },
  HIGH: { color: "bg-red-100 text-red-700", dot: "bg-red-500", label: "High" },
};

function TaskCard({ task, onDelete }) {
  const priority = priorityConfig[task.priority] || priorityConfig.MEDIUM;

  return (
    <div className="mb-3 cursor-grab rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing">

      {/* Priority bar */}
      <div className={`mb-3 h-1 w-full rounded-full ${priority.dot}`} />

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-900 leading-snug">{task.title}</h3>
        <button
          onClick={() => onDelete(task._id)}
          className="flex-shrink-0 rounded-lg p-1.5 text-slate-300 transition hover:bg-red-50 hover:text-red-500"
          aria-label="Delete task"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Description */}
      {task.description && (
        <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${priority.color}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${priority.dot}`} />
          {priority.label}
        </span>

        <div className="flex items-center gap-2">
          {task.assignedTo && (
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-600"
              title={task.assignedTo.fullName}
            >
              {task.assignedTo.fullName?.charAt(0)}
            </div>
          )}
          {task.dueDate && (
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Calendar size={12} />
              {format(new Date(task.dueDate), "dd MMM")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
