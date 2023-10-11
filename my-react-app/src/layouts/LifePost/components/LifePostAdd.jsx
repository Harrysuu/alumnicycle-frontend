import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // 导入 useHistory


export default function LifePostAdd() {
  const [lifePost, setLifePost] = useState({
    category: null,
    title: '',
    peopleEnrol: 0,
    address: '',
    activityTime: '',
    picture: '',
  });

  const history = useHistory(); // 获取 history 对象

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/lifePost/add', lifePost);
      console.log(response.data);
      // 清除表单或进行其他操作
      //go back to history page
      history.push('/lifepost/page');
    } catch (error) {
      console.error(error);
      // 处理错误
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
            name="address" // 注意此处的 name 属性应与 LifePost 实体中的属性名匹配
            value={lifePost.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="activityTime">
          <Form.Label>Activity Time</Form.Label>
          <Form.Control
            type="datetime-local" // 根据需要选择适当的输入类型
            name="activityTime" // 注意此处的 name 属性应与 LifePost 实体中的属性名匹配
            value={lifePost.activityTime}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="picture">
          <Form.Label>Picture</Form.Label>
          <Form.Control
            type="text"
            name="picture" // 注意此处的 name 属性应与 LifePost 实体中的属性名匹配
            value={lifePost.picture}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="outline-primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
}
