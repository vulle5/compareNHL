const playerRoutes = require("express").Router();
const fetch = require("node-fetch");

const url = "https://statsapi.web.nhl.com/api/v1/people/8478427";

const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
    return err;
  }
};

playerRoutes.get("/", async (req, res) => {
  const response = await getData(url);
  res.json(response);
});

module.exports = playerRoutes;
