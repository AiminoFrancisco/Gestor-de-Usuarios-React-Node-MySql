
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import Form from "./components/Form";
import EmployeeTable from "./components/EmployeeTable";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';


function App() {
  const [empleadosList, setEmpleadosList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const getEmpleados = () => {
    const token = localStorage.getItem('token');
    Axios.get("http://localhost:3001/api/users", {
        headers: { 'x-access-token': token }
    })
    .then((response) => setEmpleadosList(response.data))
    .catch(err => {
        console.error("Error al obtener user:", err);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener la lista de users.',
        });
    });
  };

  const handleAddOrUpdate = (employee) => {
    const token = localStorage.getItem('token');
    const url = editMode ? "http://localhost:3001/api/update" : "http://localhost:3001/api/create";

    const requestMethod = editMode ? Axios.put : Axios.post;

    requestMethod(url, employee, {
      headers: {
        'x-access-token': token,
      },
    })
    .then((response) => {
        if (response.data.token) {
            localStorage.setItem('token', response.data.token); 
        }
        getEmpleados();
        setEditMode(false);
        setCurrentEmployee(null);
        Swal.fire({
          icon: 'success',
          title: editMode ? 'Empleado actualizado' : 'Empleado agregado',
          showConfirmButton: false,
          timer: 2000,
        });
    })
    .catch(err => {
      console.error("Error al agregar/actualizar empleado:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo agregar/actualizar el empleado. Intenta de nuevo más tarde.',
      });
    });
};

  const handleEdit = (employee) => {
    setEditMode(true);
    setCurrentEmployee(employee);
  };

  const handleCancel = () => {
    setEditMode(false);
    setCurrentEmployee(null);
  };

  const handleDelete = (employee) => {
    Swal.fire({
      title: "Confirmar eliminación?",
      html: `Realmente desea eliminar a <strong>${employee.nombre}</strong> de la tabla?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token'); 
        Axios.delete(`http://localhost:3001/api/delete/${employee.id}`, {
          headers: {
            'x-access-token': token,
          },
        })
        .then(() => {
          getEmpleados();
          Swal.fire({
            icon: "success",
            title: `<strong>${employee.nombre}</strong> fue eliminado`,
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .catch(err => {
          console.error("Error al eliminar el Usuario:", err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el Usuario. Intenta de nuevo más tarde.',
          });
        });
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false); 
  };

  useEffect(() => {
    if (isAuthenticated) {
      getEmpleados();
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/crud" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
   
        <Route path="/crud" element={isAuthenticated ? (
         <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)' }}>
            <div className='container'>
            <div className="d-flex justify-content-center p-3">
                <button className="btn btn-secondary" onClick={handleLogout}>Cerrar sesión</button>
              </div>
              <div  style={{ backgroundColor: '#573b8a' }}className="card text-center ">
                <div className="card-header" style={{ fontSize: "23px",backgroundColor: '#fff' }}>
                  GESTIÓN DE USUARIOS
                </div>
                <div className="card-body" >
                  <Form 
                    editMode={editMode} 
                    employee={currentEmployee} 
                    onSubmit={handleAddOrUpdate} 
                    onCancel={handleCancel} 
                  />
                </div>
                
              </div>
              <div>

              <EmployeeTable empleadosList={empleadosList} onEdit={handleEdit} onDelete={handleDelete} />
              </div>
             
            </div>
            <footer style={{
              color: '#fff',
              textAlign: 'center',
              padding: '10px',
              position: 'absolute',
              bottom: '0',
              width: '100%',
              
            }}>
              Copyright ©2024 by Francisco Aimino
            </footer>
          </div>
        ) : (
          <Navigate to="/login" />
          
        )} />
      </Routes>
     
    </Router>
    
  );
}

export default App;

