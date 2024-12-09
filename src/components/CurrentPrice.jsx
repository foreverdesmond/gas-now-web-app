import React, { useEffect, useState } from 'react';

function CurrentPrice() {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrice = async () => {
    try {
      const response = await fetch('http://104.194.88.159:5171/api/Price/currentprice');
      //const response = await fetch('https://localhost:7050/api/Price/currentprice');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPrice(data); // Assuming the response contains the price directly
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice(); // Initial fetch

    // Set up interval to fetch price every 12 seconds
    const interval = setInterval(fetchPrice, 12000); // 12000 milliseconds = 12 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h1>Current ETH Price</h1>
        <p>ETH/USD: {price.ethUsdPrice.toFixed(2)}</p>
        <p>ETH/BTC: {price.ethBtcPrice.toFixed(6)}</p>
      </div>
    </div>
  );
}

export default CurrentPrice;