import axios from 'axios';

export default axios.create({
  baseURL: `https://vault.passwall.io`,
  // baseURL: `http://localhost:3625`,
  responseType: "json"
});