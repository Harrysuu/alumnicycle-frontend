import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import AcademicPostUserCreator from './AcademicPostUserCreator';
import CommentUserDetail from './CommentUserDetail';
import { Pagination } from 'antd';
import { withRouter } from 'react-router-dom';

function AcademicPostShow(props) {
  const initialState = {
    id: '',
    title: '',
    category: 0,
    college: 0,
    content: '',
    postTime: '',
    editTime: '',
    picture: ''
  };

  const [academicPost, setAcademicPost] = useState(initialState);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const academicPostId = props.match.params.id; // Get the ID from the route parameters
  const userId = props.match.params.userId; // Get the ID from the route parameters
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [total, setTotal] = useState(0);

  const fetchComments = () => {
    axios.post(`/forumPost/getCommentsByPost`, { forumPostId: academicPostId, page: current, pageSize: pageSize, userId: userId })
      .then(response => {
        console.log(response.data.result);
        const { records, total } = response.data.result;
        setComments(records);
        setTotal(total);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  };

  useEffect(() => {

    axios.get(`/forumPost/getPostById?id=${academicPostId}`)
      .then(response => {
        console.log(response.data.result);
        setAcademicPost(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching AcademicPost:', error);
      });

    fetchComments();
    // eslint-disable-next-line
  }, [academicPostId, current, pageSize, userId]);

  function getCategoryName(category) {
    console.log("Function called with:", category);
    switch (category) {
      case '1':
        return "Study";
      case '2':
        return "Work";
      default:
        return "Unknown";
    }
  }

  const handlePageChange = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  };

  function getCollegeName(college) {
    const numcollege = parseInt(college, 10);
    switch (numcollege) {
      case 1:
        return "Architecture, design and planning";
      case 2:
        return "Art and social sciences";
      case 3:
        return "Business";
      case 4:
        return "Economics";
      case 5:
        return "Education and social work";
      case 6:
        return "Engineering and computer science";
      case 7:
        return "Law";
      case 8:
        return "Medicine and health";
      case 9:
        return "Music";
      case 10:
        return "Science";
      default:
        return "Unknown";
    }
  }

  function handleAddComment() {
    let userId1 = sessionStorage.getItem("User");
    axios.get(`/forumPost/addComment`, {
      params: {
        forumPostId: academicPostId,
        comment: comment,
        userId: userId1
      }
    })
      .then(response => {
        const newComment = response.data.result;
        setComments(prevComments => [...prevComments, newComment]);
        setComment('');
        fetchComments();
      })
      .catch(error => {
        console.error('Error adding comment:', error);
      });
  }


  return (
    <div>
      <div className="mb-4"></div>

      <Card className="mb-3" style={{ width: '50rem' }}>
        <Card.Body>
          {academicPost ? (
            <div>
              <h1>{academicPost.title}</h1>

              {academicPost.picture && (
                <img
                  src={`/common/download?name=${academicPost.picture}`}
                  alt='Academic Post'
                  style={{ maxWidth: '400px', maxHeight: '300px' }}
                />
              )}

              <div className="mb-4"></div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/catagoryLogo.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                <Card.Text>Category: {getCategoryName(academicPost.category)}</Card.Text>
              </div>

              <div className="mb-2"></div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/college.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                <Card.Text>College: {getCollegeName(academicPost.college)}</Card.Text>
              </div>

              <div className="mb-2"></div>
              <div className="mb-2"></div>
              <Card.Text>{academicPost.content}</Card.Text>



              <div className="mb-2"></div>

              <div className="mb-2"></div>

              <div className="mb-2"></div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/editTime.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                <Card.Text>Post Time: {academicPost.postTime}</Card.Text>
              </div>

              <div className="mb-2"></div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/creator.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                <h5>Creator</h5>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <AcademicPostUserCreator postId={academicPost.id} />
              </div>

              <div className="mb-4"></div>

              <h3>Comments</h3>
              {comments.map(comment => (
                <div key={comment.id}>
                  <CommentUserDetail userId={comment.userId} />
                  <p>{comment.comment}</p>
                </div>
              ))}

              <div className="d-flex justify-content-center">
                <Pagination
                  current={current}
                  pageSize={pageSize}
                  total={total}
                  showQuickJumper
                  onChange={handlePageChange}
                />
              </div>

              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Write a comment..."
              ></textarea>
              <div>
                <Button variant="primary" onClick={handleAddComment}>
                  Add Comment
                </Button>
              </div>


            </div>
          ) : (
            <p>Loading...</p>
          )}


          <div className="mb-2"></div>

        </Card.Body>
      </Card>







    </div>
  );
}

export default withRouter(AcademicPostShow);