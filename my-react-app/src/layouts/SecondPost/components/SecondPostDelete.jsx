import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function SecondPostDelete() {
  const { postId } = useParams();
  const history = useHistory();

  useEffect(() => {
    
    axios
      .get(`/secondPost/delete/?id=${postId}`)
      .then((response) => {
        history.push('/user/uniTradePost');
      })
      .catch((error) => {
        console.error('Error deleting second post:', error);
      });
      // eslint-disable-next-line
  }, [postId]);

  return (
    <div>
      
    </div>
  );
}