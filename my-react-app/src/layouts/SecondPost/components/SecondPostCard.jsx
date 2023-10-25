import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import "../css/SecondPostCard.css";

function SecondPostCard() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [current, setCurrent] = useState(1);
  const [category, setCategory] = useState(0);
  const userId = localStorage.getItem('userId');


  const categories = ["All Category", "Articles for daily use", "Electronic goods", "Clothing"];

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
        return "Articles for daily use";
      case 2:
        return "Electronic goods";
      case 3:
        return "Clothing";
      default:
        return "All Second Posts"; // 处理未知的类别值
    }
  }

  const addCart = async (id) => {
    
    try {

      const _active = data.find(item => item.id === id);
      const res = await axios.post('/shoppingCart/add', {
        id:'',
        userId: localStorage.getItem("userId"),
        goodsId: _active.id,
        number: 1,
        unitPrice: _active.price,
        picture: _active.picture,
        createTime: _active.createTime,
        commodityName: _active.commodityName
      })
      if (res.data.resMsg === "operate success") {
        history.push('/shopping/cartCard');
    return;
      }
      console.log('error message'+res);
    } catch (error) {
      console.log(error)
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
          <Link to={`/addNewSecondPost`}>
            <img src="/create.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
            <Button variant="dark" style={buttonStyle}>Create</Button>
          </Link>
        </Card.Body>
      </Card>
      <div className="mb-4"></div>
      <p>Category: {getCategoryName(category)}</p>
      <div className="second-post-cards" style={{ width: '50rem' }}>
        {data.map((secondPost) => (
          <Card className="mb-3" style={{ width: '50rem' }} key={secondPost.id}>
            <Card.Body>
            {secondPost.picture && (
                    <img
                      src={`/common/download?name=${secondPost.picture}`}
                      alt=''
                      style={{ maxWidth: '400px', maxHeight: '300px' }}
                    />
                  )}

              {/* <img className='cart-img' src={`${secondPost.picture}`} alt='Second Post'></img> */}
              <Card.Title>{secondPost.commodityName}</Card.Title>
              <Card.Text>Price: {secondPost.price}</Card.Text>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/calendar.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
              <Card.Text>Create Time: {secondPost.createTime}</Card.Text>
              </div>
              <Link to={`/secondPostDetail/${secondPost.id}`}>
                <Button variant="primary">View Details</Button>
              </Link>
              {/* to={`/shopping/cartCard/${secondPost.id}}`}  */}
              <span onClick={() => addCart(secondPost.id)} className='add-icon'></span>
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