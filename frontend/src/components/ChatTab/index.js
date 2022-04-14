import React from 'react';

// Styles
import { Wrapper } from './ChatTab.styles';

// children is a default thing we can grab
const ChatTab = ({ header, children }) => (
	<Wrapper>
		<h1>{header}</h1>
		<div>{children}</div>
	</Wrapper>
);

export default ChatTab;
