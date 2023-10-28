import React from 'react'
import axios from 'axios';
import { Card, CardGroup, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import CurrentWeather from '../CurrentWeather/CurrentWeather';

export default function GuideSide() {

  const [staredAnnouncements, setStaredAnnouncements] = useState([]);

  useEffect(() => {
  
    axios.get('/announcement/getStared')
      .then(response => {
        setStaredAnnouncements(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching stared announcements:', error);
      });
  }, []);

  // const customStyle = {
  //   backgroundColor: '#87CEEB', 
  //   
  // };

  return (
    <div >

      <div className="mb-4"></div>

      <Container className="d-flex justify-content-center align-items-end">
        <CardGroup className="weather">
          <Card className="weather" >
            <Card.Body>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/star.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                <Card.Title>Starred Announcement</Card.Title>
              </div>

              <Card.Text>
                Don't miss latest starred announcements from Alumni Circle.
              </Card.Text>
              <Card.Body>
                {/* <img src="/calendar.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} /> */}
                {staredAnnouncements.map((announcement) => (
                  <div key={announcement.id}>
                    <Card.Link href={`/announcement/${announcement.id}`}>
                      {announcement.title}
                    </Card.Link>
                    <br />
                  </div>
                ))}
              </Card.Body>

            </Card.Body>
          </Card>

          <div>
            <Card className="weather" >
              <Card.Body>
                <Card.Title>Link to USYD</Card.Title>
                <Card.Text>
                  Explore more connection with USYD.
                </Card.Text>
                <Card.Body>
                  <div>
                    <Card.Link href={"https://www.sydney.edu.au/"}>
                      USYD Official Website
                    </Card.Link>
                    <br />
                    <Card.Link href={"https://www.sydney.edu.au/engage/alumni.html"}>
                      USYD Alumni
                    </Card.Link>
                    <br />
                  </div>
                </Card.Body>
              </Card.Body>
            </Card>
          </div>
          <div>
            <CurrentWeather />
          </div>
        </CardGroup>
      </Container>



    </div>
  )
}
