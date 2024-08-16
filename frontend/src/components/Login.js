import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Login.css";
import Register from "./Register";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        Swal.fire("Success", "Login successful", "success");
        onLogin();
        navigate("/crud");
      } else {
        const error = await response.text();
        Swal.fire("Error", error || "Login failed", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <h1
        style={{
          color: "#FFF",
          marginBottom: "20px",
          fontSize: "3rem",
        }}
      >
        Gestión de Usuarios
      </h1>
      <div className="login-main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <Register />
          </form>
        </div>

        <div className="login">
          <form>
            <label
              style={{ color: "#573b8a" }}
              htmlFor="chk"
              aria-hidden="true"
            >
              <span className="mt-1">Login</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
      <footer
        style={{
          color: "#fff",
          textAlign: "center",
          padding: "10px",
          position: "absolute",
          bottom: "0",
          justifyContent: "center",
          backgroundColor: "#24243e",
        }}
      >
        Copyright ©2024 by Francisco Aimino
      </footer>
    </div>
  );
};

export default Login;
