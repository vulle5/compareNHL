import axios from 'axios';

const scheduleURL = '/api/schedule';

const getGamesBetween = async (start, end, timezone = '') => {
  const response = await axios.get(
    `${scheduleURL}?startDate=${start}&endDate=${end}&timezone=${timezone}`
  );
  return response.data;
};

export default { getGamesBetween };
