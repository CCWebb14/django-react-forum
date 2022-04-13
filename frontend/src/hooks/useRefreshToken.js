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
			console.log(JSON.stringify(prev));
			console.log(resp.data.accessToken);
			return { ...prev, accessToken: resp.data.accessToken };
		});
		return resp.data.accessToken;
	};
	return refresh;
};

export default useRefreshToken;
