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
			// console.log(resp);
			// console.log(prev);
			return { ...prev, access_token: resp.data.access };
		});
		return resp.data.access;
	};
	return refresh;
};

export default useRefreshToken;
