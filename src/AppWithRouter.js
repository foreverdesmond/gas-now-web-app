import React, { useState, useEffect } from "react";
import { Layout, ConfigProvider, Typography } from "antd";
import { Routes, Route } from "react-router-dom";
import GasFeeTab from "./components/GasFeeTab";
import NetworkSpecificPage from "./components/NetworkSpecificPage";
import BlogIndex from "./components/BlogIndex";
import BlogPost from "./components/BlogPost";

const { Header, Content } = Layout;
const { Title } = Typography;

// 从环境变量获取API基础URL，如果没有则使用模拟API
const API_BASE_URL = process.env.REACT_APP_API_URL || "mock";
const USE_MOCK_API =
  process.env.REACT_APP_USE_MOCK_API === "true" || API_BASE_URL === "mock";
const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT || "development";

console.log("API_BASE_URL:", API_BASE_URL);
console.log("USE_MOCK_API:", USE_MOCK_API);
console.log("Environment:", ENVIRONMENT);

const chains = [
  {
    name: "ETH",
    logo: "/assets/icons/ethereum-logo.png",
    specialInfo: "Ethereum specific info",
    gasFeeServiceAPI: USE_MOCK_API
      ? "mock"
      : `${API_BASE_URL}/api/GasFeeBlockNavie/currentgas?networkId=`,
    priceAPI: USE_MOCK_API ? "mock" : `${API_BASE_URL}/api/Price/currentprice`,
    networkId: 1,
  },
  {
    name: "Arbitrum One",
    logo: "/assets/icons/arb-logo.png",
    specialInfo: "Arbitrum One specific info",
    gasFeeServiceAPI: USE_MOCK_API
      ? "mock"
      : `${API_BASE_URL}/api/GasFeeBlockNavie/currentgas?networkId=`,
    priceAPI: USE_MOCK_API ? "mock" : `${API_BASE_URL}/api/Price/currentprice`,
    networkId: 42161,
  },
  {
    name: "Base",
    logo: "/assets/icons/base-logo.png",
    specialInfo: "Base specific info",
    gasFeeServiceAPI: USE_MOCK_API
      ? "mock"
      : `${API_BASE_URL}/api/GasFeeBlockNavie/currentgas?networkId=`,
    priceAPI: USE_MOCK_API ? "mock" : `${API_BASE_URL}/api/Price/currentprice`,
    networkId: 8453,
  },
  {
    name: "Linea",
    logo: "/assets/icons/linea-logo.png",
    specialInfo: "Linea specific info",
    gasFeeServiceAPI: USE_MOCK_API
      ? "mock"
      : `${API_BASE_URL}/api/GasFeeBlockNavie/currentgas?networkId=`,
    priceAPI: USE_MOCK_API ? "mock" : `${API_BASE_URL}/api/Price/currentprice`,
    networkId: 59144,
  },
  {
    name: "Optimism",
    logo: "/assets/icons/Optimism-logo.png",
    specialInfo: "Linea specific info",
    gasFeeServiceAPI: USE_MOCK_API
      ? "mock"
      : `${API_BASE_URL}/api/GasFeeBlockNavie/currentgas?networkId=`,
    priceAPI: USE_MOCK_API ? "mock" : `${API_BASE_URL}/api/Price/currentprice`,
    networkId: 10,
  },
  {
    name: "zkSync Era",
    logo: "/assets/icons/zksync-logo.png",
    specialInfo: "zkSync specific info",
    gasFeeServiceAPI: USE_MOCK_API
      ? "mock"
      : `${API_BASE_URL}/api/GasFeeBlockNavie/currentgas?networkId=`,
    priceAPI: USE_MOCK_API ? "mock" : `${API_BASE_URL}/api/Price/currentprice`,
    networkId: 324,
  },
];

function AppWithRouter() {
  // 监听窗口大小变化，用于响应式调整
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 根据屏幕宽度设置标题样式
  const getTitleFontSize = () => {
    if (windowWidth < 576) {
      return "16px"; // 小屏幕
    } else if (windowWidth < 992) {
      return "20px"; // 中屏幕
    } else {
      return "24px"; // 大屏幕
    }
  };

  const headerStyle = {
    color: "white",
    textAlign: "center",
    height: "auto",
    lineHeight: "1.5",
    padding: "12px 0",
  };

  const titleStyle = {
    color: "white",
    fontSize: getTitleFontSize(),
    margin: 0,
    padding: 0,
    whiteSpace: "nowrap", // 防止文本换行
    overflow: "hidden",
    textOverflow: "ellipsis", // 超出部分显示省略号
  };

  return (
    <ConfigProvider
      theme={{ token: { colorBgBase: "#141414", colorTextBase: "#ffffff" } }}
    >
      <Layout>
        <Header style={headerStyle}>
          <Title
            level={windowWidth < 576 ? 4 : windowWidth < 992 ? 3 : 2}
            style={titleStyle}
          >
            Gas Now -- Gas query tool available anytime anywhere.
          </Title>
        </Header>
        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<GasFeeTab chains={chains} />} />
            <Route
              path="/eth-gas"
              element={<NetworkSpecificPage chain={chains[0]} />}
            />
            <Route
              path="/arbitrum-gas"
              element={<NetworkSpecificPage chain={chains[1]} />}
            />
            <Route
              path="/base-gas"
              element={<NetworkSpecificPage chain={chains[2]} />}
            />
            <Route
              path="/linea-gas"
              element={<NetworkSpecificPage chain={chains[3]} />}
            />
            <Route
              path="/optimism-gas"
              element={<NetworkSpecificPage chain={chains[4]} />}
            />
            <Route
              path="/zksync-gas"
              element={<NetworkSpecificPage chain={chains[5]} />}
            />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default AppWithRouter;
