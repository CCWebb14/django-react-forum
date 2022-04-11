import React from 'react';
import { Link } from 'react-router-dom';

import { Wrapper, Content} from './Header.styles';

const Header = () => (
  <Wrapper>
    <Content>
      <Link to='/'>
        <p>Home</p>
      </Link>
      <Link to='/login'>
        <p>Login</p>
      </Link>
    </Content>
  </Wrapper>
);

export default Header;