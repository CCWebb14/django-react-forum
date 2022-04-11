import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper, Text } from './Bubble.styles';



// Styles


const Bubble = ({ title, body, postID, clickable }) => (
	<div>
		{clickable ? (
			<Link to={`/${postID}`}>
        <Wrapper>
          <Text>
            <h1>{title}</h1>
            <p>{body}</p>
          </Text>
        </Wrapper>
			</Link>
		) : (
			<span>title</span>
		)}
	</div>



  // <Wrapper>
  //     <Text>
  //       <h1>{title}</h1>
  //       <p>{body}</p>
  //     </Text>
  //   </Wrapper>
  // </>
);

export default Bubble;