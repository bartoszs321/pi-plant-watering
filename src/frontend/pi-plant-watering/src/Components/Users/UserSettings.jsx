import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/auth-context";

const UserSettings = () => {
  const [auth, setAuth] = useContext(AuthContext);
  console.log("USER", auth);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.user.access_token}`,
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        var userData = { ...auth };
        userData.user = { ...auth.user, ...data };
        setAuth((auth) => userData);
      });
  }, []);

  return (
    <div>
      <p>{auth.user.username}</p>
      <p>{auth.user.full_name}</p>
      <p>{auth.user.email}</p>
    </div>
  );
};

export default UserSettings;
