const express = require("express");
const router = express.Router();
const { createUserss, getAllUsers, updateUsersDetails, deleteUsers } = require("../controllers/empleadoController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/create", verifyToken, createUserss);
router.get("/users", verifyToken, getAllUsers);
router.put("/update", verifyToken, updateUsersDetails);
router.delete("/delete/:id", verifyToken, deleteUsers);

module.exports = router;
