import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';

export default function UserPicture() {
  const [user, setUser] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const userId = localStorage.getItem('userId');


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  }


  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios.post("/common/upload", formData)
      .then(response => {
        console.log("before" + user.picture);
        console.log("File uploaded:", response.data.result);
       

        setUser((prevUser) => ({
          ...prevUser,
          picture: response.data.result
        }));
        console.log("after" + user.picture);

      })
      .catch(error => {
        console.error("Error uploading file:", error);
      });
  }

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      console.log(user);
      const response = await axios.post('/user/updateUser', user);
      console.log(response.data.result);

      // window.location.reload();

    } catch (error) {
      console.error(error);
      
    }
  };

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
      <Nav fill variant="tabs" defaultActiveKey="/user/favorites" style={{ fontSize: '16px', padding: '10px' }}>
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
          <Nav.Link as={Link} to="/user/picture" active style={{ color: 'dark' }}>Set Photo</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/reset" style={{ color: 'white' }}>Reset Password</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/user/posts" style={{ color: 'white' }}>Posts</Nav.Link>
        </Nav.Item>

      </Nav>

      <div className="mb-4"></div>

      <Card>
        <Card.Body>
          <div>
            <h3>Set Photo</h3>
            {user && user.picture && (
              <div>
                <p>Current Photo:</p>
                <img src={`/common/download?name=${user.picture}`} alt="User"  style={{ maxWidth: '400px', maxHeight: '300px' }}/>
                
              </div>
            )}
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="picture">
              <Form.Label>Set new photo:</Form.Label>
              <Form.Control
                type="file"
                name="picture" 
                onChange={handleFileChange}
              />
            </Form.Group>

            <Button onClick={handleUpload} variant="outline-primary">
              Upload
            </Button>

            <div className="mb-4"></div>

            <Button type="submit">
              Create
            </Button>
          </Form>
        </Card.Body>
      </Card>

    </div>

  );
}
