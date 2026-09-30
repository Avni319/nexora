import { DragDropContext } from "@hello-pangea/dnd";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { moveTask } from "../../services/taskService";
import TaskColumn from "./TaskColumn";

const columns = [
  { title: "Todo", status: "TODO" },
  { title: "In Progress", status: "IN_PROGRESS" },
  { title: "Review", status: "REVIEW" },
  { title: "Done", status: "DONE" },
];

function KanbanBoard({ tasks, setTasks, onDelete }) {
  const { token } = useAuth();

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Optimistic update
    setTasks((prev) =>
      prev.map((task) =>
        task._id === draggableId ? { ...task, status: destination.droppableId } : task
      )
    );

    try {
      await moveTask(token, draggableId, destination.droppableId);
    } catch {
      toast.error("Unable to move task");
      // Revert
      setTasks((prev) =>
        prev.map((task) =>
          task._id === draggableId ? { ...task, status: source.droppableId } : task
        )
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid gap-4 lg:grid-cols-4">
        {columns.map((col) => (
          <TaskColumn
            key={col.status}
            title={col.title}
            status={col.status}
            tasks={tasks.filter((t) => t.status === col.status)}
            onDelete={onDelete}
          />
        ))}
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
