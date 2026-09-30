const LOCAL_API = "http://localhost:5000";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  (import.meta.env.DEV ? LOCAL_API : "https://nexora-wil5.onrender.com");

export const apiUrl = (path = "") =>
  `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Static uploads served from the API origin (not under /api). */
export const assetUrl = (path = "") => apiUrl(path);
