import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import Post from './components/Post';

import Admin from './components/Admin';

import { GlobalStyle } from './GlobalStyle';

const App = () => (
	<Router>
		<Header />
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/admin' element={<Admin />} />
			<Route path='/create-post' element={<CreatePost />} />
			<Route path='/post/:postId' element={<Post />} />
			<Route path='/login' element={<Login />} />
		</Routes>
		<GlobalStyle />
	</Router>
);

export default App;
