import React from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useHomeFetch } from '../hooks/useHomeFetch';

import ChatTab from './ChatTab';
import Bubble from './Bubble';
import Button from './Button';
import Spinner from './Spinner';

const Home = () => {
	const { state, loading, error, setIsLoadingMore } = useHomeFetch();

	console.log(state);

	console.log(loading);
	console.log(state.page);
	console.log(state.next);

	if (error) return <div>Failed to retrieve posts...</div>;

	return (
		<>
			<ChatTab header={'Posts'}>
				{state.results.map((post) => (
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
			{/* shows spinner if loading */}
			{loading && <Spinner />}
			{/* Checking that there is no more pages and that it is 
      not loading then displaying button */}
			{state.next !== null && !loading && (
				<Button text='Load More' callback={() => setIsLoadingMore(true)} />
			)}
		</>
	);
};

export default Home;
