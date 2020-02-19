const scheduleRoutes = require('express').Router();
const querystring = require('querystring');
const axios = require('axios');
const moment = require('moment');
const {
  gamesToClientTime
} = require('../utils/game');
require('moment-timezone');

scheduleRoutes.get('', async (req, res) => {
  try {
    if (
      // Check that dates are not too far apart to avoid excessively large api calls
      moment(req.query.endDate).diff(moment(req.query.startDate), 'days') <= 20
    ) {
      // Get games from api based on given dates
      const [newStartDate, newEndDate] = [
        moment.parseZone(req.query.startDate).subtract(1, 'days'),
        moment.parseZone(req.query.endDate).add(1, 'days')
      ];
      const { data: gamesToParse } = await axios.get(
        `https://statsapi.web.nhl.com/api/v1/schedule/?startDate=${newStartDate.format(
          'YYYY-MM-DD'
        )}&endDate=${newEndDate.format('YYYY-MM-DD')}&${querystring.stringify({
          expand: req.query.expand
        }) || ''}`
      );
      // Take games from api data and flatten
      const gamesOnly = gamesToParse.dates.flatMap((date) => date.games);
      // Convert the games to clients timezone
      const { timezone } = querystring.parse(querystring.stringify(req.query));
      const convertedGames = gamesToClientTime(
        gamesOnly,
        timezone,
        newStartDate,
        newEndDate
      );
      res.status(200).json(convertedGames);
    } else {
      res.status(400).json({ message: 'Dates are too far apart (max 20)' });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = scheduleRoutes;
