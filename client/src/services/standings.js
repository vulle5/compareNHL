import axios from 'axios';

const standingsUrl = '/api/standings/';

const getStandings = async () => {
  const response = await axios.get(standingsUrl);
  return response.data;
}

export default { getStandings }
