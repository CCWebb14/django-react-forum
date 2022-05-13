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

	const renderForm = <>Works</>;

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
				{/* {state.comments.length ? renderForm : <div>Hello</div>} */}
				{/* {state.comments.map((comment) => {
					return (
						<CommentBubble
							key={comment.id}
							author={comment.author}
							body={comment.body}
							postID={comment.id}
							replies={comment.replies}
						/>
					);
				})} */}
				{/* {comments.map((comment) => (
					<CommentBubble
						key={comment.id}
						author={comment.author}
						body={comment.body}
						postID={comment.id}
						replies={comment.replies}
					/>
				))} */}
			</ChatTab>
		</>
	);
};

export default Post;
