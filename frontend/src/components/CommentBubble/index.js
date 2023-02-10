import React from 'react';
import PropTypes from 'prop-types';

// styles
import { Wrapper, Text } from './CommentBubble.styles';

function CommentBubble({ body, author, id, depth, callback }) {
  return (
    <Wrapper onClick={callback} inputDepth={`${depth * 50}px`}>
      <Text>
        <h2>{author}</h2>
        <p>{body}</p>
        <p>
          ID:
          {id}
        </p>
      </Text>
    </Wrapper>
  );
}

CommentBubble.propTypes = {
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired
};

export default CommentBubble;
