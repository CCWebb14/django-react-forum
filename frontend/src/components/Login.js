import React from 'react';
import axios from '../api/axios.js';
import { useRef, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth.js';

import {
	App,
	TextInput,
	SubmitInput,
	LoginForm,
	InputContainer,
	ButtonContainer,
	Title,
	Error,
	SignUp,
} from './Login.styles.js';

const LOGIN_URL = 'token/';

const Login = () => {
	const { setAuth } = useAuth();
	// React States
	const [isIncorrect, setIsIncorrect] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

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
			const resp = await axios.post(LOGIN_URL, {
				username: user,
				password: pwd,
			});
			console.log(JSON.stringify(resp?.data));
			const access_token = resp?.data?.access_token;
			console.log(access_token);

			setIsSubmitted(true);
			setAuth({ user, pwd, access_token });
			setUser('');
			setPwd('');
			navigate(from, { replace: true });
		} catch (err) {
			console.log(err);
		}
	};

	// JSX code for login form
	const renderForm = (
		<>
			<form onSubmit={handleSubmit}>
				<InputContainer>
					<label>Username</label>
					<TextInput
						type='text'
						id='username'
						ref={userRef}
						onChange={(e) => setUser(e.target.value)}
						value={user}
						required
					/>
				</InputContainer>
				<InputContainer>
					<label>Password </label>
					<TextInput
						type='password'
						id='password'
						onChange={(e) => setPwd(e.target.value)}
						value={pwd}
						required
					/>
				</InputContainer>
				<ButtonContainer>
					<SubmitInput type='submit' />
				</ButtonContainer>
			</form>
			<br />
			<div>Need an Account?</div>

			<Link to='/'>
				<SignUp>Sign Up</SignUp>
			</Link>
		</>
	);

	return (
		<App>
			<LoginForm>
				<Title>Sign In</Title>
				{isSubmitted ? <div>User is successfully logged in</div> : renderForm}
				{isIncorrect ? (
					<Error>Username or password is incorrect. Please try again.</Error>
				) : (
					<div></div>
				)}
			</LoginForm>
		</App>
	);
};

export default Login;
