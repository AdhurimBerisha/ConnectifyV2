import { Link } from "react-router-dom";
import "../styles/register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [err, setErr] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      setSuccessMessage("User has been created successfully!");
      setErr(null); // Clear any previous error message

      // Reset input fields after successful registration
      setInputs({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      });
    } catch (err) {
      setSuccessMessage(null); // Clear any previous success message
      setErr(err.response?.data || "An unexpected error occurred.");
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Connectify</h1>
          <p>
            Empower your organizational efficiency with the admin account, a
            sophisticated toolset delivering precise control, strategic
            oversight, and tailored configurations for optimal app
            administration
          </p>
          <span>Do you have an account?</span>
          <Link to="/adminl">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={inputs.username}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={inputs.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={inputs.lastName}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            {err && <p style={{ color: "red" }}>{err}</p>}
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
