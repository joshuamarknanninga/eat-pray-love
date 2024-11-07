// frontend/src/components/Movies/MovieDetail.js

import React, { useContext, useEffect, useState } from 'react';
import { MoviesContext } from './MoviesContext';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Button, Header, Image, Loader, Message, Modal, Form } from 'semantic-ui-react';
import { toast } from 'react-toastify';

const MovieDetail = () => {
  const { id } = useParams();
  const { movies, updateMovie, deleteMovie } = useContext(MoviesContext);
  const [movie, setMovie] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    genre: '',
    poster: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/api/movies/${id}`);
        setMovie(res.data.movie);
        setFormData({
          title: res.data.movie.title,
          description: res.data.movie.description,
          releaseDate: res.data.movie.releaseDate ? res.data.movie.releaseDate.substring(0, 10) : '',
          genre: res.data.movie.genre,
          poster: null,
        });
        setLoadingDetail(false);
      } catch (err) {
        console.error('Error fetching movie:', err.response.data);
        setError(err.response.data.message || 'Failed to fetch movie.');
        setLoadingDetail(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
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

    const res = await updateMovie(id, formData);
    if (res.success) {
      toast.success('Movie updated successfully!');
      setMovie(res.movie);
      handleClose();
    } else {
      setError(res.message || 'Failed to update movie.');
    }

    setSubmitting(false);
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this movie?');
    if (confirm) {
      const res = await deleteMovie(id);
      if (res.success) {
        toast.success('Movie deleted successfully!');
        history.push('/movies');
      } else {
        setError(res.message || 'Failed to delete movie.');
      }
    }
  };

  if (loadingDetail) {
    return <Loader active inline="centered" content="Loading Movie Details..." />;
  }

  if (error) {
    return <Message error header="Error" content={error} />;
  }

  if (!movie) {
    return <Message warning header="Movie Not Found" content="The requested movie does not exist." />;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Header as="h2">{movie.title}</Header>
      {movie.poster ? (
        <Image src={movie.poster} size="medium" floated="left" alt={`${movie.title} Poster`} />
      ) : (
        <Image src="/placeholder.png" size="medium" floated="left" alt="No Poster Available" />
      )}
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Release Date:</strong> {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : 'N/A'}</p>
      <p>{movie.description}</p>
      <p><em>Added by {movie.createdBy.username}</em></p>
      <Button as={Link} to="/movies" secondary style={{ marginTop: '1rem' }}>
        Back to Movies
      </Button>
      <Button primary onClick={handleOpen} style={{ marginTop: '1rem', marginLeft: '1rem' }}>
        Edit Movie
      </Button>
      <Button color="red" onClick={handleDelete} style={{ marginTop: '1rem', marginLeft: '1rem' }}>
        Delete Movie
      </Button>

      {/* Edit Movie Modal */}
      <Modal open={modalOpen} onClose={handleClose} size="large">
        <Modal.Header>Edit Movie</Modal.Header>
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
              Update Movie
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default MovieDetail;
