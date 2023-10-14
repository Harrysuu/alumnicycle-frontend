import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom'; // 导入 useParams

export default function LifePostUpdate() {
  const { postId } = useParams(); // 从 URL 中获取 post.id
  console.log(postId);
  const [lifePost, setLifePost] = useState({
    category: 0,
    title: '',
    peopleEnrol: 0,
    address: '',
    activityTime: '',
    picture: '',
  });

  const history = useHistory();

  useEffect(() => {
    // 在此处获取要更新的帖子信息
    axios.get(`/lifePost/getPostById?id=${postId}`)
      .then(response => {
    
        setLifePost(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [postId]); // 在 postId 更改时重新获取帖子信息

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/lifePost/update', lifePost);
      console.log(response.data);
    
      history.push('/user/posts');
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
    <div style={{ width: '50rem' }}>
    <div>
      <h3>Update your Life Post</h3>
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
          type="text"
          name="picture"
          value={lifePost.picture}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="outline-primary" type="submit">
        Update
      </Button>
    </Form>
  </div>
  );
}