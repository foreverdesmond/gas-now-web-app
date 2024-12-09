import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import GasFeeTab from './components/GasFeeTab';

const { Header, Content } = Layout;

const chains = [
  {
    name: 'ETH',
    logo: '/assets/icons/ethereum-logo.png',
    specialInfo: 'Ethereum specific info',
    // gasFeeServiceAPI: 'http://104.194.88.159:5171/api/GasFee/currentgas',
    gasFeeServiceAPI: 'https://localhost:7050/api/GasFee/currentgas',
    // priceAPI: 'http://104.194.88.159:5171/api/Price/currentprice',
    priceAPI: 'https://localhost:7050/api/Price/currentprice',
  },
  {
    name: 'Linea',
    logo: '/assets/icons/linea-logo.png',
    specialInfo: 'Linea specific info',
    //gasFeeServiceAPI: 'http://104.194.88.159:5171/api/GasFee/currentgas',
    //priceAPI: 'http://104.194.88.159:5171/api/Price/currentprice',
    gasFeeServiceAPI: 'https://localhost:7050/api/GasFee/currentgas',
    priceAPI: 'https://localhost:7050/api/Price/currentprice',
  },
  {
    name: 'zkSync Era',
    logo: '/assets/icons/zksync-logo.png',
    specialInfo: 'zkSync specific info',
    //gasFeeServiceAPI: 'http://104.194.88.159:5171/api/GasFee/currentgas',
    //priceAPI: 'http://104.194.88.159:5171/api/Price/currentprice',
    gasFeeServiceAPI: 'https://localhost:7050/api/GasFee/currentgas',
    priceAPI: 'https://localhost:7050/api/Price/currentprice',
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