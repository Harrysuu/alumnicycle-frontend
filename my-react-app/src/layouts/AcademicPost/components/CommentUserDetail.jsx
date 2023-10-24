import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentUserDetail({ userId }) {
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    // 发起HTTP请求来获取用户信息
    axios.get('/user/getById', { params: { userId: userId } }) //根据需要传入实际的 userId
      .then(response => {
        console.log(response.data.result);
        setUserDetail(response.data.result); // 设置用户信息到状态
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
    // eslint-disable-next-line
  }, []); // 请确保只在组件挂载时获取用户信息，因此依赖为空数组

  if (!userDetail) return null;


  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {userDetail.picture ? (
        <img 
          src={userDetail.picture} 
          alt={userDetail.username} 
          style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} 
        />
      ) : (
        <img 
          src="/userprofile.png" // 这里是你的默认图片路径
          alt="Default User" 
          style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }}
        />
      )}
      <span>{userDetail.username}</span>
    </div>
  );
}

export default CommentUserDetail;