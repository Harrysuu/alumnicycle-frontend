import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import axios from 'axios';
import { Card, Button, Row, Col, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AcademicPostUserCreator from './AcademicPostUserCreator';

function AcademicPostCard() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [current, setCurrent] = useState(1);
  const [category, setCategory] = useState(0);
  const [college, setCollege] = useState(0);

  const categories = ["All Category", "Academic", "Work"];
  const colleges = [
    "All College",
    "Architecture, design and planning",
    "Art and social sciences",
    "Business",
    "Economics",
    "Education and social work",
    "Engineering and computer science",
    "Law",
    "Medicine and health",
    "Music",
    "Science",
    ];

  const fetchData = async () => {
    try {
      const response = await axios.post('/forumPost/page', { // 根据你的后端 API 地址修改
        category: category,
        college: college,
        page: current,
        pageSize: pageSize,
      });
      const { records, total } = response.data.result;

      setData(records);
      setTotal(total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [current, category, college]);

  const [selectedCollege, setSelectedCollege] = useState(null);

  const handlePageChange = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleCollegeChange = (newCollegeName) => {
    setSelectedCollege(newCollegeName);
    const collegeIndex = colleges.indexOf(newCollegeName);
    setCollege(collegeIndex);
  };


  const buttonStyle = {
    marginRight: '10px', // 添加右侧外边距
  };

  function getCategoryName(category) {
    switch (category) {
      case 1:
        return "Academic";
      case 2:
        return "Work";
      default:
        return "All Forum Posts"; // 处理未知的类别值
    }
  }

  function getCollegeName(college) {
    switch (college) {
          case 1:
            return "Architecture, design and planning";
          case 2:
            return "Art and social sciences";
          case 3:
            return "Business";
          case 4:
            return "Economics";
          case 5:
            return "Education and social work";
          case 6:
            return "Engineering and computer science";
          case 7:
            return "Law";
          case 8:
            return "Medicine and health";
          case 9:
            return "Music";
          case 10:
            return "Science";
      default:
        return "All College"; // 处理未知的类别值
    }
  }

  return (
    <div>

      <div className="mb-4"></div>

      <Card style={{ width: '50rem' }} >
        <Card.Body style={{ width: '50rem', display: 'flex', justifyContent: 'space-between' }}>
        <div className="category-buttons">
            <img src="/catagoryLogo.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />

            {categories.map((cat, index) => (
              <Button
                key={index}
                variant="dark"
                onClick={() => handleCategoryChange(index)}
                style={buttonStyle}
              >
                {cat}
              </Button>
            ))}
          </div>

        <div className="college-dropdown">
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            {selectedCollege || "Choose College"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {colleges.map((collegeName, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleCollegeChange(collegeName)}
              >
                {collegeName}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>

        </Dropdown>
        </div>

          
          <Link to={`/addNewAcademicPost`}>
            <img src="/create.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
            <Button variant="dark" style={buttonStyle}>Create</Button>
          </Link>
        </Card.Body>

      </Card>


      <div className="mb-4"></div>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>

        <h5>Category: {getCategoryName(category)}</h5>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>

        <h5>College: {getCollegeName(college)}</h5>
      </div>

      <div className="academic-post-cards" style={{ width: '50rem' }}>
        {data.map((academicPost) => (
          <Card className="mb-3" style={{ width: '50rem' }} key={academicPost.id}>
            <Card.Body>
              <Row>
                <Col xs={9}>
                  {/* <img src={`/common/download?name=${lifePost.picture}`} alt='Life Post' style={{ maxWidth: '400px', maxHeight: '300px' }}></img> */}
                  
                  {academicPost.picture && (
                    <img
                      src={`/common/download?name=${academicPost.picture}`}
                      alt='Academic Post'
                      style={{ maxWidth: '400px', maxHeight: '300px' }}
                    />
                  )}

                  <div className="mb-4"></div>
                  <Card.Title>{academicPost.title}</Card.Title>
                  <Card.Text>{academicPost.content}</Card.Text>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/editTime.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                    <Card.Text>Post Time: {academicPost.postTime}</Card.Text>
                  </div>

                  <div className="mb-4"></div>


                  <Link to={`/academicpost/${academicPost.id}`}>
                    <Button variant="primary">View Details</Button>
                  </Link>

                </Col>
                <Col xs={3}>
                  {/* 放置 academicPostUserCreator 组件在右上角 */}
                  <div className="d-flex justify-content-end">
                    <AcademicPostUserCreator postId={academicPost.id} />
                  </div>
                </Col>
              </Row>


            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="d-flex justify-content-center">
        <Pagination
          current={current}
          pageSize={pageSize}
          total={total}
          showQuickJumper
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default AcademicPostCard;