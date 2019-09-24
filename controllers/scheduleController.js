const scheduleRoutes = require('express').Router();
const querystring = require('querystring');
const axios = require('axios');

scheduleRoutes.get('', async (req, res) => {
  try {
    const { timezone } = querystring.parse(querystring.stringify(req.query));
    console.log(timezone);

    /*
      Convert time on games that come from NHL servers based on give timezone
      1: Take timezone and forEach date change date to give timezone
      2: Take timezone and forEach game change gameDate to given timezone
    */

    const { data } = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/schedule/?${querystring.stringify(
        req.query
      )}`
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = scheduleRoutes;
