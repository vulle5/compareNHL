const scheduleRoutes = require('express').Router();
const querystring = require('querystring');
const axios = require('axios');

scheduleRoutes.get('', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/schedule/?${querystring.stringify(
        req.query,
      )}`,
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = scheduleRoutes;
