import api from "../api/axios";

export const getMembers = async (token, organizationId) => {
  const response = await api.get(
    `/organizations/${organizationId}/members`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const addMember = async (
  token,
  organizationId,
  email
) => {
  const response = await api.post(
    `/organizations/${organizationId}/members`,
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const removeMember = async (
  token,
  organizationId,
  memberId
) => {
  const response = await api.delete(
    `/organizations/${organizationId}/members/${memberId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};