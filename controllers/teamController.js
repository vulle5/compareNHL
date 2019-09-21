const teamRoutes = require('express').Router();
const querystring = require('querystring');
const axios = require('axios');

teamRoutes.get('', async (req, res) => {
  try {
    const { data } = await axios.get(
      'https://statsapi.web.nhl.com/api/v1/teams',
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

teamRoutes.get('/:id', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/teams/${
        req.params.id
      }/?${querystring.stringify(req.query)}`,
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = teamRoutes;
