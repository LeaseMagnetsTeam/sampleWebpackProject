import React from 'react';
import './InitialLoader.css';

const InitialLoader = () => {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'black',
          width: '100%',
          height: '100%',
          display: 'grid',
          placeItems: 'center',
          zIndex: 10,
          opacity: 0.85,
        }}
      >
        <div style={{ zIndex: 20 }} styleName="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default InitialLoader;
