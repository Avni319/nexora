import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

const columnConfig = {
  TODO: { color: "bg-slate-400", light: "bg-slate-50" },
  IN_PROGRESS: { color: "bg-violet-500", light: "bg-violet-50" },
  REVIEW: { color: "bg-amber-500", light: "bg-amber-50" },
  DONE: { color: "bg-emerald-500", light: "bg-emerald-50" },
};

function TaskColumn({ title, status, tasks, onDelete }) {
  const config = columnConfig[status] || columnConfig.TODO;

  return (
    <div className="flex min-h-[600px] flex-col rounded-3xl bg-white border border-slate-100 shadow-sm">
      {/* Column header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-2.5">
          <span className={`h-2.5 w-2.5 rounded-full ${config.color}`} />
          <h2 className="text-sm font-bold text-slate-800">{title}</h2>
        </div>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
          {tasks.length}
        </span>
      </div>

      {/* Accent line */}
      <div className={`mx-4 mb-4 h-0.5 rounded-full ${config.color} opacity-30`} />

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 rounded-2xl mx-3 mb-3 p-2 transition-all duration-200 min-h-[200px] ${
              snapshot.isDraggingOver ? `${config.light} ring-2 ring-inset ring-violet-200` : ""
            }`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`transition-all duration-150 ${
                      snapshot.isDragging ? "rotate-1 scale-105 shadow-2xl" : ""
                    }`}
                  >
                    <TaskCard task={task} onDelete={onDelete} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex h-28 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-xs text-slate-400">Drop tasks here</p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TaskColumn;
