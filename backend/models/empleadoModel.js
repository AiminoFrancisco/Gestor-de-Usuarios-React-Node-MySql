const db = require("../config/db");

const insertUsers = (data, callback) => {
    db.query('INSERT INTO users SET ?', data, callback);
};

const updateUsers = (id, data, callback) => {
    db.query('UPDATE users SET ? WHERE id = ?', [data, id], callback);
};

const deleteUsers = (id, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [id], callback);
};

const getUsers = (callback) => {
    db.query('SELECT * FROM users', callback);
};

const findUserByEmail = (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

module.exports = {
    insertUsers,
    updateUsers,
    deleteUsers,
    getUsers,
    findUserByEmail
};
