import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PhoneOff, Loader2, Video } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import MeetingRoom from "../../components/meetings/MeetingRoom";
import { joinMeeting } from "../../services/meetingService";

function MeetingRoomPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { roomName, projectId } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => { loadMeeting(); }, []);

  const loadMeeting = async () => {
    try {
      const response = await joinMeeting(token, roomName);
      setMeeting(response);
    } catch {
      setError(true);
    }
  };

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-slate-900 text-white">
        <p className="text-lg font-semibold">Failed to join meeting</p>
        <button
          onClick={() => navigate(`/projects/${projectId}/meetings`)}
          className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-5 bg-slate-900 text-white">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-600 shadow-2xl shadow-violet-900">
          <Video size={36} />
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">Joining {roomName}</p>
          <p className="mt-1 text-sm text-slate-400">Connecting to meeting room…</p>
        </div>
        <Loader2 size={28} className="animate-spin text-violet-400" />
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      <button
        onClick={() => navigate(`/projects/${projectId}/meetings`)}
        className="absolute left-5 top-5 z-50 flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-red-700"
      >
        <PhoneOff size={16} />
        Leave
      </button>

      <div className="absolute left-1/2 top-5 z-50 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm">
        {roomName}
      </div>

      <MeetingRoom token={meeting.token} serverUrl={meeting.url} />
    </div>
  );
}

export default MeetingRoomPage;
