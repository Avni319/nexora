import { Video, Mic, MicOff } from "lucide-react";

const participants = [
  { name: "Avni", color: "bg-violet-500", muted: false },
  { name: "Rahul", color: "bg-blue-500", muted: true },
  { name: "Diya", color: "bg-pink-500", muted: false },
  { name: "Karan", color: "bg-emerald-500", muted: true },
];

function MeetingPreview() {
  return (
    <div className="mt-5 space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {participants.map(({ name, color, muted }) => (
          <div key={name} className="relative overflow-hidden rounded-xl bg-slate-800 p-3 flex flex-col items-center gap-2">
            <div className={`h-10 w-10 rounded-full ${color} flex items-center justify-center text-xs font-bold text-white`}>
              {name[0]}
            </div>
            <p className="text-xs text-white font-medium">{name}</p>
            <div className="absolute top-2 right-2">
              {muted
                ? <MicOff size={10} className="text-red-400" />
                : <Mic size={10} className="text-emerald-400" />
              }
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3 rounded-xl bg-slate-800 py-2">
        <Video size={13} className="text-emerald-400" />
        <span className="text-xs font-medium text-white">Weekly Standup • Live</span>
        <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
      </div>
    </div>
  );
}

export default MeetingPreview;
