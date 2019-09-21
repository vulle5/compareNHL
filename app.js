const express = require('express');
const compression = require('compression');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const playerRoutes = require('./controllers/playerController');
const teamRoutes = require('./controllers/teamController');

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use('/api/players', playerRoutes);
app.use('/api/teams', teamRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
