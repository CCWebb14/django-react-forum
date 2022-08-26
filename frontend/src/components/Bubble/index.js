import React from 'react';
import { Link } from 'react-router-dom';

// styles
import { Wrapper, Text, Image } from './Bubble.styles';

const Bubble = ({
	title,
	body,
	author,
	postID,
	comment_amt,
	url,
	clickable,
}) => (
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
					<Image src={url} />
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
				{/* <Image>{url}</Image> */}
				<Image src={url} />
			</Wrapper>
		)}
	</>
);

export default Bubble;
