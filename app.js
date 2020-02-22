const express = require('express');
const helmet = require('helmet');

const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const playerRoutes = require('./controllers/playerController');
const teamRoutes = require('./controllers/teamController');
const scheduleRoutes = require('./controllers/scheduleController');
const liveGameRoutes = require('./controllers/liveGameController');
const gameRoutes = require('./controllers/gameController');

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/api/players', playerRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/live', liveGameRoutes);
app.use('/api/game', gameRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
