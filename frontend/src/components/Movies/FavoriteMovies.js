// frontend/src/components/Movies/FavoriteMovies.js

import React, { useContext } from 'react';
import { MoviesContext } from './MoviesContext';
import { Card, Image, Button, Loader, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const FavoriteMovies = () => {
  const { favorites, loading, removeFromFavorites } = useContext(MoviesContext);

  if (loading) {
    return <Loader active inline="centered" content="Loading Favorites..." />;
  }

  if (favorites.length === 0) {
    return <Message info header="No Favorites" content="You have not added any favorite movies yet." />;
  }

  return (
    <Card.Group itemsPerRow={4}>
      {favorites.map(movie => (
        <Card key={movie._id}>
          {movie.poster ? (
            <Image src={movie.poster} wrapped ui={false} alt={`${movie.title} Poster`} />
          ) : (
            <Image src="/placeholder.png" wrapped ui={false} alt="No Poster Available" />
          )}
          <Card.Content>
            <Card.Header>{movie.title}</Card.Header>
            <Card.Meta>Genre: {movie.genre}</Card.Meta>
            <Card.Description>
              {movie.description.length > 100 ? movie.description.substring(0, 100) + '...' : movie.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button as={Link} to={`/movies/${movie._id}`} primary>
              View Details
            </Button>
            <Button color="red" onClick={() => removeFromFavorites(movie._id)} style={{ marginLeft: '0.5rem' }}>
              Remove Favorite
            </Button>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

export default FavoriteMovies;
