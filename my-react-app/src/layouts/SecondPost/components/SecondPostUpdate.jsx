import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

export default function SecondPostUpdate() {
  const { postId } = useParams();
  console.log(postId);
  const [secondPost, setSecondPost] = useState({
    posterId: null,
    category: 0,
    picture: '',
    commodityName: '',
    price: 0,
    createTime: ''
  });

  const history = useHistory();

  useEffect(() => {
    // Fetch the secondPost data using postId when component mounts
    axios.get(`/secondPost/getCommodityById?id=${postId}`)
      .then(response => {
        setSecondPost(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching secondPost:', error);
      });
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to update the secondPost
      const response = await axios.post('/secondPost/update', secondPost);
      console.log(response.data);
    
      // Redirect to the appropriate page after successful update
      history.push('/user/uniTradePost'); // Redirect to secondPost page, modify the route as needed
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSecondPost(prevSecondPost => ({
      ...prevSecondPost,
      [name]: value,
    }));
  };

  return (
    <div style={{ width: '50rem' }}>
      <div>
        <h3>Update your Second Post</h3>
      </div>
      <Form onSubmit={handleSubmit}>
  

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={secondPost.category}
            onChange={handleChange}
          >
            <option value="">Choose a category</option>
            <option value="1">Articles for daily use</option>
            <option value="2">Electronic goods</option>
            <option value="3">Clothing</option>
            {/* Add more options as needed */}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="commodityName">
          <Form.Label>Commodity Name</Form.Label>
          <Form.Control
            type="text"
            name="commodityName"
            value={secondPost.commodityName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={secondPost.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="newness">
           <Form.Label>Newness</Form.Label>
           <Form.Control
           type="text"
           name="newness"
          //  placeholder="Enter newness (e.g., 90% new)"
           value={secondPost.newness}
           onChange={handleChange}
           />
        </Form.Group>

  

        {/* <Form.Group controlId="picture">
          <Form.Label>Picture</Form.Label>
          <Form.Control
            type="text"
            name="picture"
            onChange={handleChange}
          />
        </Form.Group> */}

        
        <Button variant="dark" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}