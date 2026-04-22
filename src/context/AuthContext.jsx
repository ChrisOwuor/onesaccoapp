import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const AuthContext = createContext(null);

const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.API_URL || "";

function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch (e) {
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch (err) {
      return null;
    }
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAuthenticated = !!user;

  const saveTokens = (access, refresh) => {
    setAccessToken(access);
    setRefreshToken(refresh);
    try {
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
    } catch (e) {}
  };

  const clearTokens = () => {
    setAccessToken(null);
    setRefreshToken(null);
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (e) {}
  };

  const setUserFromToken = (token) => {
    const decoded = decodeJwt(token);
    if (!decoded) return null;
    const userObj = {
      id: decoded.id || null,
      email: decoded.email || decoded.sub || null,
      username: decoded.username || null,
      role: decoded.role || decoded.roles || decoded.authority || null,
      exp: decoded.exp || null,
    };
    setUser(userObj);
    return userObj;
  };

  const logout = useCallback(() => {
    setUser(null);
    clearTokens();
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${API_BASE}/api/auth/login`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const body = await res.json();
      if (!res.ok) {
        const message =
          body?.details || body?.error || body?.message || "Login failed";
        setError(message);
        setLoading(false);
        return { ok: false, error: message };
      }

      const { accessToken: access, refreshToken: refresh } = body;
      if (!access) {
        setError("Missing access token in response");
        setLoading(false);
        return { ok: false, error: "missing_token" };
      }

      saveTokens(access, refresh || "");
      setUserFromToken(access);
      setLoading(false);
      return { ok: true };
    } catch (err) {
      setError(err?.message || String(err));
      setLoading(false);
      return { ok: false, error: err };
    }
  }, []);

  useEffect(() => {
    // initialize from stored tokens
    const stored = localStorage.getItem("accessToken");
    const storedRefresh = localStorage.getItem("refreshToken");
    if (stored) {
      const decoded = decodeJwt(stored);
      const now = Date.now() / 1000;
      if (decoded && (!decoded.exp || decoded.exp > now)) {
        setAccessToken(stored);
        setRefreshToken(storedRefresh);
        setUserFromToken(stored);
      } else {
        clearTokens();
      }
    }
    setLoading(false);
  }, []);

  const hasRole = (role) => {
    if (!user) return false;
    if (!role) return true;
    const r = user.role;
    if (!r) return false;
    if (Array.isArray(r)) return r.includes(role);
    return String(r).toLowerCase() === String(role).toLowerCase();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        login,
        logout,
        isAuthenticated,
        loading,
        error,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
