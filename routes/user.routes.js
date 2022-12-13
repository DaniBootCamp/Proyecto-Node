const express = require("express");
const router = express.Router();
//importamos las funciones del controlador y del middleware
const { createUser, authenticate, logout } = require("../auth/jwt");

router.post("/register", createUser);
router.post("/login", authenticate);
router.post("/logout", logout)

module.exports = router;