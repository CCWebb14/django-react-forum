import React, { useRef, useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import {
  App,
  TextInput,
  SubmitInput,
  LoginForm,
  InputContainer,
  ButtonContainer,
  Title
} from '../Login.styles';

const LOGIN_URL = '';

function CreatePost() {
  // React States
  // const [isIncorrect, setIsIncorrect] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  // const { setAuth } = useAuth();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  // const [errMsg, setErrMsg] = useState('');

  const userRef = useRef();
  // const errRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    // setErrMsg('');
  }, [title, body]);

  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();

    try {
      await axiosPrivate.post(LOGIN_URL, {
        title,
        body
      });
      setIsSubmitted(true);
      setTitle('');
      setBody('');
    } catch (err) {
      // Handle error
    }
  };

  // JSX code for login form
  const renderForm = (
    <form onSubmit={handleSubmit}>
      <InputContainer>
        <label htmlFor="title">Title</label>
        <TextInput
          id="title"
          type="text"
          ref={userRef}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </InputContainer>

      <InputContainer>
        <label htmlFor="body">Body</label>
        <TextInput
          id="body"
          type="text"
          onChange={(e) => setBody(e.target.value)}
          value={body}
          required
        />
      </InputContainer>
      <ButtonContainer>
        <SubmitInput type="submit" value="Submit" />
      </ButtonContainer>
    </form>
  );

  return (
    <App>
      <LoginForm>
        <Title>Create Post</Title>
        {isSubmitted ? <div>Post successfully submitted</div> : renderForm}
        {/* {isIncorrect ? <Error>Error</Error> : <div />} */}
      </LoginForm>
    </App>
  );
}

export default CreatePost;
