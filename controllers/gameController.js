const gameRoutes = require('express').Router();
const axios = require('axios');

gameRoutes.get('/:id/', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/game/${req.params.id}/feed/live`
    );
    const isFinished = data.gameData.detailedState;
    if (isFinished === 'Final') {
      res.setHeader('Cache-Control', 'max-age=10, public');
    } else {
      res.setHeader('Cache-Control', 'max-age=60, public');
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

gameRoutes.get('/:id/content', async (req, res) => {
  try {
    const { data } = await axios.get(
      `http://statsapi.web.nhl.com/api/v1/game/${req.params.id}/content`
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = gameRoutes;
