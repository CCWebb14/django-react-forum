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

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const userRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [title, body]);

  const handleSubmit = async (e) => {
    //Prevent page reload
    e.preventDefault();

    try {
      const resp = await axiosPrivate.post(LOGIN_URL, {
        title: title,
        body: body,
      });
      console.log(JSON.stringify(resp?.data));
      setIsSubmitted(true);
      setTitle('');
      setBody('');
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
            type="text"
            id="title"
            ref={userRef}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </InputContainer>
        <InputContainer>
          <label>Body </label>
          <TextInput
            type="text"
            id="body"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            required
          />
        </InputContainer>
        <ButtonContainer>
          <SubmitInput type="submit" value={'Submit'} />
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
