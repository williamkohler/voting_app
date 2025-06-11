import React from "react";
import { Button } from 'antd';

const Home = ({ message }) => {
  return (
    <div>
      <h1>Message: {message}</h1>
      <Button type="primary">Click me</Button>
    </div>
  );
};

export default Home;
