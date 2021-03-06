import axios from 'axios';

const playerUrl = '/api/players/';
const searchUrl = '/api/players/search/';
const imageUrl = '/api/players/image/';

const getPlayer = async (id, modURL) => {
  const response = await axios.get(`${playerUrl}${id}/${modURL}`);
  return response.data;
};

const getSearch = async term => {
  const response = await axios.get(`${searchUrl}${term}`);
  return response.data;
};

const getMultiplePlayers = async (ids, modURL) => {
  const response = await axios.all(
    ids.map(id => axios.get(`${playerUrl}${id}/${modURL}`))
  );
  const data = response.map(response => response.data);
  return data;
};

const getImage = async (id, options) => {
  const response = await axios.get(`${imageUrl}${id}`, options);
  return response.data;
};

export default { getPlayer, getSearch, getMultiplePlayers, getImage };
