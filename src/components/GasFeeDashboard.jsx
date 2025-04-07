import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col, Typography } from 'antd';
import GasFeeCard from './GasFeeCard';
import CurrentPriceCard from './CurrentPriceCard';
import { getCurrentGasFee } from '../service/gasFeeService';
import NetworkInfo from './NetworkInfoCard';

const { Title } = Typography;

// 定义 API 刷新时间常量（毫秒）
const REFRESH_INTERVAL = 6000;

const GasFeeDashboard = ({ chainName, chainGasFeeServiceAPI, chainPriceAPI, chainNetworkId }) => {
  console.log("chain", chainName);
  console.log("chain.gasFeeServiceAPI", chainGasFeeServiceAPI);
  const [gasFee, setGasFee] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
  const [updateCounter, setUpdateCounter] = useState(0); // 添加更新计数器以确保每次更新都触发重新渲染

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchGasFee = useCallback(async () => {
    try {
      console.log("chain.gasFeeServiceAPI", chainGasFeeServiceAPI);
      console.log("chian.networkID", chainNetworkId);
      const request = chainGasFeeServiceAPI + chainNetworkId;
      const data = await getCurrentGasFee(request);
      console.log('Fetched gas fee data:', data);
      setGasFee(data);
      setLastUpdateTime(Date.now()); // 更新最后更新时间
      setUpdateCounter(prev => prev + 1); // 增加更新计数器
    } catch (error) {
      console.error('Error fetching gas fee data:', error);
    }
  }, [chainGasFeeServiceAPI, chainNetworkId]);

  useEffect(() => {
    fetchGasFee();

    const interval = setInterval(fetchGasFee, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchGasFee]);

  if (!gasFee) {
    return <p>Loading...</p>;
  }

  const baseFee = parseFloat(gasFee.blockPrices[0].baseFeePerGas).toFixed(6);

  // 根据屏幕宽度设置布局
  const isMobile = windowWidth < 576;
  const isTablet = windowWidth >= 576 && windowWidth < 992;
  
  // 设置统一的栅格间隔
  const gutter = [16, 16];

  // 获取GasFee卡片的唯一key，以确保重新渲染
  const getCardKey = (title) => `${title.toLowerCase()}-${lastUpdateTime}-${updateCounter}`;

  // 创建统一的卡片属性
  const gasFeeCards = [
    {
      title: "Turbo",
      index: 0,
      color: "#4CAF50",
      time: "~12 Seconds"
    },
    {
      title: "Fast",
      index: 1,
      color: "#8BC34A",
      time: "~48 Seconds"
    },
    {
      title: "Standard",
      index: 2,
      color: "#FFC107",
      time: "~2 Minutes"
    },
    {
      title: "Economy",
      index: 3,
      color: "#FF9800",
      time: "~3 Minutes"
    },
    {
      title: "Saver",
      index: 4,
      color: "#FF0000",
      time: "~4 Minutes"
    }
  ];

  return (
    <div style={{ padding: '10px', maxWidth: '1280px', margin: '0 auto' }}>
      <Row style={{ marginBottom: '20px' }} justify="center">
        <NetworkInfo chainName={chainName} baseFee={baseFee} blockNumber={gasFee.blockPrices[0].blockNumber} />
      </Row>
      
      {isMobile && 
        <Title level={5} style={{ textAlign: 'center', marginBottom: '20px' }}>
          {chainName} Gas 费用
        </Title>
      }
      
      {/* GasFee 卡片行 */}
      <Row gutter={gutter} justify="center">
        {gasFeeCards.map((card) => (
          <Col xs={24} sm={12} md={4} lg={4} xl={4} key={getCardKey(card.title)}>
            <GasFeeCard
              title={card.title}
              price={gasFee.blockPrices[0].estimatedPrices[card.index].price.toFixed(4)}
              maxFee={gasFee.blockPrices[0].estimatedPrices[card.index].maxFeePerGas.toFixed(4)}
              priorityFee={gasFee.blockPrices[0].estimatedPrices[card.index].maxPriorityFeePerGas.toFixed(4)}
              time={card.time}
              color={card.color}
              refreshTime={REFRESH_INTERVAL}
              key={getCardKey(card.title)}
            />
          </Col>
        ))}
      </Row>
      
      {/* 价格卡片行 - 使用相同的 Col 设置确保对齐 */}
      <Row gutter={gutter} style={{ marginTop: '20px' }} justify="center">
        <Col xs={24} sm={24} md={20} lg={20} xl={20}>
          <CurrentPriceCard priceAPI={chainPriceAPI} />
        </Col>
      </Row>
    </div>
  );
};

export default GasFeeDashboard;