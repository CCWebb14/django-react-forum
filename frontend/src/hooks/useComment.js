import { useEffect, useState } from 'react';
import useAxiosPrivate from './useAxiosPrivate';

const useComment = (post) => {
  // Initial state as passed post ID
  const [postID] = useState(post);

  // ParentID
  const [parentID, setParentID] = useState(null);

  // Initialized as false
  const [loading, setLoading] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [error, setError] = useState(false);

  const [body, setBody] = useState('');

  // AxiosPrivate
  const axiosPrivate = useAxiosPrivate();

  // Initial Effect
  useEffect(() => {}, []);

  useEffect(() => {
    if (!isCommenting) return;

    const postComment = async () => {
      setLoading(true);
      await axiosPrivate
        .post('comments/', {
          parent: parentID,
          post: postID,
          body
        })
        .then((res) => {
          setError(false);
          setParentID(null);
          return res.data;
        })
        .catch((err) => {
          // TODO: Handle error
          console.log(err);
          setError(true);
        });

      setLoading(false);
    };

    postComment();
    setIsCommenting(false);
  }, [setIsCommenting, axiosPrivate, body, isCommenting, parentID, postID]);

  return {
    loading,
    error,
    isCommenting,
    setIsCommenting,
    setBody,
    setParentID
  };
};

export default useComment;
