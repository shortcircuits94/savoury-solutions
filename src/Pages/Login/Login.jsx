import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginCom from "../../Components/LoginCom/LoginCom";
import api from "../../api";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(
        `${API_BASE_URL}/login`,
        { email, password },
        {
          timeout: 30000,
        }
      );
      localStorage.setItem("authToken", data.authToken);
      navigate("/favourites");
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        setError("API request timed out");
      } else {
        setError(err.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="login">
      <LoginCom
        email={email}
        password={password}
        error={error}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Login;
