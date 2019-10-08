const liveGameRoutes = require('express').Router();
// const axios = require('axios');

function sseDemo(req, res) {
  let messageId = 0;

  const intervalId = setInterval(() => {
    res.write(`id: ${messageId}\n`);
    res.write('event: date\n');
    res.write(`data: ${new Date()}\n\n`);
    messageId += 1;
    res.flush();
  }, 1000);

  req.on('close', () => {
    clearInterval(intervalId);
  });
}

liveGameRoutes.get('', (req, res) => {
  // SSE Setup
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });
  res.write('\n');

  sseDemo(req, res);
});

module.exports = liveGameRoutes;
