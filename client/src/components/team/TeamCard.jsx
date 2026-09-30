import { Trash2, Users } from "lucide-react";
import MemberList from "./MemberList";

function TeamCard({ team, onDelete, onRemoveMember }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
            <Users size={18} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">{team.name}</h2>
            {team.description && (
              <p className="text-sm text-slate-500">{team.description}</p>
            )}
          </div>
        </div>
        <button
          onClick={() => onDelete(team._id)}
          className="flex-shrink-0 rounded-xl p-2 text-slate-300 transition hover:bg-red-50 hover:text-red-500"
          aria-label="Delete team"
        >
          <Trash2 size={15} />
        </button>
      </div>

      {team.members?.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium text-slate-400">{team.members.length} member{team.members.length !== 1 ? "s" : ""}</p>
          <MemberList
            members={team.members}
            onRemove={onRemoveMember ? (memberId) => onRemoveMember(team._id, memberId) : null}
          />
        </div>
      )}
    </div>
  );
}

export default TeamCard;
