// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const App = () => (
    <Router>
        <Navbar />
        <Container style={{ marginTop: '7em', minHeight: '80vh' }}>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/profile' component={Profile} />
                <Route component={NotFound} />
            </Switch>
        </Container>
        <Footer />
    </Router>
);

export default App;
