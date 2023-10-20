import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

export default function AnnouncementShow(props) {
  const [announcement, setAnnouncement] = useState(null);
  const announcementId = props.match.params.id; // 从路由参数中获取 ID

  useEffect(() => {
    // 发送 GET 请求以获取公告
    axios.get(`/announcement/getAnnouncementById?id=${announcementId}`)
      .then(response => {
        setAnnouncement(response.data.result); // 设置公告数据到状态中
      })
      .catch(error => {
        console.error('Error fetching announcement:', error);
      });
  }, [announcementId]);

  return (
    <div>
      <div className="mb-4"></div>
      <Card className="mb-3" style={{ width: '50rem' }} >
        {announcement ? (
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

            {/* <Card.Text>{announcement.star}</Card.Text> */}
            <Card.Text>Content: {announcement.content}</Card.Text>

            <div className="mb-4"></div>

            <Card.Text>Details: {announcement.detail}</Card.Text>

          </Card.Body>
        ) : (
          <p>Loading...</p>
        )}
      </Card>
    </div>
  );
}
