import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoginCom from "../../Components/LoginCom/LoginCom";
import api from "../../api";

const Login = () => {
  const handleLoginSuccess = () => {
    console.log("User logged in successfully!");
  };

  return (
    <div className="login">
      <LoginCom onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default Login;
