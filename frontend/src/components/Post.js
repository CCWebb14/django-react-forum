import React from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

import ChatTab from './ChatTab';
import Bubble from './Bubble';
import Button from './Button';
import Spinner from './Spinner';

import { usePostFetch } from '../hooks/usePostFetch';

const Post = () => {
	const { postId } = useParams();

	const { state, loading, error, setIsLoadingMore } = usePostFetch(postId);

	console.log(state);
	// if (error) return <div>Failed to retrieve posts...</div>;

	if (error) return <div>Failed to retrieve posts...</div>;

	return (
		<>
			<ChatTab>
				<Bubble
					key={state.id}
					title={state.title}
					author={state.author}
					body={state.body}
					postID={state.id}
					comment_amt={state.comment_amt}
				/>
			</ChatTab>
		</>
	);
};

export default Post;
