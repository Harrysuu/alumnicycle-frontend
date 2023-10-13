import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pagination } from 'antd';
import { Card, Button } from 'react-bootstrap';


export default function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  // // 在需要访问用户ID的地方，从Session Storage中检索它
  // const storedUserId = sessionStorage.getItem('userId');
  // if (storedUserId) {
  //   const userId = parseInt(storedUserId, 10);
  //   // 现在您可以使用userId进行其他操作
  // } else {
  //   // 如果未找到存储的用户ID，可以采取适当的措施，如跳转到登录页面
  // }

  const fetchData = async () => {
    try {
      const response = await axios.post('/lifePost/getByUserId', { userId: 99, page: { current: current, size: pageSize } });
      console.log(response.data.result.records);
      console.log(response.data.result.total);
      setPosts(response.data.result.records);
      setTotal(response.data.result.total);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line 
  }, [current]);

  const handlePageChange = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  };

  return (

    <div style={{ width: '50rem' }}>
      <Nav fill variant="tabs" defaultActiveKey="/user/posts" style={{ fontSize: '16px', padding: '10px' }}>
        <Nav.Item >
          <Nav.Link as={Link} to="/user/page" >Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/addcredit">Add Credit</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/user/updateProfile">Update Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/reset">Reset Password</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/user/posts" active>Posts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/favorites">Favorites</Nav.Link>
        </Nav.Item>
      </Nav>

      <Nav fill variant="tabs" defaultActiveKey="/user/posts" style={{ fontSize: '14px', padding: '10px' }}>


        <Nav.Item>
          <Nav.Link as={Link} to="/user/posts" active>Life Posts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/academicPost">Academic</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/uniTradePost">UniTrade</Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="life-post-cards" style={{ width: '50rem' }}>
        {posts.map((post) => (
          <Card className="mb-3" style={{ width: '50rem' }} key={post.id}>
            <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ flexGrow: 1 }}>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <Link to={`/lifepost/${post.id}`}>
                  <Button variant="primary">View Details</Button>
                </Link>
              </div>
              <div style={{ alignSelf: 'flex-end' }}>
                <Link to={`/addNewLifePost`}>
                  <Button variant="outline-primary">Create</Button>
                </Link>
                <Link to={`/updateLifePost/${post.id}`}> {/* 传递 post.id */}
                  <Button variant="outline-primary">Update</Button>
                </Link>
                <Link to={`/deleteLifePost/${post.id}`}> {/* 传递 post.id */}
                  <Button variant="outline-primary">Delete</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>

        ))}
      </div>




      <div className="d-flex justify-content-center">
        <Pagination
          current={current}
          pageSize={pageSize}
          total={total}
          showQuickJumper
          onChange={handlePageChange}
        />
      </div>

    </div>

  )
}
