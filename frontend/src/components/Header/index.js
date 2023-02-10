import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { Wrapper, Content } from './Header.styles';

function Header() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const LOGOUT_URL = '/dj-rest-auth/logout/';

  const handleLogout = async () => {
    try {
      await axiosPrivate.post(LOGOUT_URL);
      setAuth({});
      navigate('/');
    } catch (err) {
      // Handle error
    }
  };

  return (
    <Wrapper>
      <Content>
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/create-post">
          <p>Create Post</p>
        </Link>
        {auth.user ? (
          <div
            role="button"
            tabIndex={0}
            onClick={handleLogout}
            onKeyDown={handleLogout}
          >
            {auth.user}
          </div>
        ) : (
          <Link to="/login">
            <p>Login</p>
          </Link>
        )}
      </Content>
    </Wrapper>
  );
}

export default Header;
