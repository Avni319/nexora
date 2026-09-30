import { useEffect, useState } from "react";
import { X, Plus, Trash2, Loader2, Users } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { getTeams, createTeam, deleteTeam } from "../../services/teamService";

function TeamModal({ organization, onClose }) {
  const { token } = useAuth();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => { loadTeams(); }, []);

  const loadTeams = async () => {
    try {
      const response = await getTeams(token, organization._id);
      setTeams(response.teams);
    } catch { toast.error("Unable to load teams"); }
    finally { setLoading(false); }
  };

  const handleCreate = async () => {
    if (!name.trim()) return toast.error("Team name is required");
    try {
      setCreating(true);
      const response = await createTeam(token, { name, description, organization: organization._id });
      setTeams((prev) => [response.team, ...prev]);
      setName(""); setDescription("");
      toast.success("Team created");
    } catch (err) { toast.error(err.response?.data?.message || "Unable to create team"); }
    finally { setCreating(false); }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTeam(token, id);
      setTeams((prev) => prev.filter((t) => t._id !== id));
      toast.success("Team deleted");
    } catch { toast.error("Delete failed"); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Teams</h2>
            <p className="text-xs text-slate-400">{organization.name}</p>
          </div>
          <button onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>

        {/* Create form */}
        <div className="border-b border-slate-100 p-6">
          <p className="mb-3 text-sm font-semibold text-slate-700">Create a new team</p>
          <div className="space-y-3">
            <input
              value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Team name"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
            />
            <input
              value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
            />
            <button
              onClick={handleCreate} disabled={creating}
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700 disabled:opacity-60"
            >
              {creating ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
              {creating ? "Creating…" : "Create Team"}
            </button>
          </div>
        </div>

        {/* Teams list */}
        <div className="max-h-64 overflow-y-auto p-6">
          {loading ? (
            <div className="space-y-3">
              {[...Array(2)].map((_, i) => <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-100" />)}
            </div>
          ) : teams.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-10 text-center">
              <Users size={22} className="text-slate-300" />
              <p className="mt-2 text-sm text-slate-400">No teams yet. Create one above.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {teams.map((team) => (
                <div key={team._id} className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{team.name}</p>
                    {team.description && <p className="text-xs text-slate-500">{team.description}</p>}
                    <p className="mt-1 text-xs text-slate-400">{team.members?.length || 0} members</p>
                  </div>
                  <button
                    onClick={() => handleDelete(team._id)}
                    className="rounded-xl p-2 text-slate-300 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 px-6 py-4">
          <button onClick={onClose} className="w-full rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">Close</button>
        </div>
      </div>
    </div>
  );
}

export default TeamModal;
