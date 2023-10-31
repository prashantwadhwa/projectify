import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isPending, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/"); // Redirect upon successful login
    } catch (error) {
      toast.error("Error logging in 🚨")
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </label>

      <button className="btn">Login</button>
    </form>
  );
};

export default Login;
