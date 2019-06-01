const playerRoutes = require("express").Router();
const querystring = require("querystring");
const axios = require("axios");

playerRoutes.get("/:id", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/people/${
        req.params.id
      }/?${querystring.stringify(req.query)}`
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

playerRoutes.get("/:id/logs", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/people/${
        req.params.id
      }/stats?${querystring.stringify(req.query)}`
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

playerRoutes.get("/search/:term", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://suggest.svc.nhl.com/svc/suggest/v1/minplayers/${req.params.term}`
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

playerRoutes.get("/image/:id", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://nhl.bamcontent.com/images/actionshots/${req.params.id}.jpg`,
      {
        responseType: "arraybuffer"
      }
    );
    const img = new Buffer.from(data, "base64");
    res.writeHead(200, {
      "Content-Type": "image/jpeg",
      "Content-Length": img.length
    });
    res.end(img);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = playerRoutes;
