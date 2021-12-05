import { BASE_URL } from './url'
const axios = require('axios').default;

const instance = axios.create({
    baseURL: BASE_URL,
});

export default instance;
