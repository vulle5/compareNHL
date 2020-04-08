const standingRoutes = require('express').Router();
const axios = require('axios');

standingRoutes.get('/', async (req, res) => {
  try {
      const { data } = await axios.get(
      'https://statsapi.web.nhl.com/api/v1/standings',
      );
      res.status(200).json(data);
  } catch (error) {
      res.status(400).json(error);
  }
});

module.exports = standingRoutes;  
