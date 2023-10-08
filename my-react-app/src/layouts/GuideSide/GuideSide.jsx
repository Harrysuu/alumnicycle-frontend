import React from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';

export default function GuideSide() {

  const [staredAnnouncements, setStaredAnnouncements] = useState([]);

  useEffect(() => {
    // 使用Axios从后端API获取已关注的公告
    axios.get('/announcement/getStared')
      .then(response => {
        setStaredAnnouncements(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching stared announcements:', error);
      });
  }, [staredAnnouncements]);

  return (

    <div >

      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Starred Announcement</Card.Title>
          <Card.Text>
            Don't miss latest starred announcements from Alumni Circle.
          </Card.Text>
          <Card.Body>
            {staredAnnouncements.map(announcement => (
              <div key={announcement.id}>
                <Card.Link href={`/announcement/${announcement.id}`}>{announcement.title}</Card.Link>
                <br />
              </div>

            ))}
          </Card.Body>
        </Card.Body>
      </Card>

      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>External Links</Card.Title>
            <Card.Text>
              Explore more connection with USYD.
            </Card.Text>
            <Card.Body>
              <div>
                <Card.Link href={"https://www.sydney.edu.au/"}>USYD Official Website</Card.Link><br />
                <Card.Link href={"https://www.sydney.edu.au/engage/alumni.html"}>USYD Alumni</Card.Link><br />
              </div>

            </Card.Body>
          </Card.Body>
        </Card>
      </div>

    </div>
  )
}
