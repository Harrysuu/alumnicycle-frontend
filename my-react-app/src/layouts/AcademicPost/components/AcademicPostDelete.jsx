import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function AcademicPostDelete() {
  const { postId } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/forumPost/delete/?id=${postId}`)
      .then((response) => {
        history.push('/user/posts');
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
       
      });
      // eslint-disable-next-line
  }, [postId]);

  return (
    <div>
    
    </div>
  );
}
