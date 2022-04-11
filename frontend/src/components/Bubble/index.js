import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper, Text } from './Bubble.styles';

// Styles

const Bubble = ({ title, body, author, postID, clickable }) => (
	<>
		{clickable ? (
			<Link to={`/${postID}`}>
				<Wrapper>
					<Text>
						<h1>{title}</h1>
						<h2>{author}</h2>
						<p>{body}</p>
					</Text>
				</Wrapper>
			</Link>
		) : (
			<span>title</span>
		)}
	</>
);

export default Bubble;
