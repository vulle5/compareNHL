const playerRoutes = require('express').Router();
const querystring = require('querystring');
const axios = require('axios');
const fs = require('fs');

function playerParser(data) {
  data.people[0].stats[0].splits.forEach((season) => {
    if (season.league.name === 'National Hockey League') {
      // eslint-disable-next-line no-param-reassign
      season.league.name = 'NHL';
    }
  });
  return data;
}

function searchParser(arrayOfPlayers) {
  try {
    // Matches the state the player is from
    const getState = /\b[A-Z]{2}\b/;
    const getInfo = /[^|"\\]+/g;

    return arrayOfPlayers.map((player) => player.replace(getState, '').match(getInfo));
  } catch (error) {
    return [];
  }
}

playerRoutes.get('/:id', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/people/${
        req.params.id
      }/?${querystring.stringify(req.query)}`,
    );
    const newData = playerParser(data);
    res.status(200).json(newData);
  } catch (error) {
    res.status(400).json(error);
  }
});

playerRoutes.get('/:id/logs', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/people/${
        req.params.id
      }/stats?${querystring.stringify(req.query)}`,
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

playerRoutes.get('/search/:term', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://suggest.svc.nhl.com/svc/suggest/v1/minplayers/${req.params.term}/99999`,
    );
    if (data.suggestions.length === 0) {
      res.status(200).json('No players were found');
    } else {
      const parsedData = searchParser(data.suggestions);
      res.status(200).json(parsedData);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

playerRoutes.get('/image/:id', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://nhl.bamcontent.com/images/actionshots/${req.params.id}.jpg`,
      {
        responseType: 'arraybuffer'
      },
    );
    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': data.length
    });
    res.end(data);
  } catch (e) {
    try {
      fs.readFile('./assets/notFound.png', (err, data) => {
        res.writeHead(200, {
          'Content-Type': 'image/jpeg',
          'Content-Length': data.length
        });
        res.end(data);
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }
});

module.exports = playerRoutes;
