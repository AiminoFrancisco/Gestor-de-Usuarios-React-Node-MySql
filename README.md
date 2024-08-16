# Workanda - Prueba Técnica

## Descripción

**Workanda** es un proyecto de prueba técnica para una empresa. El proyecto es una aplicación web que incluye un formulario de login y un CRUD para gestionar usuarios.
Una vez que un usuario inicie sesión, podrá ver una lista de usuarios y realizar operaciones de añadir, modificar o eliminar usuarios.

### Tecnologías Utilizadas

- **Frontend**: React
- **Backend**: Node.js
- **Base de Datos**: MySQL


Crear la Base de Datos
Antes de iniciar la aplicación, debes crear la base de datos y la tabla necesaria. Ejecuta los siguientes comandos en tu cliente MySQL:


CREATE DATABASE usuarios_crud;

USE usuarios_crud;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    edad INT NOT NULL,
    pais VARCHAR(255) NOT NULL,
    cargo VARCHAR(255) NOT NULL,
    anios INT NOT NULL
);

Configuración del Backend

Instala las dependencias del backend:
npm install
Inicia el servidor: node app.js

Configuración del Frontend
Instala las dependencias del frontend:
npm install
Inicia la aplicación React: npm start


Funcionalidades
Login: Permite a los usuarios iniciar sesión.
CRUD de Usuarios: Una vez autenticado, el usuario puede:
Ver una lista de usuarios.
Añadir nuevos usuarios.
Modificar usuarios existentes.
Eliminar usuarios.


Contacto
Para cualquier duda o comentario, puedes contactar a franciscoaimino2001@gmail.com

¡Gracias por revisar mi prueba técnica!
