import axios from 'axios';

const teamURL = '/api/teams';

const getTeams = async () => {
  const response = await axios.get(teamURL);
  return response.data;
};

export default { getTeams };
