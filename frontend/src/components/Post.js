import React from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

import ChatTab from './ChatTab';
import Bubble from './Bubble';
import Button from './Button';
import CommentBubble from './CommentBubble';
import Spinner from './Spinner';

import { usePostFetch } from '../hooks/usePostFetch';

const Post = () => {
	const { postId } = useParams();

	const { state, loading, error, setIsLoadingMore } = usePostFetch(postId);

	console.log(state);

	if (error) return <div>Failed to retrieve posts...</div>;

	const renderComments = (comments, depth) =>
		comments?.map((comment) => {
			console.log('Comment', comment);
			console.log(depth);

			const recComments = renderComments(comment.replies, depth + 1);

			return (
				<>
					<CommentBubble
						key={comment.id}
						author={comment.author}
						body={comment.body}
						id={comment.id}
						replies={comment.replies}
						depth={depth}
					/>
					{recComments}
				</>
			);
		});

	return (
		<>
			<ChatTab header={'Post'}>
				<Bubble
					key={state.id}
					title={state.title}
					author={state.author}
					body={state.body}
					postID={state.id}
					comment_amt={state.comment_amt}
				/>
				{state.comments?.length ? (
					renderComments(state.comments, 0)
				) : (
					<div>No Comments</div>
				)}
			</ChatTab>
		</>
	);
};

export default Post;
