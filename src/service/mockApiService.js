// 模拟API服务，用于本地开发测试
export const mockGasFeeData = {
  1: {
    // Ethereum
    fast: { gasPrice: 25, estimatedTime: "48 seconds" },
    standard: { gasPrice: 20, estimatedTime: "2 minutes" },
    slow: { gasPrice: 15, estimatedTime: "3 minutes" },
  },
  42161: {
    // Arbitrum
    fast: { gasPrice: 0.1, estimatedTime: "1 minute" },
    standard: { gasPrice: 0.08, estimatedTime: "2 minutes" },
    slow: { gasPrice: 0.05, estimatedTime: "3 minutes" },
  },
  8453: {
    // Base
    fast: { gasPrice: 0.05, estimatedTime: "1 minute" },
    standard: { gasPrice: 0.03, estimatedTime: "2 minutes" },
    slow: { gasPrice: 0.02, estimatedTime: "3 minutes" },
  },
  59144: {
    // Linea
    fast: { gasPrice: 0.08, estimatedTime: "1 minute" },
    standard: { gasPrice: 0.06, estimatedTime: "2 minutes" },
    slow: { gasPrice: 0.04, estimatedTime: "3 minutes" },
  },
  10: {
    // Optimism
    fast: { gasPrice: 0.12, estimatedTime: "1 minute" },
    standard: { gasPrice: 0.08, estimatedTime: "2 minutes" },
    slow: { gasPrice: 0.05, estimatedTime: "3 minutes" },
  },
  324: {
    // zkSync
    fast: { gasPrice: 0.06, estimatedTime: "1 minute" },
    standard: { gasPrice: 0.04, estimatedTime: "2 minutes" },
    slow: { gasPrice: 0.02, estimatedTime: "3 minutes" },
  },
};

export const mockPriceData = {
  ethereum: { usd: 3200 },
  arbitrum: { usd: 1.2 },
  base: { usd: 0.8 },
  linea: { usd: 0.1 },
  optimism: { usd: 2.5 },
  zksync: { usd: 0.3 },
};

// 模拟API调用
export const mockApiCall = (endpoint, params = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (endpoint.includes("currentgas")) {
        const networkId = params.networkId || "1";
        resolve(mockGasFeeData[networkId] || mockGasFeeData["1"]);
      } else if (endpoint.includes("currentprice")) {
        resolve(mockPriceData);
      } else {
        resolve({ error: "Endpoint not found" });
      }
    }, 500); // 模拟网络延迟
  });
};
