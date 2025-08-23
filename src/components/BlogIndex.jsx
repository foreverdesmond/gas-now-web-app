import React from 'react';
import { Layout, ConfigProvider, Typography, List, Card, Space } from 'antd';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const BlogIndex = () => {
  // Blog post data - in a real application, this would come from a CMS or Markdown files
  const blogPosts = [
    {
      id: 1,
      title: "What is Ethereum Gas? A Beginner's Guide",
      excerpt: "Learn what Ethereum gas is, how gas fees work, and why they're important for transactions on the Ethereum blockchain.",
      date: "August 18, 2025",
      path: "/blog/what-is-ethereum-gas"
    },
    {
      id: 2,
      title: "Layer 2 Gas Fees: How Arbitrum, Optimism, and Base Reduce Costs",
      excerpt: "Compare gas fees across popular Layer 2 solutions and learn how they reduce costs while maintaining Ethereum's security.",
      date: "August 18, 2025",
      path: "/blog/layer-2-gas-fees"
    },
    {
      id: 3,
      title: "Ethereum Gas Forecast: Predicting Network Congestion and Gas Prices",
      excerpt: "Learn how to predict Ethereum gas prices and network congestion to optimize your transaction timing and costs.",
      date: "August 18, 2025",
      path: "/blog/ethereum-gas-forecast"
    },
    {
      id: 4,
      title: "Ethereum Scaling Solutions: How Layer 2 Networks Are Solving the Gas Fee Crisis",
      excerpt: "Explore how Layer 2 scaling solutions like Arbitrum, Optimism, Base, and zkSync are addressing Ethereum's gas fee challenges.",
      date: "August 21, 2025",
      path: "/blog/ethereum-scaling-solutions"
    }
  ];

  return (
    <ConfigProvider theme={{ token: { colorBgBase: '#141414', colorTextBase: '#ffffff' } }}>
      <Layout>
        <Content style={{ padding: '20px' }}>
          <Title level={2}>GasNow Blog</Title>
          <Paragraph>Stay updated with the latest insights on Ethereum gas fees, Layer 2 solutions, and blockchain technology.</Paragraph>
          
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={blogPosts}
            renderItem={post => (
              <List.Item>
                <Card 
                  title={<Link to={post.path} style={{ color: '#1890ff' }}>{post.title}</Link>}
                  extra={post.date}
                >
                  <Paragraph>{post.excerpt}</Paragraph>
                  <Space>
                    <Link to={post.path}>Read more</Link>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default BlogIndex;