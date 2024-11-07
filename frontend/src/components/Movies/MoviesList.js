// frontend/src/components/Movies/MoviesList.js

import React, { useContext, useState } from 'react';
import { MoviesContext } from './MoviesContext';
import { Card, Image, Button, Loader, Message, Modal, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const MoviesList = () => {
  const { movies, loading, favorites, addToFavorites, removeFromFavorites } = useContext(MoviesContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    genre: 'Other',
    poster: null,
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isFavorite = (movieId) => {
    return favorites.some(movie => movie._id === movieId);
  };

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    setFormData({
      title: '',
      description: '',
      releaseDate: '',
      genre: 'Other',
      poster: null,
    });
    setError('');
  };

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, poster: e.target.files[0] });
  };

  const handleSubmit = async () => {
    setError('');
    setSubmitting(true);

    // Basic validation
    if (!formData.title) {
      setError('Please provide a title for the movie.');
      setSubmitting(false);
      return;
    }

    const res = await addToFavorites(formData);
    if (res.success) {
      toast.success('Movie added successfully!');
      handleClose();
    } else {
      setError(res.message || 'Failed to add movie.');
    }

    setSubmitting(false);
  };

  if (loading) {
    return <Loader active inline="centered" content="Loading Movies..." />;
  }

  return (
    <div>
      <Button primary onClick={handleOpen} style={{ marginBottom: '1rem' }}>
        Add New Movie
      </Button>
      {error && <Message error header="Error" content={error} />}
      <Card.Group itemsPerRow={4}>
        {movies.map(movie => (
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
              {isFavorite(movie._id) ? (
                <Button color="red" onClick={() => removeFromFavorites(movie._id)} style={{ marginLeft: '0.5rem' }}>
                  Remove Favorite
                </Button>
              ) : (
                <Button color="green" onClick={() => addToFavorites(movie._id)} style={{ marginLeft: '0.5rem' }}>
                  Add to Favorites
                </Button>
              )}
            </Card.Content>
          </Card>
        ))}
      </Card.Group>

      {/* Add Movie Modal */}
      <Modal open={modalOpen} onClose={handleClose} size="large">
        <Modal.Header>Add New Movie</Modal.Header>
        <Modal.Content scrolling>
          <Form onSubmit={handleSubmit} error={!!error}>
            <Form.Input
              label="Title"
              placeholder="Enter movie title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label="Description"
              placeholder="Enter movie description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <Form.Input
              label="Release Date"
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
            />
            <Form.Select
              label="Genre"
              options={[
                { key: 'action', text: 'Action', value: 'Action' },
                { key: 'comedy', text: 'Comedy', value: 'Comedy' },
                { key: 'drama', text: 'Drama', value: 'Drama' },
                { key: 'horror', text: 'Horror', value: 'Horror' },
                { key: 'romance', text: 'Romance', value: 'Romance' },
                { key: 'scifi', text: 'Sci-Fi', value: 'Sci-Fi' },
                { key: 'documentary', text: 'Documentary', value: 'Documentary' },
                { key: 'other', text: 'Other', value: 'Other' },
              ]}
              placeholder="Select Genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            />
            <Form.Field>
              <label>Poster Image</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </Form.Field>
            {error && <Message error header="Error" content={error} />}
            <Button type="submit" primary loading={submitting}>
              Add Movie
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default MoviesList;
