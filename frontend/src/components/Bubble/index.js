import React from 'react';
import { Link } from 'react-router-dom';

// styles
import { Wrapper, Text } from './Bubble.styles';

const Bubble = ({ title, body, author, postID, comment_amt, clickable }) => (
	<>
		{clickable ? (
			<Link to={`/post/${postID}`} style={{ textDecoration: 'none' }}>
				<Wrapper>
					<Text>
						<h1>{title}</h1>
						<h2>{author}</h2>
						<p>{body}</p>
						<p>{comment_amt} comments</p>
					</Text>
				</Wrapper>
			</Link>
		) : (
			<Wrapper>
				<Text>
					<h1>{title}</h1>
					<h2>{author}</h2>
					<p>{body}</p>
					<p>{comment_amt} comments</p>
				</Text>
			</Wrapper>
		)}
	</>
);

export default Bubble;
