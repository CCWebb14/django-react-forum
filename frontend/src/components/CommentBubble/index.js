import React from 'react';

// styles
import { Wrapper, Text } from './CommentBubble.styles';

const CommentBubble = ({ body, author, id, replies, depth, clickable }) => (
	<>
		<Wrapper inputDepth={depth * 50 + 'px'}>
			<Text>
				{console.log(depth, 'depth')}
				{console.log(replies)}
				<h2>Author: {author}</h2>
				<p>{body}</p>
				<p>ID: {id}</p>
			</Text>
		</Wrapper>
	</>
);

export default CommentBubble;
