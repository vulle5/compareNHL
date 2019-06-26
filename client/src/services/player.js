import axios from "axios";

const baseUrl = "/api/players/";

const getPlayer = async (ids, modURL) => {
  const response = await axios.get(`${baseUrl}${ids}/${modURL}`);
  return response.data;
};

export default { getPlayer };
