import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';


function ViewOtherUser(props) {


  const userId = props.match.params.userId;
  const [user, setUser] = useState(null);

  useEffect(() => {
   
    axios.get('/user/getById', { params: { userId: userId } }) 
      .then(response => {
        console.log(response.data.result);
        setUser(response.data.result); 
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
      // eslint-disable-next-line
  }, []); 

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
        {/* <Nav.Item>
          <Nav.Link as={Link}  to={`/ViewUniTrade/${userId}`} >UniTrade</Nav.Link>
        </Nav.Item> */}

      </Nav>


      <div className="mb-4"></div>

<div>
  {user && (
    <Card>
      <Card.Body>
        <h3>User Profile</h3>
        <Card.Text>
          <div>
            {user.picture ? (

              <Image
                src={`/common/download?name=${user.picture}`}
                fluid
                roundedCircle
                alt="User" 
                style={{ maxWidth: '400px', maxHeight: '300px' }}
              />
             
            ) : (
              <img
                src="/userprofile.png"  
                alt="User"
                style={{ maxWidth: '400px', maxHeight: '300px' }}
              />
            )}
          </div>
          
          <div className="mb-4"></div>

          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phoneNumber}</p>
          <p>Credit: {user.credit}</p>
          <p>College: {user.college}</p>
          <p>Description: {user.description}</p>




        </Card.Text>
      </Card.Body>
    </Card>
  )}
</div>

    </div>
  )
}

export default withRouter(ViewOtherUser);