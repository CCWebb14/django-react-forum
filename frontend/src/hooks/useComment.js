import useAxiosPrivate from './useAxiosPrivate';
import { useEffect, useState } from 'react';

export const useComment = (post) => {
	// Initial state as passed post ID
	const [postID] = useState(post);

	// ParentID
	const [parentID, setParentID] = useState(null);

	// Initialized as false
	const [loading, setLoading] = useState(false);
	const [isCommenting, setIsCommenting] = useState(false);
	const [error, setError] = useState(false);

	const [body, setBody] = useState('');

	// AxiosPrivate
	const axiosPrivate = useAxiosPrivate();

	const postComment = async () => {
		setError(false);
		setLoading(true);
		const posts = await axiosPrivate
			.post(`comments/`, {
				parent_id: parentID,
				post: postID,
				body: body,
			})
			.then((res) => {
				setParentID(null);
				return res.data;
			})
			.catch((err) => {
				console.log(err);
				setError(true);
			});

		setLoading(false);
	};

	useEffect(() => {
		console.log('useComment mounted');
	}, []);

	// Mount effect, initial render
	useEffect(() => {
		if (!isCommenting) return;

		console.log('useComment triggered');
		postComment();
		setIsCommenting(false);
	}, [setBody]);

	return {
		loading,
		error,
		isCommenting,
		setIsCommenting,
		setBody,
		setParentID,
	};
};
