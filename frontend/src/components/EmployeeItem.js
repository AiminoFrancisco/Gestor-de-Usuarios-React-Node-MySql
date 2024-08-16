import React from 'react';

const EmployeeItem = ({ employee, onEdit, onDelete }) => {
  const { id, nombre, edad, pais, email, password } = employee;

  const displayPassword = '*'.repeat(6);

  return (
    <tr>
      <td>{id}</td>
      <td>{nombre}</td>
      <td>{edad}</td>
      <td>{pais}</td>
      <td>{email}</td>
      <td>{displayPassword}</td>
      <td>
        <div className="btn-group" role="group">
          <button style={{ backgroundColor: "#FAF9A7" }} onClick={() => onEdit(employee)} type="button" className="btn">Editar</button>
          <button onClick={() => onDelete(employee)} type="button" className="btn btn-danger">Eliminar</button>
        </div>
      </td>
    </tr>
  );
};

export default EmployeeItem;
