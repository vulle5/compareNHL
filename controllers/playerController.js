const playerRoutes = require("express").Router();

playerRoutes.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

module.exports = playerRoutes;
