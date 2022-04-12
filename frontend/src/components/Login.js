import React from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import axios from 'axios';

import { useHomeFetch } from '../hooks/useHomeFetch';
import { useEffect, useState } from 'react';

import { useCookies } from 'react-cookie';

import {
	App,
	TextInput,
	SubmitInput,
	LoginForm,
	InputContainer,
	ButtonContainer,
	Title,
	Error,
} from './Login.styles.js';

const Login = () => {
	// React States
	const [isIncorrect, setIsIncorrect] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [cookies, setCookie] = useCookies(['my-app-auth', 'my-refresh-token']);

	const handleSubmit = async (event) => {
		//Prevent page reload
		event.preventDefault();

		var { uname, pass } = document.forms[0];

		axios
			.post('http://127.0.0.1:8000/api/v1/dj-rest-auth/login/', {
				username: uname.value,
				password: pass.value,
			})
			.then((res) => {
				setIsSubmitted(true);
				setIsIncorrect(false);
				console.log(res);
				const { access_token, refresh_token } = res.data;
				console.log(access_token);
				console.log(refresh_token);
				setCookie('my-app-auth', access_token, {
					path: '/',
				});
				setCookie('my-refresh-token', refresh_token, {
					path: '/',
				});
			})
			.catch((err) => {
				setIsIncorrect(true);
			});
	};

	// JSX code for login form
	const renderForm = (
		<>
			<form onSubmit={handleSubmit}>
				<InputContainer>
					<label>Username </label>
					<TextInput type='text' name='uname' required />
				</InputContainer>
				<InputContainer>
					<label>Password </label>
					<TextInput type='password' name='pass' required />
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
