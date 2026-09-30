import api from "../api/axios";

export const joinMeeting = async (token, roomName) => {
  const response = await api.post(
    "/meetings/join",
    {
      roomName,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};