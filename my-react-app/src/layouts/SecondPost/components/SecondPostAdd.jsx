import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function SecondPostAdd() {
  const initialSecondPost = {
    posterId: null,
    category: null,
    picture: '',
    commodityName: '',
    price: 0,
    createTime: ''
  };

  const [secondPost, setSecondPost] = useState(initialSecondPost);
  const [selectedFile, setSelectedFile] = useState(null);
  const history = useHistory();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios.post("/common/upload", formData)
      .then(response => {
        setSecondPost((prevSecondPost) => ({
          ...prevSecondPost,
          picture: response.data.result
        }));
      })
      .catch(error => {
        console.error("Error uploading file:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 发送 POST 请求将 secondPost 数据保存到后端
      const response = await axios.post('/secondPost/add', secondPost);
      console.log(response.data.result);
      // 成功后重定向到指定页面
      history.push('/secondpost/page');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSecondPost((prevSecondPost) => ({
      ...prevSecondPost,
      [name]: value,
    }));
  };

  return (
    <div style={{ width: '50rem' }}>
      <div>
        <h3>Create your Second Post</h3>
      </div>
      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="posterId">
          <Form.Label>Poster ID</Form.Label>
          <Form.Control
            type="text"
            name="posterId"
            value={secondPost.posterId}
            onChange={handleChange}
          />
        </Form.Group>

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

        <Form.Group controlId="createTime">
          <Form.Label>Create Time</Form.Label>
          <Form.Control
            type="datetime-local"
            name="createTime"
            value={secondPost.createTime}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="picture">
          <Form.Label>Picture</Form.Label>
          <Form.Control
            type="file"
            name="picture"
            onChange={handleFileChange}
          />
        </Form.Group>

        <Button onClick={handleUpload} variant="outline-primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
}