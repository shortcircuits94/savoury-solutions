import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginCom from "../../Components/LoginCom/LoginCom";
import api from "../../api";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Remove the API_BASE_URL from here since it should be in the api.js configuration
      const response = await api.post(
        "/users/login",
        { email, password },
        {
          timeout: 10000, // Reduced timeout to 10 seconds
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.authToken) {
        localStorage.setItem("authToken", response.data.authToken);
        navigate("/favourites");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Login error:", err);

      if (err.code === "ECONNABORTED") {
        setError("Connection timed out. Please try again.");
      } else if (err.response?.status === 404) {
        setError("Login service not found. Please try again later.");
      } else if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else if (!navigator.onLine) {
        setError(
          "No internet connection. Please check your connection and try again."
        );
      } else {
        setError("Unable to connect to the server. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <LoginCom
        email={email}
        password={password}
        error={error}
        isLoading={isLoading}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Login;
