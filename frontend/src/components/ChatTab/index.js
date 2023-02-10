import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Wrapper from './ChatTab.styles';

// children is a default thing we can grab
function ChatTab({ header, children }) {
  return (
    <Wrapper>
      <h1>{header}</h1>
      <div>{children}</div>
    </Wrapper>
  );
}

ChatTab.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.oneOf(PropTypes.element)).isRequired
};

export default ChatTab;
