import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import useAuth from '../hooks/useAuth';

import {
  App,
  TextInput,
  SubmitInput,
  LoginForm,
  InputContainer,
  ButtonContainer,
  Title,
  SignUp
} from './Login.styles';

const LOGIN_URL = 'token/';

function Login() {
  const { setAuth } = useAuth();
  // React States
  // const [isIncorrect, setIsIncorrect] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();

    try {
      const resp = await axiosPrivate.post(LOGIN_URL, {
        username: user,
        password: pwd
      });
      console.log(JSON.stringify(resp?.data));
      const accessToken = resp?.data?.access_token;
      console.log(accessToken);

      setIsSubmitted(true);
      setAuth({ user, pwd, accessToken });
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
          <label htmlFor="username">Username</label>
          <TextInput
            id="username"
            type="text"
            ref={userRef}
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="password">Password</label>
          <TextInput
            id="password"
            type="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
        </InputContainer>
        <ButtonContainer>
          <SubmitInput type="submit" value="Submit" />
        </ButtonContainer>
      </form>
      <br />
      <div>Need an Account?</div>

      <Link to="/registration">
        <SignUp>Sign Up</SignUp>
      </Link>
    </>
  );

  return (
    <App>
      <LoginForm>
        <Title>Sign In</Title>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
        {/* {isIncorrect ? (
          <Error>Username or password is incorrect. Please try again.</Error>
        ) : (
          <div />
        )} */}
      </LoginForm>
    </App>
  );
}

export default Login;
