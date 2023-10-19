import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SecondPostCard() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [current, setCurrent] = useState(1);
  const [category, setCategory] = useState(0);

  const categories = ["All Category", "Articles for daily use", "Electronic goods", "Clothing and personal adornment"];

  const fetchData = async () => {
    try {
      const response = await axios.post('/secondPost/page', {
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
        return "Articles for daily use";
      case 2:
        return "Electronic goods";
      case 3:
        return "Clothing and personal adornment";
      default:
        return "All Second Posts"; // 处理未知的类别值
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
                style={{ marginRight: '10px' }}
              >
                {cat}
              </Button>
            ))}
          </div>
          <Link to={`/addNewSecondPost`}>
            <Button variant="outline-primary">Create</Button>
          </Link>
        </Card.Body>
      </Card>
      <div className="mb-4"></div>
      <p>Category: {getCategoryName(category)}</p>
      <div className="second-post-cards" style={{ width: '50rem' }}>
        {data.map((secondPost) => (
          <Card className="mb-3" style={{ width: '50rem' }} key={secondPost.id}>
            <Card.Body>
              <img src={`/common/download?name=${secondPost.picture}`}  alt='Second Post'></img>
              <Card.Title>{secondPost.commodityName}</Card.Title>
              <Card.Text>Price: {secondPost.price}</Card.Text>
              <Card.Text>Create Time: {secondPost.createTime}</Card.Text>
              <Link to={`/secondpost/${secondPost.id}`}>
                <Button variant="primary">View Details</Button>
              </Link>
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

export default SecondPostCard;