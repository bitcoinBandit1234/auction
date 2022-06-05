import React from 'react';
import spinner from '../assets/loadingGif.gif';

const Spinner = () => {
  return (
    <div className='spinner' style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#228B22"
      }}>

      <img
        src={spinner}
        style={{ width: '100vh', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </div>
  );
};

export default Spinner;