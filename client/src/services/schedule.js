import axios from 'axios';

const scheduleURL = '/api/schedule';

const getGamesBetween = async (start, end) => {
  const response = await axios.get(
    `${scheduleURL}?startDate=${start}&endDate=${end}`
  );
  return response.data;
};

export default { getGamesBetween };
