import api from "../api/axios";

export const getEvents = async (
  token,
  projectId
) => {
  const response = await api.get(
    `/events/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const createEvent = async (
  token,
  data
) => {
  const response = await api.post(
    "/events",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteEvent = async (
  token,
  id
) => {
  const response = await api.delete(
    `/events/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};