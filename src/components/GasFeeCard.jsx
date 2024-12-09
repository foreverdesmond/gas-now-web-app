import React from 'react';
import { Card } from 'antd';

const GasFeeCard = ({ title, maxFee, priorityFee, time, color }) => {
  return (
    <Card style={{ border: `2px solid ${color}`, borderRadius: '10px', textAlign: 'center' }}>
      <h3 style={{ color }}>{title}</h3>
      <h1 style={{ color }}>{maxFee}</h1>
      <p>PriortyFee: {priorityFee}</p>
      <p>Estimated Time: {time}</p>
    </Card>
  );
};

export default GasFeeCard;