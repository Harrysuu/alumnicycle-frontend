import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function SecondPostDelete() {
  const { postId } = useParams();
  const history = useHistory();

  useEffect(() => {
    // 发起删除帖子的请求
    axios
      .get(`/secondPost/delete/?id=${postId}`)
      .then((response) => {
        history.push('/user/uniTradePost');
      })
      .catch((error) => {
        console.error('Error deleting second post:', error);
      });
      // eslint-disable-next-line
  }, [postId]);

  return (
    <div>
      {/* 可以在这里添加删除中的 loading 状态或其他 UI 元素 */}
    </div>
  );
}