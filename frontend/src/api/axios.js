import axios from 'axios';

const BASE_URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8000/api/v1/'
		: 'http://cooperwebb.xyz:8000/api/v1/';

const app = axios.create({
	baseURL: BASE_URL,
	// headers: { 'Content-Type': 'application/json' },
	// withCredentials: true,
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});

export default app;
