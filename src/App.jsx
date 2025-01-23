import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import GasFeeTab from './components/GasFeeTab';

const { Header, Content } = Layout;

const chains = [
  {
    name: 'ETH',
    logo: '/assets/icons/ethereum-logo.png',
    specialInfo: 'Ethereum specific info',
    gasFeeServiceAPI: 'http://104.194.88.159:5000/api/GasFeeBlockNavie/currentgas?networkId=',
    //gasFeeServiceAPI: 'https://localhost:7050/api/GasFeeBlockNavie/currentgas?networkId=',
    priceAPI: 'http://104.194.88.159:5000/api/Price/currentprice',
    //priceAPI: 'https://localhost:7050/api/Price/currentprice',
    networkId: 1,
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
  return (
    <ConfigProvider theme={{ token: { colorBgBase: '#141414', colorTextBase: '#ffffff' } }}>
      <Layout>
        <Header style={{ color: 'white', textAlign: 'center' }}>
          Gas Now -- Gas query tool available anytime anywhere.
        </Header>
        <Content style={{ padding: '20px' }}>
          <GasFeeTab chains={chains}/>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;