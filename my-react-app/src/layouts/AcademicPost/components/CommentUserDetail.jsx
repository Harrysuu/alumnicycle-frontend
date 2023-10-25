import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from 'react-bootstrap';

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
    <div>
      {userDetail ? (
        <div className="d-flex align-items-center">
        {/* User Avatar */}
        <div className="circular-image mr-3" style={{ width: '50px', height: '50px', overflow: 'hidden' }}> {/* Adjust the width and height as needed */}
            {userDetail.picture ? (
                <Image
                    src={`/common/download?name=${userDetail.picture}`}
                    fluid
                    roundedCircle
                />
            ) : (
                <img
                    src="/userprofile.png"  // 替换为实际的默认图片路径
                    alt="User"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
            )}
        </div>
        
        {/* Username */}
        <p className="mb-0">{userDetail.username}</p>
    </div>
    ) : (
      <p>Loading...</p>
    )
    }
    </div>
    
  );
}

export default CommentUserDetail;