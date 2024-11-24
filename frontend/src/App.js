// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatContextProvider from './contexts/ChatContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home'; // Your Home component
import FreeMovies from './components/FreeMovies';
import ChatComponent from './components/Chat/ChatComponent'; // Your Chat component
import Login from './components/Auth/Login'; // Your Login component
import Signup from './components/Auth/Signup'; // Your Signup component
import NotFound from './components/NotFound/NotFound'; // 404 Not Found component

function App() {
  return (
    <ChatContextProvider>
      <Router>
        <div className="App">
        <FreeMovies />
          <Navbar />
          <Routes>
            <Route exact path="/" component={Home} />
            <Route path="/chat" component={ChatComponent} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {/* Add more routes as needed */}
            <Route path="*" element={<NotFound />} />
        </Routes>
          <Footer />
        </div>
      </Router>
    </ChatContextProvider>
  );
}

export default App;
