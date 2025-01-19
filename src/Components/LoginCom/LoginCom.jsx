import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import api from "../../api";

const LoginCom = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/users/login", { email, password });
      const token = response.data.token || response.data.authToken;

      if (!token) {
        throw new Error("No token received from server");
      }

      localStorage.setItem("authToken", token);
      onLoginSuccess(); // Call this before navigation
      navigate("/favourites");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleLogin}>
        <h2 className="login__title">Login</h2>
        {error && <p className="login__error">{error}</p>}
        <input
          type="email"
          className="login__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="login__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login__button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginCom;
