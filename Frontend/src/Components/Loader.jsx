// Loader.js
import React from 'react';
import "../styles/Loader.css"

const Loader = ({ size = '50px', color = '#3498db', message = 'Loading...' }) => {
  const loaderStyle = {
    width: size,
    height: size,
    border: `5px solid ${color}`,
    borderTop: `5px solid transparent`,
  };

  return (
    <div className="loader-container">
      <div className="loader" style={loaderStyle}></div>
      {message && <p className="loader-message">{message}</p>}
    </div>
  );
};

export default Loader;
