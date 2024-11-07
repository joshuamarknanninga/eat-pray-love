// frontend/src/components/Movies/AddMovie.js

import React, { useContext, useState } from 'react';
import { MoviesContext } from './MoviesContext';
import { Form, Button, Message, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddMovie = () => {
  const { createMovie } = useContext(MoviesContext);
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    genre: 'Other',
    poster: null,
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
      history.push('/movies');
    } else {
      setError(res.message || 'Failed to add movie.');
    }

    setSubmitting(false);
  };

  return (
    <Segment padded="very">
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
    </Segment>
  );
};

export default AddMovie;
