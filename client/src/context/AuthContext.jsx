import { createContext, useEffect, useState } from "react";
import { getProfile } from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {

      if (!token) {
        setLoading(false);
        return;
      }

      try {

        const response = await getProfile(token);

        setUser(response.user);

      } catch (error) {

        localStorage.removeItem("token");
        setToken("");
        setUser(null);

      } finally {

        setLoading(false);

      }

    };

    loadUser();
  }, [token]);

  useEffect(() => {

    if (token) {

      localStorage.setItem("token", token);

    } else {

      localStorage.removeItem("token");

    }

  }, [token]);

  const logout = () => {
  localStorage.removeItem("token");

  setUser(null);
  setToken("");

  window.location.href = "/login";
};

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        setUser,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}