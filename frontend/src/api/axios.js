import axios from 'axios';

const baseURL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8000/api/v1'
		: 'http://example.com';

const app = axios.create({
	baseURL,
	withCredentials: true,
});

app.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error.response.data.err)
);

export default app;
