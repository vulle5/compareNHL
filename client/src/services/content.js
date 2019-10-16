import axios from 'axios';

const getContent = async gamePk => {
  const response = await axios.get(
    `http://statsapi.web.nhl.com/api/v1/game/${gamePk}/content`
  );
  return response.data;
};

export default { getContent };
