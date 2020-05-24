import axios from 'axios';

export default axios.create({
  // baseURL: `http://localhost:3625`,
  baseURL: `http://89.252.131.83:3625`,
  responseType: "json"
});
