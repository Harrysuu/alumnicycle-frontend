import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function LifePostDelete() {
  const { postId } = useParams();
  const history = useHistory();

  useEffect(() => {
    // 发起删除帖子的请求
    axios
      .get(`/lifePost/delete/?id=${postId}`)
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
