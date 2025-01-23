import React from 'react';
import '../index.css';

// Network Info Component
const NetworkInfo = ({ chainName, baseFee, blockNumber}) => {
  return (
    <div className="network-info">
      <h1>{chainName}</h1>
      <div className="base-fee">Base Fee: <span className="gradient-text">{baseFee} GWEI</span></div>
      <div className="base-fee">BlockNumber: {blockNumber} </div>
    </div>
  );
};

export default NetworkInfo;