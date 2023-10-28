import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from 'react-bootstrap';

function CommentUserDetail({ userId }) {
  const [userDetail, setUserDetail] = useState(null);
  

  useEffect(() => {
    
    axios.get('/user/getById', { params: { userId: userId } }) 
      .then(response => {
        console.log(response.data.result);
        setUserDetail(response.data.result); 
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
    // eslint-disable-next-line
  }, []); 

  if (!userDetail) return null;


  return (
    <div>
      {userDetail ? (
        <div className="d-flex align-items-center">
        {/* User Avatar */}
        <div className="circular-image mr-3" style={{ width: '50px', height: '50px', overflow: 'hidden',  marginRight: '10px' }}> {/* Adjust the width and height as needed */}
            {userDetail.picture ? (
                <Image
                    src={`/common/download?name=${userDetail.picture}`}
                    fluid
                    roundedCircle
                />
            ) : (
                <img
                    src="/userprofile.png"  
                    alt="User"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
            )}
        </div>
        <p className="mb-0">{userDetail.username}</p>
    </div>
    ) : (
      <p>Loading...</p>
    )
    }
    </div>
    
  );
}

export default CommentUserDetail;