// frontend/src/components/Games/GameDetail.js

import React, { useContext, useEffect, useState } from 'react';
import { GamesContext } from './GamesContext';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Button, Header, List, Loader, Message } from 'semantic-ui-react';
import axios from 'axios';

const GameDetail = () => {
  const { id } = useParams();
  const { games, loading, setSelectedGame, deleteGame } = useContext(GamesContext);
  const [game, setGame] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await axios.get(`/api/games/${id}`);
        setGame(res.data.game);
        setSelectedGame(res.data.game);
        setLoadingDetail(false);
      } catch (err) {
        console.error('Error fetching game:', err.response.data);
        setError(err.response.data.message || 'Failed to fetch game.');
        setLoadingDetail(false);
      }
    };

    fetchGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this game?');
    if (confirm) {
      const res = await deleteGame(id);
      if (res.success) {
        history.push('/games');
      } else {
        setError(res.message || 'Failed to delete game.');
      }
    }
  };

  if (loading || loadingDetail) {
    return <Loader active inline="centered" content="Loading Game..." />;
  }

  if (error) {
    return <Message error header="Error" content={error} />;
  }

  if (!game) {
    return <Message warning header="Game Not Found" content="The requested game does not exist." />;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Header as="h2">{game.title}</Header>
      <p>{game.description}</p>
      <Header as="h3">Questions</Header>
      <List ordered>
        {game.questions.map((q, index) => (
          <List.Item key={index}>
            <strong>{q.question}</strong>
            <List.List>
              {q.options.map((opt, idx) => (
                <List.Item key={idx}>{opt}</List.Item>
              ))}
            </List.List>
            <p>
              <em>Correct Answer: {q.correctAnswer}</em>
            </p>
          </List.Item>
        ))}
      </List>
      <Button as={Link} to={`/games/${id}/play`} primary>
        Play Game
      </Button>
      <Button as={Link} to={`/games/${id}/edit`} color="yellow" style={{ marginLeft: '1rem' }}>
        Edit Game
      </Button>
      <Button color="red" onClick={handleDelete} style={{ marginLeft: '1rem' }}>
        Delete Game
      </Button>
    </div>
  );
};

export default GameDetail;
