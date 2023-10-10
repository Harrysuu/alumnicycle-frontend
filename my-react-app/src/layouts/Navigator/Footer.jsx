import React from 'react'

export default function Footer() {

  const footerStyle = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#333', // 设置底部背景颜色
    color: '#fff', // 设置文本颜色
    padding: '10px', // 添加内边距以控制样式
    textAlign: 'center', // 文本居中对齐
  };

  return (
    <div style={footerStyle}>
      {/* 悬挂在底部的底部内容 */}
      This is the fixed bottom footer.
    </div>


  )
}
