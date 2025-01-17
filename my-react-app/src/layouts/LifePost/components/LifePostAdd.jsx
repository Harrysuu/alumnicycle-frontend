import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 

export default function LifePostAdd() {
  const [lifePost, setLifePost] = useState({
    category: null,
    title: '',
    content: '',
    peopleEnrol: 0,
    address: '',
    activityTime: '',
    picture: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const history = useHistory(); 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  }


  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios.post("/common/upload", formData)
      .then(response => {
        console.log("before" + lifePost.picture);
        console.log("File uploaded:", response.data.result);
        

        setLifePost((prevLifePost) => ({
          ...prevLifePost,
          picture: response.data.result
        }));
        console.log("after" + lifePost.picture);

      })
      .catch(error => {
        console.error("Error uploading file:", error);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/lifePost/add', lifePost);
      console.log(response.data.result);
      
      //go back to history page
      history.push('/lifepost/page');
    } catch (error) {
      console.error(error);
     
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLifePost((prevLifePost) => ({
      ...prevLifePost,
      [name]: value,
    }));
  };

  return (
    <div style={{ width: '50rem' }} >
      <div className="mb-4"></div>
      <div>
        <h3>Create your own Life Post</h3>
      </div>
      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={lifePost.category}
            onChange={handleChange}
          >
            <option value="">Choose a category</option>
            <option value="1">Social</option>
            <option value="2">Study</option>
            <option value="3">Sports</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={lifePost.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="title">
          <Form.Label>Content</Form.Label>
          <Form.Control
            type="text"
            name="content"
            value={lifePost.content}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address" 
            value={lifePost.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="activityTime">
          <Form.Label>Activity Time</Form.Label>
          <Form.Control
            type="datetime-local" 
            name="activityTime" 
            value={lifePost.activityTime}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="picture">
          <Form.Label>Picture</Form.Label>
          <Form.Control
            type="file"
            name="picture" 
            // value={lifePost.picture}
            onChange={handleFileChange}
          />
        </Form.Group>

        <Button onClick={handleUpload} variant="dark" style={{ marginTop: '10px' }}>
          upload
        </Button>

        <div className="mb-4"></div>

        <Button variant="dark" type="submit" style={{ marginTop: '10px'}}>
          Create
        </Button>
      </Form>
    </div>
  );
}
