import api from "../api/axios";

export const getFiles = async (
  token,
  projectId
) => {
  const response = await api.get(
    `/files/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const uploadFile = async (
  token,
  formData
) => {
  const response = await api.post(
    "/files",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteFile = async (
  token,
  id
) => {
  const response = await api.delete(
    `/files/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};