import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		const resp = await axios.post('/dj-rest-auth/token/refresh/', {
			headers: { 'Content-Type': 'application/json' },
			withCredentials: true,
		});
		setAuth((prev) => {
			console.log(resp);
			console.log(prev);
			const access_token = resp.data.access;
			console.log(access_token);
			return { ...prev, access_token: resp.data.access };
		});
		return resp.data.access_token;
	};
	return refresh;
};

export default useRefreshToken;
