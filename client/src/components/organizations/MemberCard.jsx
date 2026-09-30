import { Trash2, Mail } from "lucide-react";

function MemberCard({ member, onRemove }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-bold text-white">
          {member.fullName?.charAt(0)?.toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{member.fullName}</p>
          <p className="flex items-center gap-1 text-xs text-slate-400">
            <Mail size={11} />
            {member.email}
          </p>
        </div>
      </div>
      {onRemove && (
        <button
          onClick={() => onRemove(member._id)}
          className="rounded-xl p-2 text-slate-300 transition hover:bg-red-50 hover:text-red-500"
          aria-label="Remove member"
        >
          <Trash2 size={15} />
        </button>
      )}
    </div>
  );
}

export default MemberCard;
