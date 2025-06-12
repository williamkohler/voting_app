import React from 'react';
import { Layout, Typography } from 'antd';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = ({ userEmail }) => {
  return (
    <AntHeader
      style={{
        background: '#fff',
        borderBottom: '1px solid #e8e8e8',
        padding: '0 40px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      role="banner"
    >
      <Text
        style={{
          fontSize: '24px',
          fontFamily: 'monospace',
          fontWeight: 'bold'
        }}
      >
        <a 
          href="/" 
          style={{ color: 'inherit', textDecoration: 'none' }}
          aria-label="VOTE.WEBSITE - Return to home page"
        >
          VOTE.WEBSITE
        </a>
      </Text>
      
      {userEmail && (
        <Text
          style={{
            fontSize: '16px',
            fontFamily: 'monospace'
          }}
          role="status"
          aria-label={`Current user: ${userEmail}`}
        >
          Signed in as ({userEmail})
        </Text>
      )}
    </AntHeader>
  );
};

export default Header; 