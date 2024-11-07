// frontend/src/components/Games/GamesList.js

import React, { useContext, useState } from 'react';
import { GamesContext } from './GamesContext';
import { Card, Button, Loader, Message, Modal, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const GamesList = () => {
  const { games, loading, createGame } = useContext(GamesContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [],
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    setFormData({
      title: '',
      description: '',
      questions: [],
    });
    setError('');
  };

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index][field] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }],
    });
  };

  const removeQuestion = (index) => {
    const newQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = async () => {
    setError('');
    setSubmitting(true);

    // Basic validation
    if (!formData.title || formData.questions.length === 0) {
      setError('Please provide a title and at least one question.');
      setSubmitting(false);
      return;
    }

    // Further validation can be added here

    const res = await createGame(formData);
    if (res.success) {
      handleClose();
    } else {
      setError(res.message || 'Failed to create game.');
    }

    setSubmitting(false);
  };

  if (loading) {
    return <Loader active inline="centered" content="Loading Games..." />;
  }

  return (
    <div>
      <Button primary onClick={handleOpen} style={{ marginBottom: '1rem' }}>
        Create New Game
      </Button>
      {error && <Message error header="Error" content={error} />}
      <Card.Group>
        {games.map(game => (
          <Card key={game._id}>
            <Card.Content>
              <Card.Header>{game.title}</Card.Header>
              <Card.Meta>Created by {game.creator.username}</Card.Meta>
              <Card.Description>{game.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button as={Link} to={`/games/${game._id}`} primary>
                Play
              </Button>
              <Button as={Link} to={`/games/${game._id}/edit`} color="yellow">
                Edit
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>

      {/* Create Game Modal */}
      <Modal open={modalOpen} onClose={handleClose} size="large">
        <Modal.Header>Create New Game</Modal.Header>
        <Modal.Content scrolling>
          <Form onSubmit={handleSubmit} error={!!error}>
            <Form.Input
              label="Title"
              placeholder="Enter game title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label="Description"
              placeholder="Enter game description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <Form.Field>
              <label>Questions</label>
              {formData.questions.map((q, index) => (
                <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
                  <Form.Input
                    label={`Question ${index + 1}`}
                    placeholder="Enter question"
                    value={q.question}
                    onChange={(e, { value }) => handleQuestionChange(index, 'question', value)}
                    required
                  />
                  {q.options.map((option, optIndex) => (
                    <Form.Input
                      key={optIndex}
                      label={`Option ${optIndex + 1}`}
                      placeholder={`Enter option ${optIndex + 1}`}
                      value={option}
                      onChange={(e, { value }) => {
                        const newOptions = [...q.options];
                        newOptions[optIndex] = value;
                        handleQuestionChange(index, 'options', newOptions);
                      }}
                      required
                    />
                  ))}
                  <Form.Input
                    label="Correct Answer"
                    placeholder="Enter the correct answer"
                    value={q.correctAnswer}
                    onChange={(e, { value }) => handleQuestionChange(index, 'correctAnswer', value)}
                    required
                  />
                  <Button color="red" onClick={() => removeQuestion(index)}>
                    Remove Question
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addQuestion} color="green">
                Add Question
              </Button>
            </Form.Field>
            {error && <Message error header="Error" content={error} />}
            <Button type="submit" primary loading={submitting}>
              Create Game
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default GamesList;
