import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      {announcement ? (
        <div>
          <h1>{announcement.title}</h1>
          <p>{announcement.content}</p>
          {/* 其他公告信息展示 */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
