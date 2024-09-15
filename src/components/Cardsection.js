import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  background-color: rgb(235, 244, 245);
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const CardBody = styled.div`
  font-size: 0.8rem;
  margin: 20px 0;
`;

const CardTitle = styled.h6`
  font-weight: 600;
`;

const CardText = styled.p`
  font-size: 0.8rem;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const App = memo(() => (
  <Card>
    <CardHeader>Discover the Latest Insights</CardHeader>
    <CardBody>
      <CardTitle>Ready to fuel your curiosity and ignite your imagination?</CardTitle>
      <CardText>Look no further! Our latest collection of blogs is here to captivate, inspire, and entertain.</CardText>
      <Button to='/Allblog'>Latest Updates</Button>
    </CardBody>
  </Card>
));
export default App;
