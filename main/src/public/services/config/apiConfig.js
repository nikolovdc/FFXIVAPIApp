import axios from 'https://cdn.skypack.dev/axios';
const api = axios.create({
  baseURL: 'https://ffxiv-api-app-150199820340.us-central1.run.app',
  headers: {
	'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
