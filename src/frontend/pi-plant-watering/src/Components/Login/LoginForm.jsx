import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/auth-context";

const LoginForm = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const [auth, setAuth] = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    var body = {
      grant_type: "password",
      username: username,
      password: password,
    };
    var formBody = [];
    for (var property in body) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(body[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const response = await fetch("http://127.0.0.1:8000" + `/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });
    const data = await response.json();
    if (response.ok) {
      setAuth({
        state: {
          isFetching: false,
          isExpired: false,
          expires: data.expires,
        },
        user: {
          username: username,
          access_token: data.access_token,
          isAuthenticated: true,
        },
      });
      navigate("/");
    } else {
      throw response.statusText;
    }
  };

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="controls">
        <div className="control">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={usernameChangeHandler}
          />
        </div>
        <div className="control">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={passwordChangeHandler}
          />
        </div>
      </div>
      <div className="customWatering">
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
