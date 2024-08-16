import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [pais, setPais] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, edad, pais, email, password }),
      });

      if (response.ok) {
        Swal.fire("Success", "User registered successfully", "success");
        navigate("/login"); 
      } else {
        const error = await response.text();
        Swal.fire("Error", error || "Error registering user", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-container">

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="number"
        placeholder="Edad"
        value={edad}
        onChange={(e) => setEdad(e.target.value)}
      />
      <input
        type="text"
        placeholder="País"
        value={pais}
        onChange={(e) => setPais(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Registrarse</button>
    
    </div>
  );
};

export default Register;
