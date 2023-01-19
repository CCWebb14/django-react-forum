import React from 'react';
import { axiosPrivate } from '../../api/axios.js';
import { useRef, useEffect, useState } from 'react';


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

	const [user, setUser] = useState('');
	const [email, setEmail] = useState('');
	const [pwd, setPwd] = useState('');
	const [repeatPwd, setRepeatPwd] = useState('');
	const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
	const [emailErrorMsg, setEmailErrorMsg] = useState('');
	const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
	const [nonFieldErrorMsg, setNonFieldErrorMsg] = useState('');

	const userRef = useRef();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	const handleSubmit = async (e) => {
		//Prevent page reload
		e.preventDefault();

		setUsernameErrorMsg('');
		setEmailErrorMsg('');
		setPasswordErrorMsg('');
		setNonFieldErrorMsg('');

		try {
			const resp = await axiosPrivate.post(Registration_URL, {
				username: user,
				email: email,
				password1: pwd,
				password2: repeatPwd,
			});

			
			setUser('');
			setEmail('');
			setPwd('');
			setRepeatPwd('');
			setIsSubmitted(true);
			// navigate(from, { replace: true });
		} catch (err) {

			// TODO: 
			// Support for multiple error messages for one error type
			// Ex: Usernames can have multiple errors...
			// Username is taken, username is too short...

			setUsernameErrorMsg(err.response.data.username)
			setEmailErrorMsg(err.response.data.email)
			setPasswordErrorMsg(err.response.data.password1)
			setNonFieldErrorMsg(err.response.data.non_field_errors)
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
				<>{usernameErrorMsg}</>
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
				<>{emailErrorMsg}</>
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
				<InputContainer>
					<label>Repeat Password </label>
					<TextInput
						type='password'
						id='password2'
						onChange={(e) => setRepeatPwd(e.target.value)}
						value={repeatPwd}
						required
					/>
				</InputContainer>
				<>{passwordErrorMsg}</>
				<>{nonFieldErrorMsg}</>
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
			</RegistrationForm>
		</App>
	);
};

export default Registration;
