import api from "../api/axios";

export const getOrganizations = async (token) => {
  const response = await api.get("/organizations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createOrganization = async (
  token,
  organizationData
) => {
  const response = await api.post(
    "/organizations",
    organizationData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteOrganization = async (token, id) => {
  const response = await api.delete(
    `/organizations/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};