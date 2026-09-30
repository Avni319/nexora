import api from "../api/axios";

// Get all projects
export const getProjects = async (token) => {
  const response = await api.get("/projects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Create project
export const createProject = async (token, projectData) => {
  const response = await api.post("/projects", projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Delete project
export const deleteProject = async (token, projectId) => {
  const response = await api.delete(`/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};