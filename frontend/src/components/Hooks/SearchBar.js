import React, { useState, useEffect } from "react";
import useDebounce from "./useDebounce";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        style={{
          borderRadius: "5px",
          padding: "10px 15px",
          border: "1px solid #ccc",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          fontSize: "16px",
          width: "100%",
          maxWidth: "400px",
        }}
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
