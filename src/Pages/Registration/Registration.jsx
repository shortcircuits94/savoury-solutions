import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Register from "../../Components/Register/Register";
import api from "../../api";

const Registration = () => {
  const handleRegisterSuccess = () => {
    console.log("User registered successfully!");
  };
  return (
    <div className="login">
      <Register onRegisterSuccess={handleRegisterSuccess} />
    </div>
  );
};

export default Registration;
