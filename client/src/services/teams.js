import axios from 'axios';

const teamURL = '/api/teams';

const getTeams = async () => {
  const response = await axios.get(teamURL);
  return response.data;
};

const getLogo = async id => {
  const response = await axios.get(
    `https://www-league.nhlstatic.com/images/logos/teams-current-circle/${id}.svg`
  );
  return response.data;
};

export default { getTeams, getLogo };
