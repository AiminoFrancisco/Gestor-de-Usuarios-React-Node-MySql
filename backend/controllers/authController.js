const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwtConfig");
const { findUserByEmail, insertUsers } = require("../models/empleadoModel");

const register = (req, res) => {
    const { nombre, edad, pais, email, password } = req.body;

    bcrypt.hash(password, 8, (err, hashedPassword) => {
        if (err) {
            console.error("Error hashing password:", err);
            return res.status(500).send("Error registering user");
        }

        const newUsuario = { nombre, edad, pais, email, password: hashedPassword };

        insertUsers(newUsuario, (err, result) => {
            if (err) {
                console.error("Error executing query:", err);
                return res.status(500).send("Error registering user");
            }

            const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET, {
                expiresIn: '1h',
            });

            res.status(201).json({ token, message: "User registered successfully" });
        });
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    findUserByEmail(email, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send("Server error");
        }
        if (results.length === 0) {
            return res.status(401).send("Unauthorized: User not found");
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).send("Server error");
            }
            if (!isMatch) {
                return res.status(401).send("Unauthorized: Incorrect password");
            }

            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
                expiresIn: '1h',
            });
            res.status(200).json({ token, message: "Login successful" });
        });
    });
};

const updatePassword = (req, res) => {
    const { password } = req.body;

    bcrypt.hash(password, 8, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send("Error hashing password");
        }

        const { id } = req.params;
        const data = { password: hashedPassword };

        updateUsers(id, data, (err, result) => {
            if (err) {
                return res.status(500).send("Error updating users");
            }

            const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, message: "Password updated successfully" });
        });
    });
};

module.exports = {
    register,
    login,
    updatePassword
};
