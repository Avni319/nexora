import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Video, Plus, ArrowRight, Hash } from "lucide-react";
import toast from "react-hot-toast";

function Meetings() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [roomName, setRoomName] = useState("");

  const handleJoin = () => {
    if (!roomName.trim()) return toast.error("Enter a meeting room name");
    navigate(`/projects/${projectId}/meeting-room/${roomName.trim()}`);
  };

  const handleCreate = () => {
    const id = `nexora-${Math.random().toString(36).slice(2, 8)}`;
    navigate(`/projects/${projectId}/meeting-room/${id}`);
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-lg space-y-5">
        {/* Header card */}
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-200">
            <Video size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Video Meetings</h1>
          <p className="mt-2 text-sm text-slate-500">
            Create an instant room or join one with a code.
          </p>
        </div>

        {/* Join existing */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="mb-3 text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Hash size={15} className="text-slate-400" />
            Join with room name
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. design-review"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
            />
            <button
              onClick={handleJoin}
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700"
            >
              Join
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Create instant */}
        <button
          onClick={handleCreate}
          className="flex w-full items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-violet-200 bg-violet-50 px-6 py-5 text-sm font-semibold text-violet-700 transition hover:border-violet-400 hover:bg-violet-100"
        >
          <Plus size={18} />
          Create instant meeting room
        </button>

        <p className="text-center text-xs text-slate-400">
          Powered by LiveKit · End-to-end encrypted
        </p>
      </div>
    </div>
  );
}

export default Meetings;
