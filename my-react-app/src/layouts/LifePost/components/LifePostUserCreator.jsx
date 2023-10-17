import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LifePostUserCreator({ postId }) {
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/lifePost/getUser?id=${postId}`); // 发送请求以获取创建者信息
        setCreator(response.data.result);
        console.log(creator);
      } catch (error) {
        console.error('Error fetching creator data:', error);
      }
    };

    if (postId) {
      fetchUser();
    }
    // eslint-disable-next-line
  }, [postId]);

  return (
    creator ? (
      <div>
        
        <img src={`/common/download?name=${creator.picture}`} alt='Creator'></img>
        <p>Created by: {creator.username}</p>
      </div>
    ) : null
  );
  
 
}

export default LifePostUserCreator;
