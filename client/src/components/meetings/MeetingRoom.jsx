import "@livekit/components-styles";
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from "@livekit/components-react";

function MeetingRoom({ token, serverUrl }) {
  return (
    <div className="h-screen w-screen bg-slate-900" data-lk-theme="default">
      <LiveKitRoom
        token={token}
        serverUrl={serverUrl}
        connect
        video={true}
        audio={true}
        style={{ height: "100%", width: "100%" }}
      >
        <VideoConference />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  );
}

export default MeetingRoom;
