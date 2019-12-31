const liveGameRoutes = require('express').Router();
const axios = require('axios');

// TODO: Make support for specific game
function sseSetup(res) {
  // SSE Setup
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });
  res.write('\n');
}

async function getLiveData() {
  try {
    // TODO: Add this to proxy for deployment
    const { data } = await axios.get(
      'http://localhost:5000/api/schedule?timezone=Europe/Helsinki'
    );
    return data;
  } catch (error) {
    return error;
  }
}

async function sseSendEvent(req, res) {
  let messageId = 0;

  async function createEvent() {
    const data = await getLiveData();
    res.write(`id: ${messageId}\n`);
    res.write('event: liveSchedule\n');
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    messageId += 1;
    res.flush();
  }

  await createEvent();
  const intervalId = await setInterval(async () => {
    await createEvent();
  }, 10000);

  req.on('close', () => {
    clearInterval(intervalId);
  });
}

liveGameRoutes.get('', (req, res) => {
  sseSetup(res);
  sseSendEvent(req, res);
});

module.exports = liveGameRoutes;
