import axios from 'axios';

export default axios.create({
  baseURL: process.env.VUE_APP_API_PATH,
  timeout: 20000,
});
