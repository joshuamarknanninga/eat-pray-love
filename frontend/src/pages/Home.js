// frontend/src/pages/Home.js

import React from 'react';
import { Container, Header, Button, Segment, Grid, Icon, Image, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './HomePage.css'; // Import custom styles

const Home = () => {
    // Accessing AuthContext to check authentication status
    const { authState } = useAuth();
    const { isAuthenticated } = authState;
  
    return (
      <Container textAlign="center" style={{ marginTop: '2rem' }}>
        {/* Hero Section */}
        <Segment inverted vertical className="hero-segment">
          <Container text>
            <Header as="h1" inverted>
              Welcome to Eat-Pray-Love
            </Header>
            <Header as="h2" inverted>
              Your personal hub for movies, games, and event management.
            </Header>
            {!isAuthenticated ? (
              <div>
                <Button primary size="huge" as={Link} to="/login">
                  Get Started
                </Button>
                <Button secondary size="huge" as={Link} to="/register" style={{ marginLeft: '1.5em' }}>
                  Sign Up
                </Button>
              </div>
            ) : (
              <div>
                <Button primary size="huge" as={Link} to="/dashboard">
                  Go to Dashboard
                </Button>
                <Button secondary size="huge" as={Link} to="/logout" style={{ marginLeft: '1.5em' }}>
                  Logout
                </Button>
              </div>
            )}
          </Container>
        </Segment>
  
        {/* Features Section */}
        <Segment vertical style={{ padding: '4em 0em' }}>
          <Container>
            <Header as="h2" textAlign="center">
              Our Features
            </Header>
            <Divider />
            <Grid stackable columns={3}>
              {/* Feature 1: Manage Movies */}
              <Grid.Column>
                <Icon name="film" size="huge" color="blue" />
                <Header as="h3">Manage Your Favorite Movies</Header>
                <p>
                  Explore, add, and organize your favorite movies. Keep track of what you've watched and what you want to watch.
                </p>
                <Button as={Link} to="/movies" primary>
                  Explore Movies
                </Button>
              </Grid.Column>
  
              {/* Feature 2: Play Games */}
              <Grid.Column>
                <Icon name="gamepad" size="huge" color="green" />
                <Header as="h3">Play Exciting Games</Header>
                <p>
                  Engage in fun and challenging games. Test your skills and compete with friends or other users.
                </p>
                <Button as={Link} to="/games" primary>
                  Play Games
                </Button>
              </Grid.Column>
  
              {/* Feature 3: Manage Events */}
              <Grid.Column>
                <Icon name="calendar alternate" size="huge" color="red" />
                <Header as="h3">Organize Your Events</Header>
                <p>
                  Keep track of your important events, appointments, and personal milestones with our intuitive calendar.
                </p>
                <Button as={Link} to="/calendar" primary>
                  View Calendar
                </Button>
              </Grid.Column>
            </Grid>
          </Container>
        </Segment>
  
        {/* Testimonials Section */}
        <Segment inverted vertical className="testimonials-segment">
          <Container>
            <Header as="h2" inverted textAlign="center">
              What Our Users Say
            </Header>
            <Divider inverted />
            <Grid stackable columns={3}>
              {/* Testimonial 1 */}
              <Grid.Column>
                <Image src="/images/user1.jpg" circular size="small" centered />
                <Header as="h4" inverted textAlign="center">
                  Jane Doe
                </Header>
                <p style={{ fontStyle: 'italic' }}>
                  "Eat-Pray-Love has transformed the way I manage my daily activities. The movie section is fantastic!"
                </p>
              </Grid.Column>
  
              {/* Testimonial 2 */}
              <Grid.Column>
                <Image src="/images/user2.jpg" circular size="small" centered />
                <Header as="h4" inverted textAlign="center">
                  John Smith
                </Header>
                <p style={{ fontStyle: 'italic' }}>
                  "The gaming feature is incredibly fun and addictive. I love competing with friends!"
                </p>
              </Grid.Column>
  
              {/* Testimonial 3 */}
              <Grid.Column>
                <Image src="/images/user3.jpg" circular size="small" centered />
                <Header as="h4" inverted textAlign="center">
                  Alice Johnson
                </Header>
                <p style={{ fontStyle: 'italic' }}>
                  "Managing my events has never been easier. The calendar integration is seamless."
                </p>
              </Grid.Column>
            </Grid>
          </Container>
        </Segment>
  
        {/* Call to Action Section */}
        <Segment vertical style={{ padding: '4em 0em' }}>
          <Container textAlign="center">
            {!isAuthenticated ? (
              <div>
                <Header as="h3">Join Us Today!</Header>
                <Button primary size="huge" as={Link} to="/register">
                  Sign Up Now
                </Button>
              </div>
            ) : (
              <div>
                <Header as="h3">Ready to Explore?</Header>
                <Button primary size="huge" as={Link} to="/dashboard">
                  Go to Dashboard
                </Button>
              </div>
            )}
          </Container>
        </Segment>
      </Container>
    );
  };
  
  export default Home;
  