import api from "../api/axios";

export const getTasks = async (token, projectId) => {
  const response = await api.get(`/tasks/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createTask = async (token, taskData) => {
  const response = await api.post("/tasks", taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const moveTask = async (
  token,
  taskId,
  status
) => {
  const response = await api.patch(
    `/tasks/${taskId}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteTask = async (
  token,
  taskId
) => {
  const response = await api.delete(
    `/tasks/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};