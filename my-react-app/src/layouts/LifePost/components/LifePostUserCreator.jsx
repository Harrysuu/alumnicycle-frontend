import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // 导入 Link 组件
import '../../../css/UserCreator.css'; // 导入样式文件

function LifePostUserCreator({ postId }) {
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/lifePost/getUser?id=${postId}`);
        setCreator(response.data.result);
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
      <Link to={`/ViewOtherUser/${creator.id}`}>
        <div className="d-flex flex-column align-items-center">
          <div className="circular-image">
            {/* <Image src={`/common/download?name=${creator.picture}`} fluid roundedCircle /> */}
            {creator.picture ? (
              <Image
                src={`/common/download?name=${creator.picture}`}
                fluid
                roundedCircle
              />
            ) : (
              <img
                src="/userprofile.png"  // 替换为实际的默认图片路径
                alt="User"
                style={{ maxWidth: '400px', maxHeight: '300px' }}
              />
            )}


          </div>
          <p>{creator.username}</p>
        </div>
      </Link>
    ) : null
  );
}

export default LifePostUserCreator;