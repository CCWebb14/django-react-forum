import axios from '../api/axios';
import { useEffect, useState } from 'react';

const initialState = {
	result: [],
};

export const usePostFetch = (postId) => {
	// Initialize state
	const [state, setState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const [postID] = useState(postId);

	const fetchPost = async () => {
		setError(false);
		setLoading(true);
		const post = await axios
			.get(`/${postID}`)
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				console.log(err);
				setError(true);
			});

		setState(() => ({
			// spread result
			...post,
		}));

		setLoading(false);
	};

	// Mount effect, initial render
	useEffect(() => {
		console.log('Grabbing from API');
		setState(initialState);
		fetchPost();
	}, []);

	return { state, loading, error };
};
