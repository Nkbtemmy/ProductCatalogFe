import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Optionally set default headers like API Key
export const setAuth = (apiKey: string) => {
  API.defaults.headers.common['x-api-key'] = apiKey;
};

export default API;
