/* eslint-disable consistent-return */
const errorHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  if (err.isAxiosError) {
    return res.status(400).send({ error: 'API request failed' });
  }
  res.status(err.response.status).send({ error: err.stack });
  next(err);
};

module.exports = errorHandler;
