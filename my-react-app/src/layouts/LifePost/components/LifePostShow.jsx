import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col } from 'react-bootstrap';
import EnrolledUser from './EnrolledUser';
import LifePostUserCreator from './LifePostUserCreator';
import { withRouter } from 'react-router-dom';

function LifePostShow(props) {
  const [lifePost, setLifePost] = useState(null);
  const [enrolled, setEnrolled] = useState(false); 
  const lifePostId = props.match.params.id; // Get the ID from the route parameters
  const [enrolledUsers, setEnrolledUsers] = useState([]); 

  useEffect(() => {
    
    axios.get(`/lifePost/getPostById?id=${lifePostId}`)
      .then(response => {
        console.log(response.data.result);
        setLifePost(response.data.result); 
      })
      .catch(error => {
        console.error('Error fetching LifePost:', error);
      });

    
    axios.get(`/lifePost/enrolCheck?lifePostId=${lifePostId}`)
      .then(response => {
        setEnrolled(response.data); 
      })
      .catch(error => {
        console.error('Error checking enrol status:', error);
      });

    
    axios.get(`/lifePost/getAllEnrolledUser?id=${lifePostId}`)
      .then(response => {
        const users = response.data.result;
        setEnrolledUsers(users); 

        console.log("line34 test" + response.data.result);
        users.forEach(user => {
          console.log("User ID:", user.id);
          console.log("User Name:", user.username);
          
        });

      })
      .catch(error => {
        console.error('Error fetching enrolled users:', error);
      });
  }, [lifePostId, enrolled]);

  const handleEnrolClick = () => {
    if (enrolled) {
      
      axios.get(`/lifePost/cancelEnrolById?lifePostId=${lifePostId}`)
        .then(response => {
          console.log('Unregistered:', response.data);
          setEnrolled(false); 
        })
        .catch(error => {
          console.error('Error canceling enrol:', error);
        });
    } else {
      
      axios.get(`/lifePost/enrolById?lifePostId=${lifePostId}`)
        .then(response => {
          console.log('Registered:', response.data);
          setEnrolled(true); 
        })
        .catch(error => {
          console.error('Error enrolling:', error);
        });
    }
  };

  function getCategoryName(category) {
    switch (category) {
      case 1:
        return "Social";
      case 2:
        return "Study";
      case 3:
        return "Sports";
      default:
        return "Unknown"; 
    }
  }

  return (
    <div>

      <div className="mb-4"></div>

      <Card className="mb-3" style={{ width: '50rem' }}>
        <Card.Body>
          {lifePost ? (
            <div>
              <h1>{lifePost.title}</h1>

              {lifePost.picture && (
                <img
                  src={`/common/download?name=${lifePost.picture}`}
                  alt='Life Post'
                  style={{ maxWidth: '400px', maxHeight: '300px' }}
                />
              )}

              <div className="mb-4"></div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/catagoryLogo.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                <Card.Text>Category: {getCategoryName(lifePost.category)}</Card.Text>
              </div>

              <div className="mb-2"></div>

              <div className="mb-2"></div>
              <Card.Text>{lifePost.content}</Card.Text>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/people.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                <Card.Text>{lifePost.peopleEnrol} people enrolled</Card.Text>
              </div>

              <div className="mb-2"></div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/map.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                <Card.Text>Address: {lifePost.address}</Card.Text>
              </div>

              <div className="mb-2"></div>


              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/calendar.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                <Card.Text>Activity Time: {lifePost.activityTime}</Card.Text>
              </div>

              <div className="mb-2"></div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/editTime.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                <Card.Text>Post Time: {lifePost.postTime}</Card.Text>
              </div>

              <div className="mb-4"></div>


              <div>
                <Button variant="primary" onClick={handleEnrolClick}>
                  {enrolled ? 'Unregister' : 'Register'}
                </Button>
              </div>

              <div className="mb-4"></div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/creator.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                <h5>Creator</h5>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <LifePostUserCreator postId={lifePost.id} />
              </div>

            </div>


          ) : (
            <p>Loading...</p>
          )}


          <div className="mb-2"></div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/people.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
              <h5>Enrolled Users</h5>
            </div>

            <div className="enrolled-users">
              <Row>
                {enrolledUsers.map(user => (
                  <Col key={user.id} xs={4}>
                    <EnrolledUser userId={user.id} />
                  </Col>
                ))}
              </Row>
            </div>
          </div>

        </Card.Body>
      </Card>







    </div>
  );
}

export default withRouter(LifePostShow);