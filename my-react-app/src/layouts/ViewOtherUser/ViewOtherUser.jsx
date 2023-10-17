import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ViewOtherUser(props) {


  const userId = props.match.params.userId;
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 发起HTTP请求来获取用户信息
    axios.get('/user/getById', { params: { userId: userId } }) // 1 是示例的 userId，您可以根据需要传入实际的 userId
      .then(response => {
        console.log(response.data.result);
        setUser(response.data.result); // 设置用户信息到状态
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
      // eslint-disable-next-line
  }, []); // 请确保只在组件挂载时获取用户信息，因此依赖为空数组

  return (
    <div style={{ width: '50rem' }}>
      <Nav fill variant="tabs" defaultActiveKey={`/ViewOtherUser/${userId}`} style={{ fontSize: '16px', padding: '10px' }}>
        <Nav.Item>
          <Nav.Link as={Link} to={`/ViewOtherUser/${userId}`} active>Profile</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link}  to={`/ViewLifePost/${userId}`} >Life Posts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link}  to={`/ViewAcademic/${userId}`} >Academic</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link}  to={`/ViewUniTrade/${userId}`} >UniTrade</Nav.Link>
        </Nav.Item>

      </Nav>


      {user && (
        <div>
          <h3>User Profile</h3>
          {/* <p>ID: {user.id}</p> */}
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Credit: {user.credit}</p>
          <p>College: {user.college}</p>
          <p>Status: {user.statusInformation}</p>
          <p>Description: {user.description}</p>
          <p>Picture: {user.picture}</p>
          {/* <p>Edit Time: {user.editTime}</p> */}
          {/* 可以根据需要渲染其他用户信息 */}
        </div>
      )}

    </div>
  )
}
