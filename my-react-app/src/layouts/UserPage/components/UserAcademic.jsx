import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pagination } from 'antd';
import { Card, Button } from 'react-bootstrap';


export default function UserAcademic() {
  const [posts, setPosts] = useState([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const userId = localStorage.getItem('userId');

  const fetchData = async () => {
    try {
      const response = await axios.post('/forumPost/getByUserId', { userId: userId, page: { current: current, size: pageSize } });
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
          <Nav.Link as={Link} to="/user/page" style={{ color: 'white' }}>Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/addcredit" style={{ color: 'white' }}>Add Credit</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/user/updateProfile" style={{ color: 'white' }}>Update Profile</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/user/picture" style={{ color: 'white' }}>Set Photo</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/user/reset" style={{ color: 'white' }}>Reset Password</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/user/posts" active style={{ color: 'dark' }}>Posts</Nav.Link>
        </Nav.Item>

      </Nav>

      <Nav fill variant="tabs" defaultActiveKey="/user/posts" style={{ fontSize: '14px', padding: '10px' }}>

        <Nav.Item>
          <Nav.Link as={Link} to="/user/posts" style={{ color: 'White' }}>Life Posts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/academicPost" active style={{ color: 'dark' }}>Academic</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/uniTradePost" style={{ color: 'white' }}>UniTrade</Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="mb-4"></div>

      <div className="d-flex justify-content-end">
        <Link to={`/addNewAcademicPost`} >
          <Button variant="dark">Create</Button>
        </Link>
      </div>

      <div className="mb-4"></div>

      <div className="academic-post-cards" style={{ width: '50rem' }}>
        {posts.map((post) => (
          <Card className="mb-3" style={{ width: '50rem' }} key={post.id}>
            <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ flexGrow: 1 }}>

              {post.picture && (
                    <img
                      src={`/common/download?name=${post.picture}`}
                      alt='Academic Post'
                      style={{ maxWidth: '400px', maxHeight: '300px' }}
                    />
                  )}
                <div className="mb-4"></div>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>

                <div className="mb-2"></div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src="/editTime.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                  <Card.Text>Post Time: {post.postTime}</Card.Text>
                </div>

                <div className="mb-4"></div>


                <Link to={`/academicpost/${post.id}`}>
                  <Button variant="primary">View Details</Button>
                </Link>


              </div>
              <div style={{ alignSelf: 'flex-end' }}>

                <Link to={`/updateAcademicPost/${post.id}`}> 
                  <Button variant="dark">Update</Button>
                </Link>
                <Link to={`/deleteAcademicPost/${post.id}`}> 
                  <Button variant="dark">Delete</Button>
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
