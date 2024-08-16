import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import './../styles/Form.css';

const Form = ({ editMode, employee, onSubmit, onCancel }) => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [pais, setPais] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    if (editMode && employee) {
      setNombre(employee.nombre);
      setEdad(employee.edad);
      setPais(employee.pais);
      setEmail(employee.email);
      setId(employee.id);

      setPassword(employee.password ? `${employee.password.substring(0, 8)}...` : '');
    } else {
      resetForm();
    }
  }, [editMode, employee]);

  const resetForm = () => {
    setNombre("");
    setEdad("");
    setPais("");
    setEmail("");
    setPassword("");
    setId(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (!nombre || !edad || !pais || !email) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos antes de continuar.",
      });
      return;
    }

    const data = { nombre, edad, pais, email, password: password.endsWith('...') ? '' : password, id };

    onSubmit(data); 
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="card text-center"  style={{backgroundColor:'#fff'}}>
          <div className="card-body">
            <div className="input-group mb-3">
              <span style={{ backgroundColor: "#9979d6" }} className="input-group-text" id="basic-addon1">Nombre:</span>
              <input type="text" placeholder="Ingrese su Nombre" value={nombre} className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={(event) => setNombre(event.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span style={{ backgroundColor: "#9979d6" }} className="input-group-text" id="basic-addon1">Edad:</span>
              <input type="number" placeholder="Ingrese su edad" value={edad} className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={(event) => setEdad(event.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span style={{ backgroundColor: "#9979d6" }} className="input-group-text" id="basic-addon1">País:</span>
              <input type="text" placeholder="País" value={pais} className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={(event) => setPais(event.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span style={{ backgroundColor: "#9979d6" }} className="input-group-text" id="basic-addon1">Email:</span>
              <input type="email" placeholder="Ingrese su Email" value={email} className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span style={{ backgroundColor: "#9979d6" }} className="input-group-text" id="basic-addon1">Contraseña:</span>
              <input type={showPassword ? "text" : "password"} placeholder="Ingrese su contraseña" value={password} className="form-control" aria-label="Password" aria-describedby="basic-addon1" onChange={(event) => setPassword(event.target.value)} />
              <span style={{ cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)} className="input-group-text" id="basic-addon1">{showPassword ? 'Ocultar' : 'Mostrar'}</span>
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginRight: "10px" }}>{editMode ? "Actualizar" : "Agregar"}</button>
            {editMode && <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
