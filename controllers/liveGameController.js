const liveGameRoutes = require('express').Router();
const querystring = require('querystring');
const axios = require('axios');
const moment = require('moment');
const {
  gamesToClientTime
} = require('../utils/game');

// TODO: Make support for specific game
// TODO: This controller makes game and schedule controllers obsolete
function sseSetup(res) {
  // SSE Setup
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });
  res.write('\n');
}

async function getLiveSchedule(req) {
  try {
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
    return convertedGames;
  } catch (error) {
    return error;
  }
}

async function sseSendSchedule(req, res) {
  let messageId = 0;

  async function createEvent() {
    const data = await getLiveSchedule(req);
    res.write(`id: ${messageId}\n`);
    res.write('event: liveSchedule\n');
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    messageId += 1;
    res.flush();
  }

  await createEvent();
  const intervalId = await setInterval(async () => {
    await createEvent();
  }, 20000);

  req.on('close', () => {
    clearInterval(intervalId);
  });
}

liveGameRoutes.get('', (req, res) => {
  sseSetup(res);
  sseSendSchedule(req, res);
});

module.exports = liveGameRoutes;
