const express = require("express");
const cors = require("cors");
const app = express();

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const empleadoRoutes = require("./routes/empleadoRoutes");

// Configuración de middleware
app.use(cors());
app.use(express.json());

// Registrar rutas
app.use("/api", authRoutes);
app.use("/api", empleadoRoutes);

// Iniciar el servidor
app.listen(3001, () => {
    console.log("Server running on port 3001");
});
