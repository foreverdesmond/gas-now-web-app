import React from 'react';
import { Card } from 'antd';

const GasFeeCard = ({ title, price, maxFee, priorityFee, time, color}) => {
  return (
    <Card style={{ border: `2px solid ${color}`, borderRadius: '10px', textAlign: 'center' }}>
      <h3 style={{ color }}>{title}</h3>
      <h1 style={{ color }}>{price}</h1>
      <p>PriortyFee: {priorityFee}</p>
      <p>MaxFee: {maxFee}</p>
      <p>Estimated Time: {time}</p>
    </Card>
  );
};

export default GasFeeCard;