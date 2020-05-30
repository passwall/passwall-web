import axios from 'axios';

export default axios.create({
  baseURL: `https://vault.passwall.io`,
  responseType: "json"
});
