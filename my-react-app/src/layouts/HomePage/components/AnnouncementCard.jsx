import React, { useState, useEffect } from 'react';
import { Card, Pagination } from 'antd';
import axios from 'axios';

function AnnouncementCard() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  useEffect(() => {
    const fetchData = async (page, pageSize) => {
      try {
        const response = await axios.post('/announcement/page', { page, pageSize }); // 替换成你的后端API路径
        const { records, total } = response.data.result;
        setData(records);
        setPagination({ ...pagination, total });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const { current, pageSize } = pagination;
    fetchData(current, pageSize);
  }, [pagination]); // 将fetchData添加到依赖数组中


  const handlePageChange = (page, pageSize) => {
    setPagination({ ...pagination, current: page, pageSize });
  };

  return (
    <div>
      <div>
        here
      </div>
      <div className="announcement-cards">
        {data.map((announcement) => (
          <Card key={announcement.id} title={announcement.title}>
            <p>{announcement.content}</p>
            <p>Post Time: {announcement.postTime}</p>
            <p>Star: {announcement.star}</p>
          </Card>
        ))}
      </div>
      <Pagination
        {...pagination}
        onChange={handlePageChange}
        showSizeChanger
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
      />
    </div>
  );
}

export default AnnouncementCard;