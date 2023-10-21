import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import axios from 'axios';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LifePostUserCreator from './LifePostUserCreator';

function LifePostCard() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [current, setCurrent] = useState(1);
  const [category, setCategory] = useState(0);

  const categories = ["All Category", "Social", "Study", "Sports"];

  const fetchData = async () => {
    try {
      const response = await axios.post('/lifePost/page', { // 根据你的后端 API 地址修改
        category: category,
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
  }, [current, category]);

  const handlePageChange = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const buttonStyle = {
    marginRight: '10px', // 添加右侧外边距
  };

  function getCategoryName(category) {
    switch (category) {
      case 1:
        return "Social";
      case 2:
        return "Study";
      case 3:
        return "Sports";
      default:
        return "All Life Posts"; // 处理未知的类别值
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

          <Link to={`/addNewLifePost`}>
            <img src="/create.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
            <Button variant="dark" style={buttonStyle}>Create</Button>
          </Link>
        </Card.Body>

      </Card>


      <div className="mb-4"></div>

      <div style={{ display: 'flex', alignItems: 'center' }}>

        <h5>Category: {getCategoryName(category)}</h5>
      </div>


      <div className="life-post-cards" style={{ width: '50rem' }}>
        {data.map((lifePost) => (
          <Card className="mb-3" style={{ width: '50rem' }} key={lifePost.id}>
            <Card.Body>
              <Row>
                <Col xs={9}>
                  {/* <img src={`/common/download?name=${lifePost.picture}`} alt='Life Post' style={{ maxWidth: '400px', maxHeight: '300px' }}></img> */}
                  
                  {lifePost.picture && (
                    <img
                      src={`/common/download?name=${lifePost.picture}`}
                      alt='Life Post'
                      style={{ maxWidth: '400px', maxHeight: '300px' }}
                    />
                  )}

                  <div className="mb-4"></div>
                  <Card.Title>{lifePost.title}</Card.Title>
                  <Card.Text>{lifePost.content}</Card.Text>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/people.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                    <Card.Text>{lifePost.peopleEnrol} people enrolled</Card.Text>
                  </div>

                  <div className="mb-2"></div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/calendar.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                    <Card.Text>Activity Time: {lifePost.activityTime}</Card.Text>
                  </div>

                  <div className="mb-2"></div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/editTime.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                    <Card.Text>Post Time: {lifePost.postTime}</Card.Text>
                  </div>

                  <div className="mb-4"></div>


                  <Link to={`/lifepost/${lifePost.id}`}>
                    <Button variant="primary">View Details</Button>
                  </Link>

                </Col>
                <Col xs={3}>
                  {/* 放置 LifePostUserCreator 组件在右上角 */}
                  <div className="d-flex justify-content-end">
                    <LifePostUserCreator postId={lifePost.id} />
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

export default LifePostCard;