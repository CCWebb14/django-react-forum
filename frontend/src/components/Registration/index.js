import React from 'react';
import { axiosPrivate } from '../../api/axios.js';
import { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


import {
	App,
	TextInput,
	SubmitInput,
	RegistrationForm,
	InputContainer,
	ButtonContainer,
	Title,
	Error,
} from './Registration.styles.js';

const Registration_URL = 'dj-rest-auth/registration/';

const Registration = () => {
	// React States
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isIncorrect, setIsIncorrect] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const [user, setUser] = useState('');
	const [email, setEmail] = useState('');
	const [pwd1, setPwd1] = useState('');
	const [pwd2, setPwd2] = useState('');

	const userRef = useRef();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	const handleSubmit = async (e) => {
		//Prevent page reload
		e.preventDefault();

		try {
			const resp = await axiosPrivate.post(Registration_URL, {
				username: user,
				email: email,
				password1: pwd1,
				password2: pwd2,
			});

			setIsSubmitted(true);
			setUser('');
			setEmail('');
			setPwd1('');
			setPwd2('');
			navigate(from, { replace: true });
		} catch (err) {
			setIsIncorrect(true);
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
					<label>Email</label>
					<TextInput
						type='text'
						id='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						required
					/>
				</InputContainer>
				<InputContainer>
					<label>Password </label>
					<TextInput
						type='password'
						id='password'
						onChange={(e) => setPwd1(e.target.value)}
						value={pwd1}
						required
					/>
				</InputContainer>
				<InputContainer>
					<label>Repeat Password </label>
					<TextInput
						type='password'
						id='password2'
						onChange={(e) => setPwd2(e.target.value)}
						value={pwd2}
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
			<RegistrationForm>
				<Title>Register</Title>
				{isSubmitted ? <div>User successfully registered</div> : renderForm}
				{isIncorrect ? (
					<Error>Something went wrong. Please try again.</Error>
				) : (
					<div></div>
				)}
			</RegistrationForm>
		</App>
	);
};

export default Registration;
