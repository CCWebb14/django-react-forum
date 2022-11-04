import { render } from '@testing-library/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { axiosPrivate } from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Wrapper, Content } from './Header.styles';

const Header = () => {
	const { auth, setAuth } = useAuth();
	const navigate = useNavigate();
	const LOGOUT_URL = '/dj-rest-auth/logout/';

	const handleLogout = async () => {
		try {
			const resp = await axiosPrivate.post(LOGOUT_URL);
			const access_token = resp?.data?.access_token;
			console.log(access_token);
			setAuth({});
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Wrapper>
			<Content>
				<Link to='/'>
					<p>Home</p>
				</Link>
				<Link to='/create-post'>
					<p>Create Post</p>
				</Link>
				{auth.user ? (
					<p onClick={handleLogout}>{auth.user}</p>
				) : (
					<Link to='/login'>
						<p>Login</p>
					</Link>
				)}
			</Content>
		</Wrapper>
	);
};

export default Header;
