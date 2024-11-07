// frontend/src/components/Games/GamesContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the Games Context
export const GamesContext = createContext();

// Games Provider Component
export const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all games from the backend
  const fetchGames = async () => {
    try {
      const res = await axios.get('/api/games');
      setGames(res.data.games);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching games:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // Create a new game
  const createGame = async (gameData) => {
    try {
      const res = await axios.post('/api/games', gameData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setGames([res.data.game, ...games]);
      return { success: true };
    } catch (error) {
      console.error('Error creating game:', error.response.data);
      return { success: false, message: error.response.data.message };
    }
  };

  // Update an existing game
  const updateGame = async (gameId, updatedData) => {
    try {
      const res = await axios.put(`/api/games/${gameId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setGames(games.map(game => game._id === gameId ? res.data.game : game));
      return { success: true };
    } catch (error) {
      console.error('Error updating game:', error.response.data);
      return { success: false, message: error.response.data.message };
    }
  };

  // Delete a game
  const deleteGame = async (gameId) => {
    try {
      await axios.delete(`/api/games/${gameId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setGames(games.filter(game => game._id !== gameId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting game:', error.response.data);
      return { success: false, message: error.response.data.message };
    }
  };

  return (
    <GamesContext.Provider
      value={{
        games,
        selectedGame,
        setSelectedGame,
        loading,
        createGame,
        updateGame,
        deleteGame,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
