const scheduleRoutes = require('express').Router();
const querystring = require('querystring');
const axios = require('axios');
const moment = require('moment');
require('moment-timezone');

function parseEndDateAndStartDate(startDate, endDate) {
  return [
    moment.parseZone(startDate).subtract(1, 'days'),
    moment.parseZone(endDate).add(1, 'days')
  ];
}

function gamesToClientTime(games, timezone, filterStart, filterEnd) {
  const start = filterStart.format('YYYY-MM-DD');
  const end = filterEnd.format('YYYY-MM-DD');
  const dayBefore = filterStart.subtract(1, 'days').format('YYYY-MM-DD');
  const dayAfter = filterEnd.add(1, 'days').format('YYYY-MM-DD');

  games.forEach((game) => {
    // eslint-disable-next-line no-param-reassign
    game.gameDate = moment
      .parseZone(game.gameDate)
      .tz(timezone)
      .format('YYYY-MM-DDTHH:mmZZ');
  });
  // Filter games that do not fit to api call
  return games.filter(
    ({ gameDate }) => !gameDate.includes(dayBefore)
      && !gameDate.includes(start)
      && !gameDate.includes(end)
      && !gameDate.includes(dayAfter)
  );
}

scheduleRoutes.get('', async (req, res) => {
  try {
    if (
      // Check that dates are not too far apart to avoid excessively large api calls
      moment(req.query.endDate).diff(moment(req.query.startDate), 'days') <= 20
    ) {
      // Get games from api based on given dates
      const [newStartDate, newEndDate] = parseEndDateAndStartDate(
        req.query.startDate,
        req.query.endDate
      );
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
      // Make the converted games to proper format
      const newGames = { copyright: gamesToParse.copyright, dates: [] };
      for (
        let index = moment(req.query.startDate);
        index.get('date')
        !== moment(req.query.endDate)
          .add(1, 'days')
          .get('date');
        index.add(1, 'days')
      ) {
        newGames.dates = [
          ...newGames.dates,
          {
            date: index.format('YYYY-MM-DD'),
            games: convertedGames.filter((game) => game.gameDate.includes(index.format('YYYY-MM-DD')))
          }
        ];
      }
      res.status(200).json(newGames);
    } else {
      res.status(400).json({ message: 'Dates are too far apart (max 20)' });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = scheduleRoutes;
