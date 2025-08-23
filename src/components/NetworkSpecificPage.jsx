import React from 'react';
import { Layout, ConfigProvider, Typography } from 'antd';
import { Helmet } from 'react-helmet-async';
import GasFeeDashboard from './GasFeeDashboard';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

// Helper function to generate FAQ schema
const generateFaqSchema = (chainName) => {
  const faqs = {
    'ETH': [
      {
        question: "What are Ethereum gas fees?",
        answer: "Ethereum gas fees are the transaction costs required to perform operations on the Ethereum blockchain. They are paid in ETH and compensate validators for processing and securing transactions."
      },
      {
        question: "Why are Ethereum gas fees so high?",
        answer: "Ethereum gas fees increase during periods of high network congestion. When many users are trying to transact simultaneously, fees rise as users compete to have their transactions processed quickly."
      },
      {
        question: "How often do Ethereum gas fees update?",
        answer: "Ethereum gas fees update every 6 seconds on our tracker to provide real-time information. This frequent update interval ensures you always have the most current data for optimal transaction timing."
      },
      {
        question: "How can I reduce Ethereum gas fees?",
        answer: "To reduce Ethereum gas fees, consider using Layer 2 solutions like Arbitrum or Optimism, transacting during off-peak hours, or using gas fee tracking tools to identify optimal transaction times."
      }
    ],
    'Arbitrum One': [
      {
        question: "What are Arbitrum gas fees?",
        answer: "Arbitrum gas fees are the transaction costs for operations on the Arbitrum Layer 2 network. They are significantly lower than Ethereum mainnet fees while maintaining the same security guarantees."
      },
      {
        question: "How does Arbitrum reduce gas fees?",
        answer: "Arbitrum reduces gas fees by processing transactions off-chain and only submitting cryptographic proofs to Ethereum mainnet. This approach dramatically reduces the computational load on the mainnet."
      },
      {
        question: "How often do Arbitrum gas fees update?",
        answer: "Arbitrum gas fees update every 6 seconds on our tracker to provide real-time information about transaction costs on the Arbitrum network."
      },
      {
        question: "Is Arbitrum secure?",
        answer: "Yes, Arbitrum inherits security from Ethereum mainnet through cryptographic proofs. Transactions are ultimately secured by Ethereum's consensus mechanism."
      }
    ],
    'Base': [
      {
        question: "What are Base gas fees?",
        answer: "Base gas fees are the transaction costs for operations on Coinbase's Base Layer 2 network. They are significantly lower than Ethereum mainnet fees while maintaining the same security guarantees."
      },
      {
        question: "How does Base reduce gas fees?",
        answer: "Base reduces gas fees by processing transactions off-chain and only submitting cryptographic proofs to Ethereum mainnet. This approach dramatically reduces the computational load on the mainnet."
      },
      {
        question: "How often do Base gas fees update?",
        answer: "Base gas fees update every 6 seconds on our tracker to provide real-time information about transaction costs on the Base network."
      },
      {
        question: "Is Base secure?",
        answer: "Yes, Base inherits security from Ethereum mainnet through cryptographic proofs. Transactions are ultimately secured by Ethereum's consensus mechanism."
      }
    ],
    'Linea': [
      {
        question: "What are Linea gas fees?",
        answer: "Linea gas fees are the transaction costs for operations on ConsenSys's Linea zkEVM Layer 2 network. They are significantly lower than Ethereum mainnet fees while maintaining the same security guarantees."
      },
      {
        question: "How does Linea reduce gas fees?",
        answer: "Linea reduces gas fees by processing transactions off-chain and only submitting cryptographic proofs to Ethereum mainnet. This approach dramatically reduces the computational load on the mainnet."
      },
      {
        question: "How often do Linea gas fees update?",
        answer: "Linea gas fees update every 6 seconds on our tracker to provide real-time information about transaction costs on the Linea network."
      },
      {
        question: "Is Linea secure?",
        answer: "Yes, Linea inherits security from Ethereum mainnet through cryptographic proofs. Transactions are ultimately secured by Ethereum's consensus mechanism."
      }
    ],
    'Optimism': [
      {
        question: "What are Optimism gas fees?",
        answer: "Optimism gas fees are the transaction costs for operations on the Optimism Layer 2 network. They are significantly lower than Ethereum mainnet fees while maintaining the same security guarantees."
      },
      {
        question: "How does Optimism reduce gas fees?",
        answer: "Optimism reduces gas fees by processing transactions off-chain and only submitting cryptographic proofs to Ethereum mainnet. This approach dramatically reduces the computational load on the mainnet."
      },
      {
        question: "How often do Optimism gas fees update?",
        answer: "Optimism gas fees update every 6 seconds on our tracker to provide real-time information about transaction costs on the Optimism network."
      },
      {
        question: "Is Optimism secure?",
        answer: "Yes, Optimism inherits security from Ethereum mainnet through cryptographic proofs. Transactions are ultimately secured by Ethereum's consensus mechanism."
      }
    ],
    'zkSync Era': [
      {
        question: "What are zkSync gas fees?",
        answer: "zkSync gas fees are the transaction costs for operations on the zkSync Era Layer 2 network. They are significantly lower than Ethereum mainnet fees while maintaining the same security guarantees."
      },
      {
        question: "How does zkSync reduce gas fees?",
        answer: "zkSync reduces gas fees by processing transactions off-chain and only submitting cryptographic proofs to Ethereum mainnet. This approach dramatically reduces the computational load on the mainnet."
      },
      {
        question: "How often do zkSync gas fees update?",
        answer: "zkSync gas fees update every 6 seconds on our tracker to provide real-time information about transaction costs on the zkSync network."
      },
      {
        question: "Is zkSync secure?",
        answer: "Yes, zkSync inherits security from Ethereum mainnet through cryptographic proofs. Transactions are ultimately secured by Ethereum's consensus mechanism."
      }
    ]
  };

  return faqs[chainName] || faqs['ETH'];
};

// Helper function to generate breadcrumb schema
const generateBreadcrumbSchema = (chainName, path) => {
  const breadcrumbs = [
    {
      position: 1,
      name: "Home",
      item: "https://gasnow.link/"
    },
    {
      position: 2,
      name: `${chainName} Gas Fees`,
      item: `https://gasnow.link${path}`
    }
  ];

  return breadcrumbs;
};

const NetworkSpecificPage = ({ chain }) => {
  // Network-specific content for SEO
  const networkInfo = {
    'ETH': {
      title: 'Ethereum Gas Fees - Real-time Tracker',
      description: 'Track real-time Ethereum gas fees and transaction costs. Get instant updates on ETH gas prices for faster, cheaper transactions.',
      h1: 'Ethereum Gas Fees Tracker',
      h2: 'Real-time ETH Gas Price Monitoring',
      content: 'Ethereum gas fees are the transaction costs required to perform operations on the Ethereum blockchain. Our real-time tracker provides up-to-date information on gas prices, helping you optimize your transaction timing and costs. Ethereum gas fees fluctuate based on network congestion, with higher fees during peak usage times. Understanding these fees can help you save money on your ETH transactions.'
    },
    'Arbitrum One': {
      title: 'Arbitrum Gas Fees - Layer 2 Tracker',
      description: 'Monitor real-time Arbitrum gas fees and transaction costs. Track ARB gas prices for efficient and cost-effective Layer 2 transactions.',
      h1: 'Arbitrum Gas Fees Tracker',
      h2: 'Real-time ARB Gas Price Monitoring',
      content: 'Arbitrum is a Layer 2 scaling solution for Ethereum that significantly reduces gas fees while maintaining security. Our Arbitrum gas fee tracker provides real-time updates on transaction costs, helping you optimize your Layer 2 transactions. Arbitrum gas fees are typically much lower than Ethereum mainnet fees, making it an attractive option for cost-conscious users.'
    },
    'Base': {
      title: 'Base Gas Fees - Coinbase Layer 2 Tracker',
      description: 'Track real-time Base gas fees and transaction costs. Monitor BASE gas prices for efficient transactions on Coinbase\'s Layer 2 network.',
      h1: 'Base Gas Fees Tracker',
      h2: 'Real-time Base Gas Price Monitoring',
      content: 'Base is Coinbase\'s Layer 2 network built on Ethereum that offers significantly reduced gas fees. Our Base gas fee tracker provides real-time updates on transaction costs, helping you optimize your transactions on this popular Layer 2 solution. Base gas fees are typically much lower than Ethereum mainnet fees, making it an attractive option for cost-effective blockchain interactions.'
    },
    'Linea': {
      title: 'Linea Gas Fees - zkEVM Layer 2 Tracker',
      description: 'Monitor real-time Linea gas fees and transaction costs. Track LINEA gas prices for efficient zkEVM transactions.',
      h1: 'Linea Gas Fees Tracker',
      h2: 'Real-time Linea Gas Price Monitoring',
      content: 'Linea is a zkEVM Layer 2 solution developed by ConsenSys that offers reduced gas fees compared to Ethereum mainnet. Our Linea gas fee tracker provides real-time updates on transaction costs, helping you optimize your zkEVM transactions. Linea gas fees are typically much lower than Ethereum mainnet fees, making it an attractive option for cost-effective blockchain interactions.'
    },
    'Optimism': {
      title: 'Optimism Gas Fees - Optimistic Rollup Tracker',
      description: 'Track real-time Optimism gas fees and transaction costs. Monitor OP gas prices for efficient Optimistic Rollup transactions.',
      h1: 'Optimism Gas Fees Tracker',
      h2: 'Real-time OP Gas Price Monitoring',
      content: 'Optimism is an Optimistic Rollup Layer 2 solution for Ethereum that significantly reduces gas fees while maintaining security. Our Optimism gas fee tracker provides real-time updates on transaction costs, helping you optimize your Layer 2 transactions. Optimism gas fees are typically much lower than Ethereum mainnet fees, making it an attractive option for cost-conscious users.'
    },
    'zkSync Era': {
      title: 'zkSync Gas Fees - zkEVM Layer 2 Tracker',
      description: 'Monitor real-time zkSync gas fees and transaction costs. Track ZKSYNC gas prices for efficient zkEVM transactions.',
      h1: 'zkSync Gas Fees Tracker',
      h2: 'Real-time zkSync Gas Price Monitoring',
      content: 'zkSync Era is a zkEVM Layer 2 solution that offers reduced gas fees compared to Ethereum mainnet. Our zkSync gas fee tracker provides real-time updates on transaction costs, helping you optimize your zkEVM transactions. zkSync gas fees are typically much lower than Ethereum mainnet fees, making it an attractive option for cost-effective blockchain interactions.'
    }
  };

  const info = networkInfo[chain.name] || networkInfo['ETH'];
  
  // Generate structured data
  const faqs = generateFaqSchema(chain.name);
  const breadcrumbs = generateBreadcrumbSchema(chain.name, `/${chain.name.toLowerCase().replace(' ', '-')}-gas`);
  
  // Create FAQ schema markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
  
  // Create breadcrumb schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map(breadcrumb => ({
      "@type": "ListItem",
      "position": breadcrumb.position,
      "name": breadcrumb.name,
      "item": breadcrumb.item
    }))
  };
  
  // Create organization schema markup
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GasNow",
    "url": "https://gasnow.link/",
    "logo": "https://gasnow.link/assets/icons/Gas Pump.png",
    "sameAs": [
      "https://twitter.com/gasnow",
      "https://github.com/foreverdesmond/gas-now-web-app"
    ]
  };

  return (
    <ConfigProvider theme={{ token: { colorBgBase: '#141414', colorTextBase: '#ffffff' } }}>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>
      
      <Layout>
        <Content style={{ padding: '20px' }}>
          <Title level={2}>{info.h1}</Title>
          <Paragraph>{info.content}</Paragraph>
          <Title level={3}>{info.h2}</Title>
          <GasFeeDashboard 
            chainName={chain.name} 
            chainGasFeeServiceAPI={chain.gasFeeServiceAPI} 
            chainPriceAPI={chain.priceAPI} 
            chainNetworkId={chain.networkId}
          />
          
          {/* FAQ Section for SEO */}
          <Title level={3}>Frequently Asked Questions</Title>
          <Paragraph>
            <ul>
              {faqs.map((faq, index) => (
                <li key={index}>
                  <strong>{faq.question}</strong> {faq.answer}
                </li>
              ))}
            </ul>
          </Paragraph>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default NetworkSpecificPage;