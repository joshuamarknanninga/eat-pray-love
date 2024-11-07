// frontend/src/components/Movies/MoviesList.js

import React, { useContext, useState } from 'react';
import { MoviesContext } from './MoviesContext';
import { Card, Button, Loader, Message, Modal, Form, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import MovieCard from './MovieCard'; // Import the MovieCard component

const MoviesList = () => {
  const { movies, loading, createMovie } = useContext(MoviesContext);
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

    const res = await createMovie(formData);
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
        <Icon name="plus" /> Add New Movie
      </Button>
      {error && <Message error header="Error" content={error} />}
      <Card.Group itemsPerRow={4} stackable>
        {movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} /> // Use the MovieCard component
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
