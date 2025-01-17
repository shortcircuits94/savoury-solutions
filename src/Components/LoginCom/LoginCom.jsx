import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.scss";
import api from "../../api";

const LoginCom = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/users/login", { email, password });
      localStorage.setItem("authToken", data.authToken);

      onLoginSuccess(); // If needed, execute additional actions here
      navigate("/favourites"); // Redirect to /favourites after successful login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
