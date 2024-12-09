import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { getCurrentPrice } from '../service/priceService';

const CurrentPriceCard = ({ priceAPI }) => {
  console.log("priceAPI", priceAPI);
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        console.log("priceAPI", priceAPI);
        const data = await getCurrentPrice(priceAPI);
        console.log('Fetched price data:', data);
        setPrice(data);
      } catch (error) {
        console.error('Error fetching price data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();

    const interval = setInterval(fetchPrice, 12000);

    return () => clearInterval(interval);
  }, [priceAPI]);

  if (loading) {
    return <Card loading={true} style={{ width: '100%' }} />;
  }

  if (error) {
    return <Card title="Error" style={{ width: '100%' }}>{error}</Card>;
  }

  return (
    <Card title="Current Price" style={{ width: '100%' }}>
      <p>ETH/USD: {price.ethUsdPrice.toFixed(2)}</p>
      <p>ETH/BTC: {price.ethBtcPrice.toFixed(6)}</p>
    </Card>
  );
};

export default CurrentPriceCard;