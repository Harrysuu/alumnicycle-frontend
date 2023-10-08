import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AnnouncementCard() {

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [current, setCurrent] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.post('/announcement/page', {
        // 发送的请求数据，根据需要进行更改
        page: current,
        pageSize: pageSize,
      });
      const { records, total } = response.data.result;
      setData(records); // 假设返回的数据包含在 response.data.results 中
      setTotal(total); // 假设总记录数在 response.data.total 中
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [current]);


  const handlePageChange = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  };

  return (
    <div>
      <h5>Check All Announcements</h5>

      <div className="announcement-cards">
        {data.map((announcement) => (
          <Card style={{ width: '50rem' }} key={announcement.id} >
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>{announcement.title}</Card.Title>
              {/* <Card.Text>
                {announcement.content}
              </Card.Text> */}
              <Card.Text>
                {announcement.star}
              </Card.Text>
              <Link to={`/announcement/${announcement.id}`}>
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
          // showSizeChanger
          showQuickJumper
          onChange={handlePageChange}
        // onShowSizeChange={(current, size) => {
        //   setPageSize(size);
        // }}
        />
      </div>

    </div>
  );
}

export default AnnouncementCard;