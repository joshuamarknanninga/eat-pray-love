// frontend/src/pages/MoviesPage.js

import React from 'react';
import MoviesList from '../components/Movies/MoviesList';
import FavoriteMovies from '../components/Movies/FavoriteMovies';
import { Container, Header, Divider } from 'semantic-ui-react';

const MoviesPage = () => {
  return (
    <Container style={{ marginTop: '2rem' }}>
      <Header as="h2" dividing>
        Movies
      </Header>
      <MoviesList />
      <Divider section />
      <Header as="h3" dividing>
        Favorite Movies
      </Header>
      <FavoriteMovies />
    </Container>
  );
};

export default MoviesPage;
