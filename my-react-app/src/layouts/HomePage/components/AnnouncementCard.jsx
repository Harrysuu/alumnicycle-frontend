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

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.post('/announcement/page', {
  //       //
  //       page: current,
  //       pageSize: pageSize,
  //     });
  //     const { records, total } = response.data.result;
  //     setData(records); //
  //     setTotal(total); // 
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  //   // eslint-disable-next-line
  // }, [current]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/announcement/page', {
          page: current,
          pageSize: pageSize,
        });
        console.log(response);
        const { records, total } = response.data.result;
        setData(records);
        setTotal(total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // 
  }, [current, pageSize]);

  const handlePageChange = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  };

  return (
    <div>
      <div className="mb-4"></div>

      <div className="announcement-cards">
        {data.map((announcement) => (
          <Card className="mb-3" style={{ width: '50rem' }} key={announcement.id} >
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              
                {announcement.star ? (
                  <img
                    src="/star.png"
                    alt=""
                    style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }}
                  />
                ) : null}
                <Card.Title >{announcement.title}</Card.Title>
              </div>

              <div className="mb-4"></div>

              <Card.Text>{announcement.content}</Card.Text>

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