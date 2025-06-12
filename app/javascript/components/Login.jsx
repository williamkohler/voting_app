import React, { useState } from "react";
import { Form, Input, Button, Typography, ConfigProvider, Layout, Alert } from 'antd';
import { InfoCircleOutlined, CloseOutlined } from '@ant-design/icons';
import Header from './Header';

const { Title } = Typography;
const { Content } = Layout;

const Login = ({ flashMessage }) => {
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Rails CSRF token from meta tags
          'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content,
        },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to vote page on success
        window.location.href = '/vote';
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    }
  };

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
        <Header />
        <Content role="main" aria-label="Login Form">
          <div style={{ maxWidth: 600, margin: '40px', padding: '0' }}>
            {(flashMessage || error) && (
              <Alert
                message={error || flashMessage}
                type={error ? "error" : "info"}
                showIcon
                style={{
                  marginBottom: 24,
                  fontFamily: 'monospace',
                  fontSize: 16,
                  background: error ? '#ff4d4f' : '#000000',
                  border: `1px solid ${error ? '#ff4d4f' : '#000000'}`,
                  color: '#ffffff'
                }}
                icon={<InfoCircleOutlined style={{ color: '#ffffff' }} />}
                closeIcon={<CloseOutlined style={{ color: '#ffffff' }} />}
                onClose={() => error && setError(null)}
                role="alert"
                aria-live="assertive"
              />
            )}

            <Title 
              level={1} 
              style={{ 
                marginBottom: 40, 
                fontSize: 48,
                fontFamily: 'monospace'
              }}
            >
              Sign in to vote
            </Title>
            
            <Form
              name="login"
              onFinish={onFinish}
              layout="vertical"
              size="large"
              style={{ fontSize: 20 }}
              aria-label="Login form"
            >
              <Form.Item
                name="email"
                label={
                  <span 
                    style={{ fontSize: 20 }}
                    id="email-label"
                  >
                    Email
                  </span>
                }
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Please input a valid email',
                  },
                ]}
              >
                <Input 
                  placeholder="myemail@example.com"
                  style={{ 
                    height: 50,
                    fontSize: 18,
                    borderRadius: 4
                  }} 
                  aria-labelledby="email-label"
                  aria-required="true"
                  aria-invalid={error ? "true" : "false"}
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={
                  <span 
                    style={{ fontSize: 20 }}
                    id="password-label"
                  >
                    Password
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: 'Please input your password',
                  },
                ]}
              >
                <Input.Password 
                  style={{ 
                    height: 50,
                    fontSize: 18,
                    borderRadius: 4
                  }}
                  aria-labelledby="password-label"
                  aria-required="true"
                  aria-invalid={error ? "true" : "false"}
                />
              </Form.Item>

              <Form.Item
                name="zipCode"
                label={
                  <span 
                    style={{ fontSize: 20 }}
                    id="zipcode-label"
                  >
                    Zip code
                  </span>
                }
                rules={[
                  {
                    required: true,
                    pattern: /^\d{5}$/,
                    message: 'Please input a valid 5-digit zip code',
                  },
                ]}
              >
                <Input 
                  placeholder="12345"
                  style={{ 
                    height: 50,
                    fontSize: 18,
                    borderRadius: 4
                  }}
                  aria-labelledby="zipcode-label"
                  aria-required="true"
                  aria-invalid={error ? "true" : "false"}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  style={{ 
                    height: 50,
                    width: 200,
                    fontSize: 18,
                    fontWeight: 'normal'
                  }}
                  aria-label="Sign in to vote"
                >
                  Sign in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default Login;
