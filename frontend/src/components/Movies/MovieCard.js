// frontend/src/components/Movies/MovieCard.js

import React, { useContext } from 'react';
import { Card, Image, Button, Icon, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { MoviesContext } from './MoviesContext';
import PropTypes from 'prop-types';

const MovieCard = ({ movie }) => {
  const {
    addToFavorites,
    removeFromFavorites,
    favorites,
  } = useContext(MoviesContext);

  // Check if the movie is already in favorites
  const isFavorite = favorites.some(fav => fav._id === movie._id);

  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(movie._id);
    } else {
      addToFavorites(movie._id);
    }
  };

  return (
    <Card>
      {movie.poster ? (
        <Image src={movie.poster} wrapped ui={false} alt={`${movie.title} Poster`} />
      ) : (
        <Image src="/placeholder.png" wrapped ui={false} alt="No Poster Available" />
      )}
      <Card.Content>
        <Card.Header>{movie.title}</Card.Header>
        <Card.Meta>
          <span className="date">Genre: {movie.genre}</span>
        </Card.Meta>
        <Card.Description>
          {movie.description.length > 100
            ? `${movie.description.substring(0, 100)}...`
            : movie.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as={Link} to={`/movies/${movie._id}`} primary>
          <Icon name="eye" /> View Details
        </Button>
        <Popup
          content={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          trigger={
            <Button
              color={isFavorite ? 'red' : 'green'}
              onClick={handleFavoriteToggle}
              style={{ marginLeft: '0.5rem' }}
            >
              <Icon name={isFavorite ? 'heart' : 'heart outline'} /> {isFavorite ? 'Favorite' : 'Favorite'}
            </Button>
          }
          position="top center"
        />
      </Card.Content>
    </Card>
  );
};

// PropTypes for type checking
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
