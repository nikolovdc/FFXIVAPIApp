import axios from 'https://cdn.skypack.dev/axios';
const api = axios.create({
  baseURL: 'http://localhost:6003',
  headers: {
	'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;