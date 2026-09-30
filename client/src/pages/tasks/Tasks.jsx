import { useEffect, useState } from "react";
import { Plus, KanbanSquare, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { getTasks, deleteTask } from "../../services/taskService";
import KanbanBoard from "../../components/tasks/KanbanBoard";
import CreateTaskModal from "../../components/tasks/CreateTaskModal";

function Tasks() {
  const { projectId } = useParams();
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks(token, projectId);
      setTasks(response.tasks);
    } catch {
      toast.error("Unable to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = (task) => setTasks((prev) => [task, ...prev]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask(token, id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success("Task deleted");
    } catch {
      toast.error("Unable to delete task");
    }
  };

  const todoCount = tasks.filter((t) => t.status === "TODO").length;
  const inProgressCount = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const doneCount = tasks.filter((t) => t.status === "DONE").length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2.5 text-2xl font-bold text-slate-900">
            <KanbanSquare size={24} className="text-violet-600" />
            Kanban Board
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {tasks.length} task{tasks.length !== 1 ? "s" : ""} · drag to reorder
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
        >
          <Plus size={16} />
          New Task
        </button>
      </div>

      {/* Quick stats */}
      <div className="flex gap-3">
        {[
          { label: "Todo", count: todoCount, color: "text-slate-600 bg-slate-100" },
          { label: "In Progress", count: inProgressCount, color: "text-violet-600 bg-violet-100" },
          { label: "Done", count: doneCount, color: "text-emerald-600 bg-emerald-100" },
        ].map(({ label, count, color }) => (
          <div key={label} className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ${color}`}>
            <span>{count}</span>
            <span className="font-medium opacity-80">{label}</span>
          </div>
        ))}
      </div>

      {/* Board */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 size={28} className="animate-spin text-violet-600" />
        </div>
      ) : (
        <KanbanBoard tasks={tasks} setTasks={setTasks} onDelete={handleDelete} />
      )}

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectId={projectId}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
}

export default Tasks;
