const express = require("express");
const path = require("path");
const { connect } = require("./utils/db");
require("jsonwebtoken");
require("dotenv").config();

const carRoutes = require("./routes/cars.routes");
const userRoutes = require("./routes/user.routes");
const statusRoutes = require("./routes/status.routes");

connect();
const PORT = process.env.PORT || 4000;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
server.set("secretKey", "nodeRestApi"); // jwt secret token

server.use("/cars", carRoutes);
server.use("/users", userRoutes);
server.use("/status", statusRoutes);

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});

server.use(express.static(__dirname));

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});