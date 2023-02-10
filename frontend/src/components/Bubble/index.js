import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// styles
import { Wrapper, Text } from './Bubble.styles';

function Bubble({ title, body, author, postID, commentAmt, callback }) {
  return (
    <Link to={`/post/${postID}`} style={{ textDecoration: 'none' }}>
      <Wrapper onClick={callback}>
        <Text>
          <h1>{title}</h1>
          <h2>{author}</h2>
          <p>{body}</p>
          <p>{commentAmt} comments</p>
        </Text>
      </Wrapper>
    </Link>
  );
}

Bubble.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  postID: PropTypes.number.isRequired,
  commentAmt: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired
};
export default Bubble;
