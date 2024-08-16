const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { insertUsers, updateUsers, deleteUsers: deleteUsersModel, getUsers } = require("../models/empleadoModel");
const { JWT_SECRET } = require("../config/jwtConfig");

const createUserss = (req, res) => {
    const { nombre, edad, pais, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    const newempleado = { nombre, edad, pais, email, password: hashedPassword };

    insertUsers(newempleado, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send("Error inserting data");
        }
        res.status(201).send(result);
    });
};

const getAllUsers = (req, res) => {
    getUsers((err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send("Error fetching data");
        }
        res.status(200).send(result);
    });
};

const updateUsersDetails = (req, res) => {
    const { id, nombre, edad, pais, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    const data = { nombre, edad, pais, email, password: hashedPassword };

    updateUsers(id, data, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send("Error updating data");
        }
        const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, message: "Employee updated successfully" });
    });
};

const deleteUsers = (req, res) => {
    const id = req.params.id;

    deleteUsersModel(id, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send("Error deleting data");
        }
        res.status(200).send(result);
    });
};

module.exports = {
    createUserss,
    getAllUsers,
    updateUsersDetails,
    deleteUsers
};
