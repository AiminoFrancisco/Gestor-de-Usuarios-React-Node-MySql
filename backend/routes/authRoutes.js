const express = require("express");
const router = express.Router();
const { register, login, updatePassword } = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/register", register);
router.post("/login", login);
router.put("/users/:id", verifyToken, updatePassword);

module.exports = router;
