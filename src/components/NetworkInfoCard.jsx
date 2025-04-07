import React, { useState, useEffect } from 'react';
import { Typography, Space } from 'antd';
import '../index.css';

const { Title, Text } = Typography;

// Network Info Component
const NetworkInfo = ({ chainName, baseFee, blockNumber}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 576;

  return (
    <div className="network-info" style={{ 
      textAlign: 'center',
      padding: isMobile ? '10px' : '20px'
    }}>
      <Title level={isMobile ? 3 : 2} style={{ margin: 0 }}>
        {chainName}
      </Title>
      <Space direction={isMobile ? 'vertical' : 'horizontal'} size={isMobile ? 4 : 16} style={{ marginTop: '10px' }}>
        <Text className="base-fee">
          Base Fee: <span className="gradient-text">{baseFee} GWEI</span>
        </Text>
        <Text className="base-fee">
          BlockNumber: {blockNumber}
        </Text>
      </Space>
    </div>
  );
};

export default NetworkInfo;