import axios from 'axios';

export default axios.create({
  // baseURL: `http://localhost:3625`,
  baseURL: `https://vault.passwall.io`,
  responseType: "json"
});
