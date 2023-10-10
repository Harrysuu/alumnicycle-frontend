import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function LifePostShow(props) {
  const [lifePost, setLifePost] = useState(null);
  const lifePostId = props.match.params.id; // Get the ID from the route parameters

  useEffect(() => {
    // Send a GET request to fetch the LifePost
    axios.get(`/lifePost/getPostbyId?id=${lifePostId}`)
      .then(response => {
        console.log(response.data.result);
        setLifePost(response.data.result); // Set the LifePost data to the state
      })
      .catch(error => {
        console.error('Error fetching LifePost:', error);
      });
  }, [lifePostId]);

  return (
    <div>
      {lifePost ? (
        <div>
          <h1>{lifePost.title}</h1>
          <p>{lifePost.content}</p>
          {/* Display other LifePost information */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}