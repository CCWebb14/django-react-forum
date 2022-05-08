import axios from '../api/axios';
import { useEffect, useState } from 'react';
import { AuthProvider } from '../context/AuthProvider';

const initialState = {
	page: 0,
	next: null,
	results: [],
};

export const useHomeFetch = () => {
	// Initial state above
	const [state, setState] = useState(initialState);

	// Initialized as false
	const [loading, setLoading] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [error, setError] = useState(false);

	const fetchPosts = async (page) => {
		setError(false);
		setLoading(true);
		const posts = await axios
			.get(`?page=${page}`)
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				console.log(err);
				setError(true);
			});

		setState((prev) => ({
			// spread, take all posts and spread them
			...posts,
			page: prev.page + 1,
			results:
				page > 1 ? [...prev.results, ...posts.results] : [...posts.results],
		}));

		setLoading(false);
	};

	// Mount effect, initial render
	useEffect(() => {
		console.log('Grabbing from API');
		setState(initialState);
		fetchPosts(1);
	}, []);

	// Load More
	useEffect(() => {
		if (!isLoadingMore) return;

		fetchPosts(state.page + 1);
		setIsLoadingMore(false);
	}, [isLoadingMore, state.page]);

	return { state, loading, error, setIsLoadingMore };
};
