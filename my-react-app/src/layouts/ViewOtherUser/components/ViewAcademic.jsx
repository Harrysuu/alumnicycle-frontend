import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pagination } from 'antd';
import { Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

function ViewAcademic(props) {

  const userId = props.match.params.userId;
  const [posts, setPosts] = useState([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(3);

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
      <Nav fill variant="tabs" defaultActiveKey={`/ViewOtherUser/${userId}`} style={{ fontSize: '16px', padding: '10px' }}>
        <Nav.Item>
          <Nav.Link as={Link} to={`/ViewOtherUser/${userId}`} >Profile</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to={`/ViewLifePost/${userId}`} >Life Posts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`/ViewAcademic/${userId}`} active>Academic</Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link as={Link} to={`/ViewUniTrade/${userId}`} >UniTrade</Nav.Link>
        </Nav.Item> */}

      </Nav>

      <br></br>

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


export default withRouter(ViewAcademic);