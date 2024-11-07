// frontend/src/components/Games/PlayGame.js

import React, { useEffect, useState, useContext } from 'react';
import { GamesContext } from './GamesContext';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Header, Radio, Form, Segment, Loader, Message } from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlayGame = () => {
  const { id } = useParams();
  const { selectedGame } = useContext(GamesContext);
  const [game, setGame] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [loadingGame, setLoadingGame] = useState(true);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await axios.get(`/api/games/${id}`);
        setGame(res.data.game);
        setLoadingGame(false);
      } catch (err) {
        console.error('Error fetching game:', err.response.data);
        setError(err.response.data.message || 'Failed to fetch game.');
        setLoadingGame(false);
      }
    };

    fetchGame();
  }, [id]);

  const handleOptionChange = (e, { value }) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    const currentQuestion = game.questions[currentQIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
      toast.success('Correct!', { position: 'top-right' });
    } else {
      toast.error(`Incorrect! The correct answer was: ${currentQuestion.correctAnswer}`, { position: 'top-right' });
    }

    setSelectedOption('');
    if (currentQIndex + 1 < game.questions.length) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // Game Over
      toast.info(`Game Over! Your score: ${score}/${game.questions.length}`, { position: 'top-right' });
      history.push(`/games/${id}/result`, { score, total: game.questions.length });
    }
  };

  if (loadingGame) {
    return <Loader active inline="centered" content="Loading Game..." />;
  }

  if (error) {
    return <Message error header="Error" content={error} />;
  }

  if (!game) {
    return <Message warning header="Game Not Found" content="The requested game does not exist." />;
  }

  const currentQuestion = game.questions[currentQIndex];

  return (
    <div style={{ padding: '2rem' }}>
      <Header as="h2">{game.title}</Header>
      <Segment>
        <Header as="h3">
          Question {currentQIndex + 1} of {game.questions.length}
        </Header>
        <p>{currentQuestion.question}</p>
        <Form>
          {currentQuestion.options.map((opt, index) => (
            <Form.Field key={index}>
              <Radio
                label={opt}
                name="radioGroup"
                value={opt}
                checked={selectedOption === opt}
                onChange={handleOptionChange}
              />
            </Form.Field>
          ))}
        </Form>
        <Button
          primary
          onClick={handleNext}
          disabled={!selectedOption}
          style={{ marginTop: '1rem' }}
        >
          {currentQIndex + 1 === game.questions.length ? 'Finish' : 'Next'}
        </Button>
      </Segment>
    </div>
  );
};

export default PlayGame;
