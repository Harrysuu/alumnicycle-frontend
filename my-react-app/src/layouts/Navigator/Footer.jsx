import React from 'react'

export default function Footer() {

  const footerStyle = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#333', 
    color: '#fff', 
    padding: '10px', 
    textAlign: 'center', 
  };

  return (
    <div style={footerStyle}>
     
      This is the fixed bottom footer.
    </div>


  )
}
