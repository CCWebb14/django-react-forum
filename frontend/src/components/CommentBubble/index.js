import React from 'react';

// styles
import { Wrapper, Text } from './CommentBubble.styles';

const CommentBubble = ({ body, author, id, replies, depth, callback }) => (
  <>
    <Wrapper onClick={callback} inputDepth={depth * 50 + 'px'}>
      <Text>
        <h2>{author}</h2>
        <p>{body}</p>
        <p>ID: {id}</p>
      </Text>
    </Wrapper>
  </>
);

export default CommentBubble;
