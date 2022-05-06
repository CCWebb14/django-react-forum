import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		const resp = await axiosPrivate.post('/refresh/');
		setAuth((prev) => {
			return { ...prev, access_token: resp.data.access_token };
		});
		return resp.data.access_token;
	};
	return refresh;
};

export default useRefreshToken;
