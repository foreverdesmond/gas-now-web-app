import axios from "axios";

export const getCurrentPrice = async (priceAPI) => {
  try {
    const response = await axios.get(priceAPI); // 使用传入的 priceAPI
    return response.data; // 假设返回的数据结构符合 CurrentPriceCard 的需求
  } catch (error) {
    console.error("Error fetching price data: ", error);
    throw error; // 抛出错误以便在组件中处理
  }
};
