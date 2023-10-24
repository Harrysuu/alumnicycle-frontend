import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // 导入 useHistory

export default function AcademicPostAdd() {
  const [academicPost, setAcademicPost] = useState({
    category: null,
    college: null,
    title: '',
    content: '',
    picture: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const history = useHistory(); // 获取 history 对象

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  }


  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios.post("/common/upload", formData)
      .then(response => {
        console.log("before" + academicPost.picture);
        console.log("File uploaded:", response.data.result);
        // 更新 academicPost 对象中的 picture 字段为文件名

        setAcademicPost((prevAcademicPost) => ({
          ...prevAcademicPost,
          picture: response.data.result
        }));
        console.log("after" + academicPost.picture);

      })
      .catch(error => {
        console.error("Error uploading file:", error);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/forumPost/add', academicPost);
      console.log(response.data.result);
      // 清除表单或进行其他操作
      //go back to history page
      history.push('/academic/page');
    } catch (error) {
      console.error(error);
      // 处理错误
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
    <div style={{ width: '50rem' }} >
      <div>
        <h3>Create your own Academic Post</h3>
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

        <Form.Group controlId="title">
          <Form.Label>Content</Form.Label>
          <Form.Control
            type="text"
            name="content"
            value={academicPost.content}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="picture">
          <Form.Label>Picture</Form.Label>
          <Form.Control
            type="file"
            name="picture" // 注意此处的 name 属性应与 实体中的属性名匹配
            // value={academicPost.picture}
            onChange={handleFileChange}
          />
        </Form.Group>

        <Button onClick={handleUpload} variant="outline-primary" style={{ marginTop: '10px' }}>
          upload
        </Button>
        <Button variant="outline-primary" type="submit" style={{ marginTop: '10px', marginLeft: '10px' }}>
          Create
        </Button>
      </Form>
    </div>
  );
}
