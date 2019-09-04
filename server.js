const express = require("express");
const userRoutes = require("./routes/userRoutes");
const server = express();

server.use("/api/users", userRoutes);

module.exports = server;
