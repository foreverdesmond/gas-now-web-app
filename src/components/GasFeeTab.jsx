import React from 'react';
import { Tabs } from 'antd';
import GasFeeDashboard from './GasFeeDashboard'; // 确保路径正确

const { TabPane } = Tabs;

const GasFeeTab = ({ chains }) => {
  console.log("chains", chains);
  return (
    <Tabs defaultActiveKey="1" centered>
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
          <GasFeeDashboard chainName={chain.name} chainGasFeeServiceAPI={chain.gasFeeServiceAPI} chainPriceAPI={chain.priceAPI} />
          {/* 这里可以添加其他链特有的信息 */}
          <div>{chain.specialInfo}</div>
        </TabPane>
      ))}
    </Tabs>
  );
};

export default GasFeeTab;
