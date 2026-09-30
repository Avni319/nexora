import { X } from "lucide-react";
import Avatar from "../ui/Avatar";

function MemberList({ members, onRemove }) {
  if (!members?.length) {
    return <p className="text-sm text-slate-400">No members yet</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {members.map((member) => (
        <div
          key={member._id}
          className="flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 pl-2 pr-1 py-1"
        >
          <Avatar name={member.fullName} size="sm" />
          <span className="text-xs font-medium text-violet-700">{member.fullName}</span>
          {onRemove && (
            <button
              onClick={() => onRemove(member._id)}
              className="flex h-5 w-5 items-center justify-center rounded-full text-violet-400 transition hover:bg-violet-100 hover:text-violet-600"
            >
              <X size={11} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default MemberList;
