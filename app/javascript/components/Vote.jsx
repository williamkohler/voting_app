import React, { useState } from 'react';
import { Layout, Typography, Radio, Button, Input, Form, ConfigProvider, message } from 'antd';
import Header from './Header';

const { Content } = Layout;
const { Title, Text } = Typography;

const Vote = ({ userEmail, candidates: initialCandidates, userVoted, userUpdatedAt }) => {
  const [candidates, setCandidates] = useState(
    (initialCandidates || []).sort((a, b) => a.name.localeCompare(b.name))
  );

  const onVoteSubmit = async (values) => {
    try {
      const response = await fetch('/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content,
        },
        body: JSON.stringify({ candidate_id: values.selectedCandidate })
      });

      const data = await response.json();

      if (data.success) {
        message.success('Vote submitted successfully!');
        // Update the local state with the new vote count
        setCandidates(candidates.map(candidate => 
          candidate.id === values.selectedCandidate 
            ? { ...candidate, votes: data.votes }
            : candidate
        ));
        // Redirect to results page
        window.location.href = '/results';
      } else {
        message.error('Failed to submit vote. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
      message.error('An error occurred while submitting your vote.');
    }
  };

  const onAddCandidate = async (values) => {
    if (values.newCandidate) {
      try {
        const response = await fetch('/vote/candidate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content,
          },
          body: JSON.stringify({ name: values.newCandidate })
        });

        const data = await response.json();

        if (data.success) {
          message.success('New candidate added and voted for successfully!');
          // Redirect to results page
          window.location.href = '/results';
        } else {
          message.error('Failed to add candidate. Please try again.');
        }
      } catch (error) {
        console.error('Error adding candidate:', error);
        message.error('An error occurred while adding the candidate.');
      }
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
        <Header userEmail={userEmail} />
        <Content role="main" aria-label="Voting Section">
          <div style={{ maxWidth: 600, margin: '40px', padding: '0' }}>
            <Title 
              level={1} 
              style={{ 
                marginBottom: 40, 
                fontSize: 48,
                fontFamily: 'monospace'
              }}
              aria-live="polite"
            >
              {userVoted 
                ? `User already voted at ${new Date(userUpdatedAt).toLocaleString()}`
                : 'Cast your vote today!'
              }
            </Title>
            
            {!userVoted && candidates.length > 0 && (
              <Form
                name="vote"
                onFinish={onVoteSubmit}
                layout="vertical"
                size="large"
                aria-label="Voting Form"
              >
                <Form.Item
                  name="selectedCandidate"
                  label="Select a candidate"
                  rules={[
                    {
                      required: true,
                      message: 'Please select a candidate',
                    },
                  ]}
                >
                  <Radio.Group 
                    style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                    aria-label="Candidate options"
                  >
                    {candidates.map((candidate) => (
                      <Radio 
                        key={candidate.id}
                        value={candidate.id}
                        style={{ 
                          fontSize: 18,
                          fontFamily: 'monospace'
                        }}
                        aria-label={`Vote for ${candidate.name}`}
                      >
                        {candidate.name}
                      </Radio>
                    ))}
                  </Radio.Group>
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
                    aria-label="Submit your vote"
                  >
                    Vote
                  </Button>
                </Form.Item>
              </Form>
            )}

            {!userVoted && candidates.length < 10 && (
              <div 
                style={{ 
                  marginTop: candidates.length > 0 ? '40px' : '0',
                  borderTop: candidates.length > 0 ? '1px solid #e8e8e8' : 'none',
                  paddingTop: candidates.length > 0 ? '40px' : '0'
                }}
                role="region"
                aria-label="Add New Candidate Section"
              >
                <Text
                  style={{
                    fontSize: '20px',
                    fontFamily: 'monospace',
                    display: 'block',
                    marginBottom: '20px'
                  }}
                >
                  {candidates.length > 0 ? 'Or, add a new candidate:' : 'Add a new candidate:'}
                </Text>

                <Form
                  name="addCandidate"
                  onFinish={onAddCandidate}
                  layout="horizontal"
                  style={{ display: 'flex', gap: '16px' }}
                  aria-label="Add New Candidate Form"
                >
                  <Form.Item
                    name="newCandidate"
                    style={{ flex: 1, marginBottom: 0 }}
                    label="Candidate Name"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter a candidate name',
                      },
                    ]}
                  >
                    <Input 
                      placeholder="Enter name..."
                      style={{ 
                        height: 50,
                        fontSize: 18,
                        borderRadius: 4
                      }}
                      aria-label="Enter new candidate name"
                    />
                  </Form.Item>

                  <Form.Item style={{ marginBottom: 0 }}>
                    <Button 
                      type="primary"
                      htmlType="submit"
                      style={{ 
                        height: 50,
                        fontSize: 18,
                        fontWeight: 'normal'
                      }}
                      aria-label="Add new candidate"
                    >
                      Add
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}

            {userVoted && (
              <Text
                style={{
                  fontSize: '20px',
                  fontFamily: 'monospace',
                  display: 'block',
                  marginBottom: '20px'
                }}
                role="status"
                aria-live="polite"
              >
                You have already cast your vote. Thank you for participating!
              </Text>
            )}
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default Vote; 