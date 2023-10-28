import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SecondPostShow(props) {
  const [secondPost, setSecondPost] = useState(null);
  const secondPostId = props.match.params.id; // Get the ID from the route parameters

  useEffect(() => {
    // Send a GET request to fetch the SecondPost
    axios.get(`/secondPost/getPostById?id=${secondPostId}`)
      .then(response => {
        console.log(response.data.result);
        setSecondPost(response.data.result); // Set the SecondPost data to the state
      })
      .catch(error => {
        console.error('Error fetching SecondPost:', error);
      });
      
  }, [secondPostId]);



  function getCategoryName(category) {
    switch (category) {
      case 1:
        return "Articles for daily use";
      case 2:
        return "Electronic goods";
      case 3:
        return "Clothing";
      default:
        return "Unknown"; 
    }
  }

  return (
    <div>
      <div>
        {secondPost ? (
          <div>
            <h1>{secondPost.title}</h1>
            {/* <img src={`/common/download?name=${secondPost.picture}`} alt='Second Post'></img> */}
            <img src={`${secondPost.picture}`} alt='Second Post'></img>
            <p>Category: {getCategoryName(secondPost.category)}</p>
            <p>Commodity Name: {secondPost.commodityName}</p>
            <p>Price: {secondPost.price}</p>
            <p>Create Time: {secondPost.createTime}</p>
            {/* Display other SecondPost information */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>


    </div>
  );
}