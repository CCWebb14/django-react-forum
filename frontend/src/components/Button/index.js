import React from 'react';
import PropTypes from 'prop-types';

// styles
import Wrapper from './Button.styles';

function Button({ text, callback }) {
  return <Wrapper onClick={callback}>{text}</Wrapper>;
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired
};

export default Button;
