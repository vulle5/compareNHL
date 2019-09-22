import axios from 'axios';

const teamURL = '/api/teams/';

const getTeams = async () => {
  const response = await axios.get(teamURL);
  return response.data;
};

const getTeam = async (id, mod) => {
  const response = await axios.get(`${teamURL}${id}/${mod}`);
  return response.data;
};

export default { getTeams, getTeam };
