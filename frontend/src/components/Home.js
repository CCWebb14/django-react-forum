import React from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useHomeFetch } from '../hooks/useHomeFetch';

import ChatTab from './ChatTab';
import Bubble from './Bubble';

const Home = () => {
	const { state, loading, error } = useHomeFetch();

	console.log(state);

	if (error) return <div>Something went wrong...</div>;

	return (
		<ChatTab header={'Posts'}>
			{state.posts
				.slice(0)
				.reverse()
				.map((post) => (
					<Bubble
						key={post.id}
						clickable
						title={post.title}
						author={post.author}
						body={post.body}
						postID={post.id}
					/>
				))}
		</ChatTab>
	);
};

export default Home;
