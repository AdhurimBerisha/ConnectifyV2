import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post(
        "http://localhost:8800/api/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("Login successful", response.data);

      navigate("/dummy");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Connectify</h1>
          <p>
            Unlock powerful tools and precise control with the admin account –
            your gateway to seamless app administration and strategic oversight.
            Elevate your organizational efficiency effortlessly
          </p>
          <span>Don't you have an account?</span>
          <Link to="/adminr">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
