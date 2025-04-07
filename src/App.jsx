import React, { useState, useEffect } from 'react';
import { Layout, ConfigProvider, Typography } from 'antd';
import GasFeeTab from './components/GasFeeTab';

const { Header, Content } = Layout;
const { Title } = Typography;

const chains = [
  {
    name: 'ETH',
    logo: '/assets/icons/ethereum-logo.png',
    specialInfo: 'Ethereum specific info',
    gasFeeServiceAPI: 'http://104.194.88.159:5000/api/GasFeeBlockNavie/currentgas?networkId=',
    priceAPI: 'http://104.194.88.159:5000/api/Price/currentprice',
    //gasFeeServiceAPI: 'https://localhost:7050/api/GasFeeBlockNavie/currentgas?networkId=',
    //priceAPI: 'https://localhost:7050/api/Price/currentprice',
    networkId:1,
  },
  {
    name: 'Arbitrum One',
    logo: '/assets/icons/arb-logo.png',
    specialInfo: 'Arbitrum One specific info',
    gasFeeServiceAPI: 'http://104.194.88.159:5000/api/GasFeeBlockNavie/currentgas?networkId=',
    priceAPI: 'http://104.194.88.159:5000/api/Price/currentprice',
    //gasFeeServiceAPI: 'https://localhost:7050/api/GasFeeBlockNavie/currentgas?networkId=',
    //priceAPI: 'https://localhost:7050/api/Price/currentprice',
    networkId: 42161,
  },
  {
    name: 'Base',
    logo: '/assets/icons/base-logo.png',
    specialInfo: 'Base specific info',
    gasFeeServiceAPI: 'http://104.194.88.159:5000/api/GasFeeBlockNavie/currentgas?networkId=',
    priceAPI: 'http://104.194.88.159:5000/api/Price/currentprice',
    //gasFeeServiceAPI: 'https://localhost:7050/api/GasFeeBlockNavie/currentgas?networkId=',
    //priceAPI: 'https://localhost:7050/api/Price/currentprice',
    networkId: 8453,
  },
  {
    name: 'Linea',
    logo: '/assets/icons/linea-logo.png',
    specialInfo: 'Linea specific info',
    gasFeeServiceAPI: 'http://104.194.88.159:5000/api/GasFeeBlockNavie/currentgas?networkId=',
    priceAPI: 'http://104.194.88.159:5000/api/Price/currentprice',
    //gasFeeServiceAPI: 'https://localhost:7050/api/GasFeeBlockNavie/currentgas?networkId=',
    //priceAPI: 'https://localhost:7050/api/Price/currentprice',
    networkId: 59144,
  },
  {
    name: 'Optimism',
    logo: '/assets/icons/Optimism-logo.png',
    specialInfo: 'Linea specific info',
    gasFeeServiceAPI: 'http://104.194.88.159:5000/api/GasFeeBlockNavie/currentgas?networkId=',
    priceAPI: 'http://104.194.88.159:5000/api/Price/currentprice',
    //gasFeeServiceAPI: 'https://localhost:7050/api/GasFeeBlockNavie/currentgas?networkId=',
    //priceAPI: 'https://localhost:7050/api/Price/currentprice',
    networkId: 10,
  },
  {
    name: 'zkSync Era',
    logo: '/assets/icons/zksync-logo.png',
    specialInfo: 'zkSync specific info',
    gasFeeServiceAPI: 'http://104.194.88.159:5000/api/GasFeeBlockNavie/currentgas?networkId=',
    priceAPI: 'http://104.194.88.159:5000/api/Price/currentprice',
    //gasFeeServiceAPI: 'https://localhost:7050/api/GasFeeBlockNavie/currentgas?networkId=',
    //priceAPI: 'https://localhost:7050/api/Price/currentprice',
    networkId: 324,
  },
];

function App() {
  // 监听窗口大小变化，用于响应式调整
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 根据屏幕宽度设置标题样式
  const getTitleFontSize = () => {
    if (windowWidth < 576) {
      return '16px'; // 小屏幕
    } else if (windowWidth < 992) {
      return '20px'; // 中屏幕
    } else {
      return '24px'; // 大屏幕
    }
  };

  const headerStyle = {
    color: 'white',
    textAlign: 'center',
    height: 'auto',
    lineHeight: '1.5',
    padding: '12px 0'
  };

  const titleStyle = {
    color: 'white',
    fontSize: getTitleFontSize(),
    margin: 0,
    padding: 0,
    whiteSpace: 'nowrap', // 防止文本换行
    overflow: 'hidden',
    textOverflow: 'ellipsis' // 超出部分显示省略号
  };

  return (
    <ConfigProvider theme={{ token: { colorBgBase: '#141414', colorTextBase: '#ffffff' } }}>
      <Layout>
        <Header style={headerStyle}>
          <Title level={windowWidth < 576 ? 4 : windowWidth < 992 ? 3 : 2} style={titleStyle}>
            Gas Now -- Gas query tool available anytime anywhere.
          </Title>
        </Header>
        <Content style={{ padding: '20px' }}>
          <GasFeeTab chains={chains}/>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;