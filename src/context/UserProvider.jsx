import { useState, useEffect } from "react";
import { UserContext } from "./userContext";
import axios from "axios";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (formData) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/dashboard";
      setIsLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setAuthError(err.response.data.msg);
        setIsLoading(false);
      }
      console.error(err);
    }
  };

  const register = async (formData) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData
      );

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/dashboard";
      setIsLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setAuthError(err.response.data.msg);
        setIsLoading(false);
      } else console.error(err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{ user, login, logout, isLoading, authError, register }}
    >
      {children}
    </UserContext.Provider>
  );
}
