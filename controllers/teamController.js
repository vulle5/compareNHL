const teamRoutes = require('express').Router();
const querystring = require('querystring');
const axios = require('axios');

teamRoutes.get('', async (req, res) => {
  try {
    const { data } = await axios.get(
      'https://statsapi.web.nhl.com/api/v1/teams'
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
      }/?${querystring.stringify(req.query)}`
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

teamRoutes.get('/:id/logo', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://www-league.nhlstatic.com/images/logos/teams-current-circle/${req.params.id}.svg`
    );
    res.writeHead(200, {
      'Cache-Control': 'max-age=604800',
      'Content-Type': 'image/svg+xml'
    });
    res.end(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = teamRoutes;
