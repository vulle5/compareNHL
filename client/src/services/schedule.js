import axios from 'axios';

const scheduleURL = '/api/schedule';

const getGamesBetween = async (start, end, timezone = '', mod = '') => {
  const response = await axios.get(
    `${scheduleURL}?startDate=${start}&endDate=${end}&timezone=${timezone}&${mod}`
  );
  return response.data;
};

export default { getGamesBetween };
