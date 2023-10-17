import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image, Col, Row } from 'react-bootstrap';
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
      
      <div>
        
        <Link to={`/ViewOtherUser/${creator.id}`}> {/* 使用 Link 组件来导航到 ViewUser 页面 */}
          <div className="circular-image">
            <Image src={`/common/download?name=${creator.picture}`} fluid roundedCircle />
          </div>
        
          <Row>
            <Col className="text-center"> {/* 使用 Col 组件并添加 text-center 类名来居中文本 */}
              <p>{creator.username}</p>
            </Col>
          </Row>
        </Link>
      </div>
    ) : null
  );
}

export default LifePostUserCreator;
