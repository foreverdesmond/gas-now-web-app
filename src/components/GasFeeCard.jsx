import React, { useState, useEffect, useRef } from 'react';
import { Card, Typography, Space } from 'antd';

const { Title, Text } = Typography;

// 颜色转换辅助函数
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
  
  return colorMap[color.toLowerCase()] || '#FF0000'; // 默认返回红色
};

const GasFeeCard = ({ title, price, maxFee, priorityFee, time, color, refreshTime = 6000 }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [fillHeight, setFillHeight] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const cardRef = useRef(null);
  
  // 转换颜色为十六进制格式
  const hexColor = getHexColor(color);

  // 生成图标路径
  const iconPath = `/assets/icons/GasIcon/${title}.webp`;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 处理渐进填充动画效果
  useEffect(() => {
    // 设置初始状态
    setFillHeight(0);
    startTimeRef.current = Date.now();
    
    // 清除之前的定时器
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // 创建新的动画定时器
    const animateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const percentComplete = Math.min(elapsed / refreshTime, 1);
      setFillHeight(percentComplete * 100);
      
      if (percentComplete < 1) {
        // 使用 requestAnimationFrame 获得更平滑的动画
        requestAnimationFrame(animateProgress);
      }
    };
    
    // 启动动画
    requestAnimationFrame(animateProgress);
    
    // 清理函数
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [price, refreshTime]); // 确保在price或refreshTime变化时重新开始动画

  const isMobile = windowWidth < 576;
  
  // 计算填充色的透明度
  const getFillColor = () => {
    // 使用不同透明度，让填充效果更明显
    const alpha = '40'; // 十六进制的 25% 透明度
    return `${hexColor}${alpha}`;
  };

  return (
    <Card
      ref={cardRef}
      style={{ 
        border: `2px solid ${color}`, 
        borderRadius: '10px', 
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden' // 确保填充不会溢出卡片
      }}
      bodyStyle={{ 
        padding: isMobile ? '12px 8px' : '24px',
        position: 'relative',
        zIndex: 2 // 确保内容在填充层上面
      }}
    >
      {/* 渐进填充层 */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: `${fillHeight}%`,
          backgroundColor: getFillColor(),
          backgroundImage: `linear-gradient(to top, ${hexColor}50, ${hexColor}30)`, // 使用十六进制颜色
          transition: 'height 0.05s linear',
          zIndex: 1,
          pointerEvents: 'none' // 确保填充层不会影响交互
        }}
        data-testid={`fill-animation-${title.toLowerCase()}`} // 添加测试ID便于调试
      />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 0 8px 0', position: 'relative' }}>
        <img 
          src={iconPath} 
          alt={`${title} icon`} 
          style={{ 
            width: isMobile ? '18px' : '22px', 
            height: isMobile ? '18px' : '22px', 
            marginRight: '5px',
            objectFit: 'contain',
            filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(105%) contrast(105%)'
          }} 
        />
        <Title level={4} style={{ color, margin: 0, fontSize: isMobile ? '16px' : '18px', position: 'relative' }}>
          {title}
        </Title>
      </div>
      <Title level={2} style={{ color, margin: '0 0 10px 0', fontSize: isMobile ? '24px' : '30px', position: 'relative' }}>
        {price}
      </Title>
      <div style={{ position: 'relative' }}>
        <Text style={{ display: 'block', fontSize: isMobile ? '12px' : '14px' }}>
          PriortyFee: {priorityFee}
        </Text>
        <Text style={{ display: 'block', fontSize: isMobile ? '12px' : '14px' }}>
          MaxFee: {maxFee}
        </Text>
        <Text style={{ display: 'block', fontSize: isMobile ? '12px' : '14px' }}>
          Estimated Time: {time}
        </Text>
      </div>
    </Card>
  );
};

export default GasFeeCard;