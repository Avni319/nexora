import api from "../api/axios";

// Get all messages for a project
export const getMessages = async (token, projectId) => {
  const response = await api.get(
    `/messages/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Send a new message
export const sendMessage = async (token, data) => {
  const response = await api.post(
    "/messages",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};