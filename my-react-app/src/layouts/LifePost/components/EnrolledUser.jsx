import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // 导入 Link 组件
import '../../../css/UserCreator.css'; // 导入样式文件

function EnrolledUser({ userId }) {
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    // 发起HTTP请求来获取用户信息
    axios.get('/user/getById', { params: { userId: userId } }) // 1 是示例的 userId，您可以根据需要传入实际的 userId
      .then(response => {
        console.log(response.data.result);
        setCreator(response.data.result); // 设置用户信息到状态
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
      // eslint-disable-next-line
  }, []); // 请确保只在组件挂载时获取用户信息，因此依赖为空数组


  return (
    creator ? (
      <Link to={`/ViewOtherUser/${creator.id}`}>
        <div className="d-flex flex-column align-items-center">
          <div className="circular-image">
            <Image src={`/common/download?name=${creator.picture}`} fluid roundedCircle />
          </div>
          <p>{creator.username}</p>
        </div>
      </Link>
    ) : null
  );
}

export default EnrolledUser;