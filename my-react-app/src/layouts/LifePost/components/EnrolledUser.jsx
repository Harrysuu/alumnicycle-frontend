import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import '../../../css/UserCreator.css'; 

function EnrolledUser({ userId }) {
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    
    axios.get('/user/getById', { params: { userId: userId } }) 
      .then(response => {
        console.log(response.data.result);
        setCreator(response.data.result); 
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
      // eslint-disable-next-line
  }, []); 


  return (
    creator ? (
      <Link to={`/ViewOtherUser/${creator.id}`}>
        <div className="d-flex flex-column align-items-center">
          <div className="circular-image">
            <Image src={`/common/download?name=${creator.picture}`} fluid roundedCircle />
          </div>
          <p>{creator.username}</p>
        </div>
      </Link>
    ) : null
  );
}

export default EnrolledUser;