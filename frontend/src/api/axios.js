import axios from 'axios';

const BASE_URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8000/api/v1/'
		: 'http://example.com';

export default axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});
