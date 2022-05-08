import React from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
	App,
	TextInput,
	SubmitInput,
	LoginForm,
	InputContainer,
	ButtonContainer,
	Title,
	Error,
} from '../Login.styles.js';

const LOGIN_URL = '';

const CreatePost = () => {
	// React States
	const [isIncorrect, setIsIncorrect] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const axiosPrivate = useAxiosPrivate();

	// const { setAuth } = useAuth();

	const [user, setUser] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');

	const userRef = useRef();
	const errRef = useRef();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd]);

	const handleSubmit = async (e) => {
		//Prevent page reload
		e.preventDefault();

		try {
			const resp = await axiosPrivate.post(LOGIN_URL, {
				title: user,
				body: pwd,
			});
			console.log(JSON.stringify(resp?.data));
			setIsSubmitted(true);
			setUser('');
			setPwd('');
		} catch (err) {
			console.log(err);
		}
	};

	// JSX code for login form
	const renderForm = (
		<>
			<form onSubmit={handleSubmit}>
				<InputContainer>
					<label>Title</label>
					<TextInput
						type='text'
						id='title'
						ref={userRef}
						onChange={(e) => setUser(e.target.value)}
						value={user}
						required
					/>
				</InputContainer>
				<InputContainer>
					<label>Body </label>
					<TextInput
						type='text'
						id='body'
						onChange={(e) => setPwd(e.target.value)}
						value={pwd}
						required
					/>
				</InputContainer>
				<ButtonContainer>
					<SubmitInput type='submit' />
				</ButtonContainer>
			</form>
		</>
	);

	return (
		<App>
			<LoginForm>
				<Title>Create Post</Title>
				{isSubmitted ? <div>Post successfully submitted</div> : renderForm}
				{isIncorrect ? <Error>Error</Error> : <div></div>}
			</LoginForm>
		</App>
	);
};

export default CreatePost;
