const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
