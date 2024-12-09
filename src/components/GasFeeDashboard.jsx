import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import GasFeeCard from './GasFeeCard';
import CurrentPriceCard from './CurrentPriceCard';
import { getCurrentGasFee } from '../service/gasFeeService';

const GasFeeDashboard = ({ chainName ,chainGasFeeServiceAPI, chainPriceAPI}) => {
  console.log("chain", chainName);
  console.log("chain.gasFeeServiceAPI", chainGasFeeServiceAPI);
  const [gasFee, setGasFee] = useState(null);

  useEffect(() => {
    const fetchGasFee = async () => {
      try {
        console.log("chain.gasFeeServiceAPI", chainGasFeeServiceAPI);
        const data = await getCurrentGasFee(chainGasFeeServiceAPI);
        console.log('Fetched gas fee data:', data);
        setGasFee(data);
      } catch (error) {
        console.error('Error fetching gas fee data:', error);
      }
    };

    fetchGasFee();

    const interval = setInterval(fetchGasFee, 6000);

    return () => clearInterval(interval);
  }, [chainGasFeeServiceAPI]);

  if (!gasFee) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={6}>
          <GasFeeCard
            title="Rapid"
            maxFee={gasFee.rapidMaxFee.toFixed(1)}
            priorityFee={gasFee.rapidPriorityFee.toFixed(2)}
            time="~12 Seconds"
            color="green"
          />
        </Col>
        <Col span={6}>
          <GasFeeCard
            title="Fast"
            maxFee={gasFee.fastMaxFee.toFixed(1)}
            priorityFee={gasFee.fastPriorityFee.toFixed(2)}
            time="~48 Seconds"
            color="orange"
          />
        </Col>
        <Col span={6}>
          <GasFeeCard
            title="Standard"
            maxFee={gasFee.normalMaxFee.toFixed(1)}
            priorityFee={gasFee.normalPriorityFee.toFixed(2)}
            time="~2 Minutes"
            color="yellow"
          />
        </Col>
        <Col span={6}>
          <GasFeeCard
            title="Slow"
            maxFee={gasFee.slowMaxFee.toFixed(1)}
            priorityFee={gasFee.slowPriorityFee.toFixed(2)}
            time="~3 Minutes"
            color="red"
          />
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }} justify="center">
        <Col span={12}>
          <CurrentPriceCard priceAPI={chainPriceAPI} />
        </Col>
      </Row>
    </div>
  );
};

export default GasFeeDashboard;