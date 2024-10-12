import React from 'react';
import error from '../assets/error.gif'; // adjust the path based on where you placed the GIF

const Not_Found = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <img src={error} alt="you're not supposed to be here!"  width="250" />
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default Not_Found;

