import axios from 'axios';

const getContent = async (gamePk, source) => {
  const response = await axios.get(
    `http://statsapi.web.nhl.com/api/v1/game/${gamePk}/content`,
    { cancelToken: source.token }
  );
  return response.data;
};

export default { getContent };
