import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    state: {
      isFetching: false,
    },
    user: {
      username: "",
      access_token: "",
      isAuthenticated: false,
      full_name: "",
      email: "",
    },
  });

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
