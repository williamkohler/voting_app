import React, { useState } from 'react';
import { Layout, Typography, ConfigProvider, Radio, Space } from 'antd';
import Header from './Header';

const { Content } = Layout;
const { Title } = Typography;

const Results = ({ candidates, userEmail = null }) => {
  const [sortBy, setSortBy] = useState('votes');

  const sortedCandidates = [...candidates].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return b.votes - a.votes;
  });
  
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#000000',
          borderRadius: 4,
          fontSize: 16,
        },
      }}
    >
      <Layout style={{ minHeight: '100vh', background: '#fff' }}>
        <Header userEmail={userEmail} />
        <Content role="main" aria-label="Voting Results">
          <div style={{ maxWidth: 800, margin: '40px auto', padding: '0' }}>
            <Title 
              level={1} 
              style={{ 
                marginBottom: 40, 
                fontSize: 48,
                fontFamily: 'monospace'
              }}
            >
              Results
            </Title>
            
            <div style={{ marginBottom: 20 }}>
              <Radio.Group 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort results by"
              >
                <Space direction="horizontal">
                  <Radio.Button 
                    value="votes"
                    aria-label="Sort by number of votes"
                  >
                    Sort by Votes
                  </Radio.Button>
                  <Radio.Button 
                    value="name"
                    aria-label="Sort alphabetically by name"
                  >
                    Sort by Name
                  </Radio.Button>
                </Space>
              </Radio.Group>
            </div>

            <div 
              className="candidates-list"
              role="region" 
              aria-label="Voting results list"
            >
              {sortedCandidates.map((candidate, index) => (
                <div 
                  key={index} 
                  className="candidate-row"
                  role="listitem"
                  aria-label={`${candidate.name} received ${candidate.votes} votes`}
                >
                  <div className="candidate-name">{candidate.name}</div>
                  <div className="candidate-votes" aria-label={`${candidate.votes} votes`}>
                    {candidate.votes}
                  </div>
                </div>
              ))}
            </div>

            <style jsx>{`
              .candidates-list {
                border-top: 1px solid #e8e8e8;
              }

              .candidate-row {
                display: flex;
                justify-content: space-between;
                padding: 1rem 0;
                border-bottom: 1px solid #e8e8e8;
                font-family: monospace;
              }

              .candidate-name {
                font-size: 1.2rem;
              }

              .candidate-votes {
                font-size: 1.2rem;
                font-weight: bold;
              }

              /* Add focus styles for keyboard navigation */
              .candidate-row:focus-within {
                outline: 2px solid #000;
                outline-offset: -2px;
              }

              /* Ensure radio buttons have visible focus indicators */
              .ant-radio-button-wrapper:focus-visible {
                outline: 2px solid #000;
                outline-offset: 2px;
              }
            `}</style>
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default Results; 