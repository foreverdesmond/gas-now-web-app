import React, { useState, useEffect } from 'react';
import { Tabs, Select, Space } from 'antd';
import GasFeeDashboard from './GasFeeDashboard';

const { TabPane } = Tabs;

const GasFeeTab = ({ chains }) => {
  console.log("chains", chains);
  const [isMobile, setIsMobile] = useState(false);
  // 存储选中链的索引，而不是对象本身
  const [selectedChainIndex, setSelectedChainIndex] = useState(0);
  // 根据索引获取选中的链
  const selectedChain = chains[selectedChainIndex];

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // 初始化
    handleResize();
    
    // 添加事件监听
    window.addEventListener('resize', handleResize);
    
    // 清除事件监听
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 处理下拉菜单选择变化
  const handleChainChange = (value) => {
    setSelectedChainIndex(value);
  };

  // 处理标签页选择变化
  const handleTabChange = (activeKey) => {
    // 标签页的 key 是从 1 开始的，所以需要减 1
    setSelectedChainIndex(parseInt(activeKey) - 1);
  };

  // 移动端显示下拉菜单
  if (isMobile) {
    return (
      <div>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <Select
            style={{ width: '80%', maxWidth: '300px' }}
            onChange={handleChainChange}
            value={selectedChainIndex} // 使用 value 而不是 defaultValue 以保持状态
          >
            {chains.map((chain, index) => (
              <Select.Option key={index} value={index}>
                <Space>
                  <img src={chain.logo} alt={`${chain.name} logo`} style={{ width: '20px' }} />
                  {chain.name}
                </Space>
              </Select.Option>
            ))}
          </Select>
        </div>
        <GasFeeDashboard 
          chainName={selectedChain.name} 
          chainGasFeeServiceAPI={selectedChain.gasFeeServiceAPI} 
          chainPriceAPI={selectedChain.priceAPI} 
          chainNetworkId={selectedChain.networkId}
        />
      </div>
    );
  }

  // 桌面端显示标签页
  return (
    <Tabs 
      activeKey={(selectedChainIndex + 1).toString()} // 将索引转换为字符串，并加 1 以匹配 TabPane 的 key
      onChange={handleTabChange} 
      centered
    >
      {chains.map((chain, index) => (
        <TabPane
          tab={
            <span style={{ textAlign: 'center' }}>
              <img src={chain.logo} alt={`${chain.name} logo`} style={{ width: '20px', marginRight: '8px' }} />
              {chain.name}
            </span>
          }
          key={index + 1}
        >
          <GasFeeDashboard 
            chainName={chain.name} 
            chainGasFeeServiceAPI={chain.gasFeeServiceAPI} 
            chainPriceAPI={chain.priceAPI} 
            chainNetworkId={chain.networkId}
          />
          {/* 这里可以添加其他链特有的信息 */}
          {/*<div>{chain.specialInfo}</div>*/}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default GasFeeTab;
