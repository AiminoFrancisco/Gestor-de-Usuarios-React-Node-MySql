import React, { useState, useEffect, useCallback } from "react";
import EmployeeItem from "./EmployeeItem";
import SearchBar from "../components/Hooks/SearchBar";
import './EmployeeTable.css'; // Importar el archivo de estilos

const EmployeeTable = ({ empleadosList, onEdit, onDelete }) => {
  const [filteredEmpleados, setFilteredEmpleados] = useState(empleadosList);

  useEffect(() => {
    setFilteredEmpleados(empleadosList);
  }, [empleadosList]);

  const handleSearch = useCallback(
    (searchTerm) => {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filteredData = empleadosList.filter((item) =>
        Object.keys(item).some((key) =>
          item[key].toString().toLowerCase().includes(lowercasedFilter)
        )
      );
      setFilteredEmpleados(filteredData);
    },
    [empleadosList]
  );

  return (
    <>
      <div className="mt-4 mb-1">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>#Id</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>País</th>
              <th>Email</th>
              <th>Password</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmpleados.map((val) => (
              <EmployeeItem
                key={val.id}
                employee={val}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeTable;
