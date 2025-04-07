import React, { useEffect, useState, useRef } from 'react';
import { Card, Typography, Row, Col } from 'antd';
import { getCurrentPrice } from '../service/priceService';

const { Title, Text } = Typography;

// 定义价格卡片刷新间隔（毫秒）
const REFRESH_INTERVAL = 12000;

// 从 GasFeeCard 复用颜色转换辅助函数
const getHexColor = (color) => {
  // 如果已经是十六进制格式，直接返回
  if (color.startsWith('#')) {
    return color;
  }
  
  // 将颜色名称转换为十六进制
  const colorMap = {
    red: '#FF0000',
    green: '#008000',
    blue: '#0000FF',
    yellow: '#FFFF00',
    orange: '#FFA500',
    purple: '#800080',
    cyan: '#00FFFF',
    magenta: '#FF00FF',
    lime: '#00FF00',
    pink: '#FFC0CB',
    teal: '#008080',
    lavender: '#E6E6FA',
    brown: '#A52A2A',
    maroon: '#800000',
    navy: '#000080',
    olive: '#808000',
  };
  
  return colorMap[color.toLowerCase()] || '#2196F3'; // 默认返回蓝色
};

const CurrentPriceCard = ({ priceAPI }) => {
  console.log("priceAPI", priceAPI);
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [fillWidth, setFillWidth] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
  const animationRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const cardRef = useRef(null);

  // 价格卡片的主色调（与渐变边框颜色匹配）
  const cardColor = '#2196F3';
  const hexColor = getHexColor(cardColor);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 576;
  const isTablet = windowWidth >= 576 && windowWidth < 992;
  const isDesktop = windowWidth >= 992;

  // 处理渐进填充动画效果（从左向右）
  useEffect(() => {
    // 重置填充宽度和开始时间
    setFillWidth(0);
    startTimeRef.current = Date.now();
    
    // 清除之前的动画帧
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    // 创建新的动画
    const animateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const percentComplete = Math.min(elapsed / REFRESH_INTERVAL, 1);
      setFillWidth(percentComplete * 100);
      
      if (percentComplete < 1) {
        // 使用 requestAnimationFrame 获得更平滑的动画
        animationRef.current = requestAnimationFrame(animateProgress);
      }
    };
    
    // 启动动画
    animationRef.current = requestAnimationFrame(animateProgress);
    
    // 清理函数
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [price]); // 当价格数据更新时重新开始动画

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        console.log("priceAPI", priceAPI);
        const data = await getCurrentPrice(priceAPI);
        console.log('Fetched price data:', data);
        setPrice(data);
        setLastUpdateTime(Date.now()); // 记录最后更新时间
      } catch (error) {
        console.error('Error fetching price data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();

    const interval = setInterval(fetchPrice, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [priceAPI]);

  if (loading) {
    return (
      <Card 
        loading={true} 
        style={{ 
          width: '100%',
          borderRadius: '10px',
          height: '100%',
          background: 'transparent',
          textAlign: 'center'
        }} 
      />
    );
  }

  if (error) {
    return (
      <Card 
        title="Error" 
        style={{ 
          width: '100%',
          borderRadius: '10px',
          border: '2px solid red',
          textAlign: 'center'
        }}
      >
        {error}
      </Card>
    );
  }

  return (
    <Card
      ref={cardRef}
      bordered={false}
      style={{ 
        width: '100%',
        borderRadius: '10px',
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative'
      }}
      bodyStyle={{ 
        padding: isMobile ? '12px 8px' : isTablet ? '16px 12px' : '24px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2 // 确保内容在填充层上面
      }}
    >
      {/* 渐变边框效果 */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: '2px', // 边框厚度
          borderRadius: '10px',
          background: 'linear-gradient(90deg, #2196F3, #21CBF3, #64B5F6, #42A5F5, #1976D2)',
          zIndex: 0,
        }}
      >
        <div 
          style={{
            width: '100%', 
            height: '100%', 
            background: '#141414', // 和页面背景相同
            borderRadius: '8px',
          }} 
        />
      </div>

      {/* 从左向右的渐进填充层 */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: `${fillWidth}%`,
          backgroundImage: `linear-gradient(to right, ${hexColor}50, ${hexColor}30)`, // 从左到右的渐变
          transition: 'width 0.05s linear',
          zIndex: 1,
          pointerEvents: 'none', // 确保填充层不会影响交互
          borderRadius: '10px 0 0 10px' // 只圆角左侧
        }}
        data-testid="fill-animation-price-card"
      />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <Title level={3} className="gradient-text" style={{ 
          margin: '0 0 16px 0', 
          fontSize: isMobile ? '18px' : isTablet ? '20px' : '22px'
        }}>
          Current ETH Price
        </Title>
        
        <Row justify="center" align="middle" gutter={isDesktop ? 64 : isTablet ? 32 : 20}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ 
            borderRight: isTablet || isDesktop ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            paddingRight: isTablet || isDesktop ? '20px' : '0',
            borderBottom: isMobile ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            paddingBottom: isMobile ? '16px' : '0',
            marginBottom: isMobile ? '16px' : '0'
          }}>
            <Title level={2} style={{ 
              margin: '0 0 5px 0', 
              fontSize: isMobile ? '24px' : isTablet ? '26px' : '32px',
              background: 'linear-gradient(90deg, #2196F3, #21CBF3, #64B5F6, #42A5F5, #1976D2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              ${price.ethUsdPrice.toFixed(2)}
            </Title>
            <Text style={{ 
              fontSize: isMobile ? '12px' : isTablet ? '13px' : '14px',
              opacity: 0.8
            }}>
              ETH/USD
            </Text>
          </Col>
          
          <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ paddingLeft: isTablet || isDesktop ? '20px' : '0' }}>
            <Title level={2} style={{ 
              margin: '0 0 5px 0', 
              fontSize: isMobile ? '24px' : isTablet ? '26px' : '32px',
              background: 'linear-gradient(90deg, #2196F3, #21CBF3, #64B5F6, #42A5F5, #1976D2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              {price.ethBtcPrice.toFixed(6)}
            </Title>
            <Text style={{ 
              fontSize: isMobile ? '12px' : isTablet ? '13px' : '14px',
              opacity: 0.8
            }}>
              ETH/BTC
            </Text>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default CurrentPriceCard;