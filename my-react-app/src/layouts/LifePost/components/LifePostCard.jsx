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
            {categories.map((cat, index) => (
              <Button
                key={index}
                variant="outline-primary"
                onClick={() => handleCategoryChange(index)}
                style={buttonStyle}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* <div>
            <Button variant="outline-primary" onClick={LifePostAdd} >Create</Button>
          </div> */}
          <Link to={`/addNewLifePost`}>
            <Button variant="outline-primary">Create</Button>
          </Link>
        </Card.Body>

      </Card>


      <div className="mb-4"></div>

      <p>Category: {getCategoryName(category)}</p>

      <div className="life-post-cards" style={{ width: '50rem' }}>
        {data.map((lifePost) => (
          <Card className="mb-3" style={{ width: '50rem' }} key={lifePost.id}>
            <Card.Body>
              <Row>
                <Col xs={9}>
                  <img src={`/common/download?name=${lifePost.picture}`} alt='Life Post'></img>
                  <Card.Title>{lifePost.title}</Card.Title>
                  <Card.Text>{lifePost.content}</Card.Text>
                  <Card.Text>{lifePost.peopleEnrol} people enrolled</Card.Text>
                  <Card.Text>Time: {lifePost.activityTime}</Card.Text>

                  <Link to={`/lifepost/${lifePost.id}`}>
                    <Button variant="primary">View Details</Button>
                  </Link>

                </Col>
                <Col xs={3}>
                  {/* 放置 LifePostUserCreator 组件在右上角 */}
                  <div className="text-right">
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