import api from "../api/axios";

export const getTeams = async (token, organizationId) => {
  const response = await api.get(
    `/teams/${organizationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const createTeam = async (token, data) => {
  const response = await api.post(
    "/teams",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteTeam = async (token, id) => {
  const response = await api.delete(
    `/teams/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateTeam = async (
  token,
  id,
  data
) => {
  const response = await api.patch(
    `/teams/${id}`,
    data,
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
  id,
  memberId
) => {
  const response = await api.post(
    `/teams/${id}/member`,
    { memberId },
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
  id,
  memberId
) => {
  const response = await api.delete(
    `/teams/${id}/member/${memberId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};