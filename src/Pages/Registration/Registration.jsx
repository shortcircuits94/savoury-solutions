import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "../../Components/Register/Register";
import api from "../../api";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`${API_BASE_URL}/register`, formData, {
        timeout: 30000,
      });
      localStorage.setItem("authToken", response.data.authToken);
      navigate("/favourites");
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        setError("API request timed out");
      } else {
        setError(err.response?.data?.msg || "Registration failed");
      }
    }
  };
  return (
    <div className="login">
      <Register
        formData={formData}
        error={error}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Registration;
