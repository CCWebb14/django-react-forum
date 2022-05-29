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

	// Initial Effect
	useEffect(() => {
		console.log('useComment mounted');
	}, []);

	useEffect(() => {
		console.log('hello');
		console.log('parentId', parentID);
		if (!isCommenting) return;

		const postComment = async () => {
			setLoading(true);
			await axiosPrivate
				.post(`comments/`, {
					parent: parentID,
					post: postID,
					body: body,
				})
				.then((res) => {
					setError(false);
					console.log(res);
					setParentID(null);
					return res.data;
				})
				.catch((err) => {
					console.log(err);
					setError(true);
				});

			setLoading(false);
		};

		console.log('useComment triggered');
		postComment();
		setIsCommenting(false);
	}, [setIsCommenting, axiosPrivate, body, isCommenting, parentID, postID]);

	return {
		loading,
		error,
		isCommenting,
		setIsCommenting,
		setBody,
		setParentID,
	};
};
