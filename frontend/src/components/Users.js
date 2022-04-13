import { useState, useEffect } from 'react';
import axios from '../api/axios';
import useRefreshToken from '../hooks/useRefreshToken';

const Users = () => {
	const [users, setUsers] = useState();
	const refresh = useRefreshToken();

	useEffect(() => {
		console.log('users useeffect working');
		let isMounted = true;
		// Cancels request if we want to unmount
		const controller = new AbortController();

		const getUsers = async () => {
			try {
				const resp = await axios.get('/users', {
					signal: controller.signal,
				});
				console.log(resp.data);
				isMounted && setUsers(resp.data);
			} catch (err) {
				console.log(err);
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
			<button onClick={() => refresh()}>Refresh</button>
		</>
	);
};

export default Users;
