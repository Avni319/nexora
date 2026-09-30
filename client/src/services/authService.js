import api from "../api/axios";

export const signupUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

export const getProfile = async (token) => {
  const response = await api.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateProfile = async (token, userData) => {
  const response = await api.patch("/users/profile", userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};