import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom'; 

export default function AcademicPostUpdate() {
  const { postId } = useParams(); 
  console.log(postId);
  const [academicPost, setAcademicPost] = useState({
    category: 0,
    title: '',
    college: '',
    picture: '',
    content: ''
  });

  const history = useHistory();

  useEffect(() => {
    
    axios.get(`/forumPost/getPostById?id=${postId}`)
      .then(response => {

        setAcademicPost(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [postId]); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/forumPost/update', academicPost);
      console.log(response.data);

      history.push('/user/academicPost');
    } catch (error) {
      console.error(error);

    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAcademicPost((prevAcademicPost) => ({
      ...prevAcademicPost,
      [name]: value,
    }));
  };

  return (
    <div style={{ width: '50rem' }}>

      <div className="mb-4"></div>
      <div>
        <h3>Update your Forum Post</h3>
      </div>
      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={academicPost.category}
            onChange={handleChange}
          >
            <option value="">Choose a category</option>
            <option value="1">Study</option>
            <option value="2">Work</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="college">
          <Form.Label>College</Form.Label>
          <Form.Control
            as="select"
            name="college"
            value={academicPost.college}
            onChange={handleChange}
          >
            <option value="">Choose a college</option>
            <option value="1">Architecture, design and planning</option>
            <option value="2">Art and social sciences</option>
            <option value="3">Business</option>
            <option value="4">Economics</option>
            <option value="5">Education and social work</option>
            <option value="6">Engineering and computer science</option>
            <option value="7">Law</option>
            <option value="8">Medicine and health</option>
            <option value="9">Music</option>
            <option value="10">Science</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={academicPost.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={academicPost.content}
            onChange={handleChange}
          />
        </Form.Group>

        {/* <Form.Group controlId="picture">
        <Form.Label>Picture</Form.Label>
        <Form.Control
          type="text"
          name="picture"
          value={lifePost.picture}
          onChange={handleChange}
        />
      </Form.Group> */}

        <div className="mb-4"></div>

        <Button variant="dark" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}
