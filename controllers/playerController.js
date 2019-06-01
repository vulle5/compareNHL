const playerRoutes = require("express").Router();
const querystring = require("querystring");
const axios = require("axios");

const getData = async (url, idOrPath, mod) => {
  console.log(`${url}${idOrPath}${mod}`);
  try {
    if (mod && idOrPath) {
      const { data } = await axios.get(`${url}${idOrPath}${mod}`);
      return data;
    } else if (mod) {
      const { data } = await axios.get(url + idOrPath);
      return data;
    } else {
      const { data } = await axios.get(url);
      return data;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

playerRoutes.get("/:id", async (req, res) => {
  try {
    const response = await getData(
      "https://statsapi.web.nhl.com/api/v1/people/",
      req.params.id,
      `/?${querystring.stringify(req.query)}`
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

playerRoutes.get("/:id/logs", async (req, res) => {
  try {
    const response = await getData(
      `https://statsapi.web.nhl.com/api/v1/people/${req.params.id}/`,
      "stats",
      `?${querystring.stringify(req.query)}`
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

playerRoutes.get("/search/:term", async (req, res) => {
  try {
    const response = await getData(
      `https://suggest.svc.nhl.com/svc/suggest/v1/minplayers/${
        req.params.term
      }`,
      "",
      ""
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

// TODO: add image
// TODO: real error handling

module.exports = playerRoutes;
