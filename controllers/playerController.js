const playerRoutes = require("express").Router();
const querystring = require("querystring");
const axios = require("axios");

function playerParser(data) {
  data.people[0].stats[0].splits.forEach(season => {
    season.league.name === "National Hockey League"
      ? (season.league.name = "NHL")
      : null;
  });
  return data;
}

playerRoutes.get("/:id", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/people/${
        req.params.id
      }/?${querystring.stringify(req.query)}`
    );
    const newData = playerParser(data);
    res.status(200).json(newData);
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
      `https://suggest.svc.nhl.com/svc/suggest/v1/minplayers/${
        req.params.term
      }/99999`
    );
    if (data.suggestions.length === 0) {
      res.status(400).json("No players were found");
    } else {
      res.status(200).json(data);
    }
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
    try {
      const { data } = await axios.get(
        "https://is5-ssl.mzstatic.com/image/thumb/Purple62/v4/e3/45/ed/e345edf0-a8b0-6919-746e-cf8d67e3e323/source/1280x1280bb.jpg",
        {
          responseType: "arraybuffer"
        }
      );
      const img = new Buffer.from(data, "base64")
      res.writeHead(200, {
        "Content-Type": "image/jpeg",
        "Content-Length": img.length
      });
      res.end(img);
    } catch (error) { 
      res.status(400).json(error);
    }
  }
});

module.exports = playerRoutes;
