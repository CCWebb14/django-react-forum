import React from 'react';

import useHomeFetch from '../hooks/useHomeFetch';

import ChatTab from './ChatTab';
import Bubble from './Bubble';
import Button from './Button';
import Spinner from './Spinner';

function Home() {
  const { state, loading, error, setIsLoadingMore } = useHomeFetch();

  if (error) return <div>Failed to retrieve posts...</div>;

  return (
    <>
      <ChatTab header="Posts">
        {state.results.map((post) => (
          <Bubble
            key={post.id}
            title={post.title}
            author={post.username}
            postID={post.id}
            commentAmt={post.comment_amt}
          />
        ))}
      </ChatTab>
      {/* shows spinner if loading */}
      {loading && <Spinner />}
      {/* Checking that there is no more pages and that it is
      not loading then displaying button */}
      {state.next !== null && !loading && (
        <Button text="Load More" callback={() => setIsLoadingMore(true)} />
      )}
    </>
  );
}

export default Home;
