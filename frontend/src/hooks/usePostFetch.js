import { useEffect, useState } from 'react';
import axios from '../api/axios';

const initialState = {
  result: []
};

const usePostFetch = (postId) => {
  // Initialize state
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [postID] = useState(postId);

  const fetchPost = async () => {
    setError(false);
    setLoading(true);
    const post = await axios
      .get(`/${postID}`)
      .then((res) => res.data)
      .catch((err) => {
        // TODO: Catch and handle error
        console.log(err);
        setError(true);
      });

    setState(() => ({
      // spread result
      ...post
    }));

    setLoading(false);
  };

  // Mount effect, initial render
  useEffect(() => {
    console.log('Grabbing from API');
    setState(initialState);
    fetchPost();
  }, []);

  return { state, loading, error };
};

export default usePostFetch;
