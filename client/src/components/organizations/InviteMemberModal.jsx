import { useEffect, useState } from "react";
import { X, UserPlus, Trash2, Loader2, Users } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import {
  getMembers,
  addMember,
  removeMember,
} from "../../services/organizationMemberService";

function InviteMemberModal({ organization, onClose }) {
  const { token } = useAuth();
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await getMembers(token, organization._id);
      setMembers(response.members || []);
    } catch {
      toast.error("Unable to load members");
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setInviting(true);
      const response = await addMember(token, organization._id, email);
      toast.success("Member invited successfully");
      setEmail("");
      // Refresh members
      fetchMembers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to invite member");
    } finally {
      setInviting(false);
    }
  };

  const handleRemove = async (memberId) => {
    if (!window.confirm("Remove this member?")) return;
    try {
      await removeMember(token, organization._id, memberId);
      setMembers((prev) => prev.filter((m) => m._id !== memberId));
      toast.success("Member removed");
    } catch {
      toast.error("Unable to remove member");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Organization Members</h2>
            <p className="mt-0.5 text-sm text-slate-500">{organization.name}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Invite form */}
        <div className="border-b border-slate-100 p-6">
          <p className="mb-3 text-sm font-semibold text-slate-700">Invite by email</p>
          <form onSubmit={handleInvite} className="flex gap-2">
            <input
              type="email"
              placeholder="colleague@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
            <button
              type="submit"
              disabled={inviting || !email.trim()}
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
            >
              {inviting ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
              Invite
            </button>
          </form>
        </div>

        {/* Members list */}
        <div className="max-h-72 overflow-y-auto p-6">
          <p className="mb-3 text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Users size={15} />
            {members.length} Member{members.length !== 1 ? "s" : ""}
          </p>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-100" />
              ))}
            </div>
          ) : members.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">
              No members yet. Invite someone to get started.
            </p>
          ) : (
            <div className="space-y-2">
              {members.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-600">
                      {member.fullName?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{member.fullName}</p>
                      <p className="text-xs text-slate-400">{member.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(member._id)}
                    className="rounded-xl p-2 text-slate-300 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default InviteMemberModal;
