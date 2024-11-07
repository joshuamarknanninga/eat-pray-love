// frontend/src/pages/GamesPage.js

import React from 'react';
import GamesList from '../components/Games/GamesList';
import { Container, Header } from 'semantic-ui-react';

const GamesPage = () => {
  return (
    <Container style={{ marginTop: '2rem' }}>
      <Header as="h2" dividing>
        Games
      </Header>
      <GamesList />
    </Container>
  );
};

export default GamesPage;
