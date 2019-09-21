import axios from 'axios';

const URL = 'https://statsapi.web.nhl.com/api/v1/teams';

const getTeams = async () => {
  const response = await axios.get(URL);
  return response.data;
};

const getLogo = async id => {
  const response = await axios.get(
    `https://www-league.nhlstatic.com/images/logos/teams-current-circle/${id}.svg`
  );
  return response.data;
};

export default { getTeams, getLogo };
