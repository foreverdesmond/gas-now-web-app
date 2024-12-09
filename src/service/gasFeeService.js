import axios from "axios";

export const getCurrentGasFee = async (API_URL) => {
  console.log("API_URL", API_URL);
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching gas fee data: ", error);
    throw error;
  }
};
