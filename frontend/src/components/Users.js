import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

const Users = () => {
	const [users, setUsers] = useState();
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		console.log('users useeffect working');
		let isMounted = true;
		// Cancels request if we want to unmount
		const controller = new AbortController();

		const getUsers = async () => {
			try {
				const resp = await axiosPrivate.get('/users/', {
					signal: controller.signal,
				});
				console.log(resp.data);
				isMounted && setUsers(resp.data);
			} catch (err) {
				console.log(err);
				navigate('/login', { state: { from: location }, replace: true });
			}
		};

		getUsers();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	return (
		<>
			<h2>Users List</h2>
			{users?.length ? (
				<ul>
					{users.map((user, i) => (
						<li key={i}>{user?.username}</li>
					))}
				</ul>
			) : (
				<p>No users to display</p>
			)}
		</>
	);
};

export default Users;
