import axios from 'axios';
import { useEffect, useState } from 'react';

const initialState = {
	posts: [],
};

export const useHomeFetch = () => {
	const [state, setState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const fetchPosts = async () => {
		setError(false);
		setLoading(true);
		axios
			.get('http://127.0.0.1:8000/api/v1/')
			.then((res) => {
				setState({ posts: res.data });
			})
			.catch((err) => {
				console.log(err);
				setError(true);
			});

		setLoading(false);
	};

	useEffect(() => {
		// Will grab from session storage soon
		console.log('Grabbing from API');
		setState(initialState);
		fetchPosts();
	}, []);

	return { state, loading, error };
};
