const moment = require('moment');

// Make the converted games to proper format
function formatScheduleGames(convertedGames, startDate, endDate) {
  const newGames = { dates: [] };
  for (
    let index = moment(startDate).add(1, 'days');
    index.get('date')
    !== moment(endDate).subtract(1, 'days')
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
  return newGames;
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
  const convertedGames = games.filter(
    ({ gameDate }) => !gameDate.includes(dayBefore)
      && !gameDate.includes(start)
      && !gameDate.includes(end)
      && !gameDate.includes(dayAfter)
  );

  return formatScheduleGames(convertedGames, start, end);
}

module.exports = {
  gamesToClientTime
};
