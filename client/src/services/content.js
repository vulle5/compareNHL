import axios from 'axios';

const getContent = async gamePk => {
  const response = await axios.get(`/api/game/${gamePk}/content`);
  return response.data;
};

export default { getContent };
