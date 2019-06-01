const express = require("express");
const app = express();
const playerRoutes = require("./controllers/playerController");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use("/api/players", playerRoutes);

module.exports = app;
