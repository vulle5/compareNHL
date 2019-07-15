import axios from "axios";

const baseUrl = "/api/players/";
const imageUrl = "/api/players/image/";

const getPlayer = async (ids, modURL) => {
  const response = await axios.get(`${baseUrl}${ids}/${modURL}`);
  return response.data;
};

const getImage = async (ids, options) => {
  const response = await axios.get(`${imageUrl}${ids}`, options);
  return response.data;
};

export default { getPlayer, getImage };
