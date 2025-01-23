import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import GasFeeCard from './GasFeeCard';
import CurrentPriceCard from './CurrentPriceCard';
import { getCurrentGasFee } from '../service/gasFeeService';
import NetworkInfo from './NetworkInfoCard';

const GasFeeDashboard = ({ chainName ,chainGasFeeServiceAPI, chainPriceAPI, chainNetworkId}) => {
  console.log("chain", chainName);
  console.log("chain.gasFeeServiceAPI", chainGasFeeServiceAPI);
  const [gasFee, setGasFee] = useState(null);

  useEffect(() => {
    const fetchGasFee = async () => {
      try {
        console.log("chain.gasFeeServiceAPI", chainGasFeeServiceAPI);
        console.log("chian.networkID",chainNetworkId);
        const request = chainGasFeeServiceAPI+chainNetworkId;
        const data = await getCurrentGasFee(request);
        console.log('Fetched gas fee data:', data);
        setGasFee(data);
      } catch (error) {
        console.error('Error fetching gas fee data:', error);
      }
    };

    fetchGasFee();

    const interval = setInterval(fetchGasFee, 30000);

    return () => clearInterval(interval);
  }, [chainGasFeeServiceAPI]);

  if (!gasFee) {
    return <p>Loading...</p>;
  }

  const baseFee = parseFloat(gasFee.blockPrices[0].baseFeePerGas).toFixed(6);

  return (
    <div style={{ padding: '20px' }}>
      <Row style={{ marginTop: '20px' }} justify="center">
        <NetworkInfo chainName = {chainName} baseFee ={baseFee} blockNumber ={gasFee.blockPrices[0].blockNumber}/>
      </Row>
      <Row gutter={20} justify="center">
        <Col span={4.5}>
          <GasFeeCard
            title="Turbo"
            price={gasFee.blockPrices[0].estimatedPrices[0].price.toFixed(4)}
            maxFee={gasFee.blockPrices[0].estimatedPrices[0].maxFeePerGas.toFixed(4)}
            priorityFee={gasFee.blockPrices[0].estimatedPrices[0].maxPriorityFeePerGas.toFixed(4)}
            time="~12 Seconds"
            color="#4CAF50"
          />
        </Col>
        <Col span={4.5}>
          <GasFeeCard
            title="Fast"
            price={gasFee.blockPrices[0].estimatedPrices[1].price.toFixed(4)}
            maxFee={gasFee.blockPrices[0].estimatedPrices[1].maxFeePerGas.toFixed(4)}
            priorityFee={gasFee.blockPrices[0].estimatedPrices[1].maxPriorityFeePerGas.toFixed(4)}
            time="~48 Seconds"
            color="#8BC34A"
          />
        </Col>
        <Col span={4.5}>
          <GasFeeCard
            title="Standard"
            price={gasFee.blockPrices[0].estimatedPrices[2].price.toFixed(4)}
            maxFee={gasFee.blockPrices[0].estimatedPrices[2].maxFeePerGas.toFixed(4)}
            priorityFee={gasFee.blockPrices[0].estimatedPrices[2].maxPriorityFeePerGas.toFixed(4)}
            time="~2 Minutes"
            color="#FFC107"
          />
        </Col>
        <Col span={4.5}>
          <GasFeeCard
            title="Economy"
            price={gasFee.blockPrices[0].estimatedPrices[3].price.toFixed(4)}
            maxFee={gasFee.blockPrices[0].estimatedPrices[3].maxFeePerGas.toFixed(4)}
            priorityFee={gasFee.blockPrices[0].estimatedPrices[3].maxPriorityFeePerGas.toFixed(4)}
            time="~3 Minutes"
            color="#FF9800"
          />
        </Col>
        <Col span={4.5}>
          <GasFeeCard
            title="Saver"
            price={gasFee.blockPrices[0].estimatedPrices[4].price.toFixed(4)}
            maxFee={gasFee.blockPrices[0].estimatedPrices[4].maxFeePerGas.toFixed(4)}
            priorityFee={gasFee.blockPrices[0].estimatedPrices[4].maxPriorityFeePerGas.toFixed(4)}
            time="~4 Minutes"
            color="red"
          />
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }} justify="center">
        <Col span={20}>
          <CurrentPriceCard priceAPI={chainPriceAPI} />
        </Col>
      </Row>
    </div>
  );
};

export default GasFeeDashboard;