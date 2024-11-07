// frontend/src/pages/Dashboard.js

import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Header,
  Segment,
  Grid,
  List,
  Image,
  Button,
  Loader,
  Message,
  Icon,
} from 'semantic-ui-react';
import { AuthContext } from '../contexts/AuthContext';
import { MoviesContext } from '../contexts/MoviesContext';
import { CalendarContext } from '../contexts/CalendarContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './DashboardPage.css'; // Import custom styles

const Dashboard = () => {
    // Accessing contexts
    const { user, loading: authLoading, error: authError } = useContext(AuthContext);
    const {
      favoriteMovies,
      loading: moviesLoading,
      error: moviesError,
    } = useContext(MoviesContext);
    const {
      events,
      loading: eventsLoading,
      error: eventsError,
    } = useContext(CalendarContext);
  
    // State for recent events
    const [recentEvents, setRecentEvents] = useState([]);
  
    // Fetch recent events on component mount or when events change
    useEffect(() => {
      if (events && events.length > 0) {
        // Sort events by date ascending
        const sortedEvents = [...events].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        // Get next 5 upcoming events
        const upcomingEvents = sortedEvents.filter(
          (event) => new Date(event.date) >= new Date()
        );
        setRecentEvents(upcomingEvents.slice(0, 5));
      }
    }, [events]);
  
    // Handle errors
    useEffect(() => {
      if (authError) {
        toast.error(authError);
      }
      if (moviesError) {
        toast.error(moviesError);
      }
      if (eventsError) {
        toast.error(eventsError);
      }
    }, [authError, moviesError, eventsError]);
  
    // Loading state
    const isLoading = authLoading || moviesLoading || eventsLoading;
  
    if (isLoading) {
      return (
        <Container textAlign="center" style={{ marginTop: '5rem' }}>
          <Loader active inline="centered" size="large">
            Loading Dashboard...
          </Loader>
        </Container>
      );
    }
  
    if (!user) {
      return (
        <Container textAlign="center" style={{ marginTop: '5rem' }}>
          <Message warning header="Not Logged In" content="Please log in to access your dashboard." />
          <Button as={Link} to="/login" primary>
            Go to Login
          </Button>
        </Container>
      );
    }
  
    return (
      <Container style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <Header as="h2" dividing>
          Welcome, {user.username}!
        </Header>
  
        <Grid stackable columns={3}>
          {/* User Profile Segment */}
          <Grid.Column>
            <Segment>
              <Header as="h3" dividing>
                Profile Information
              </Header>
              <List>
                <List.Item>
                  <Icon name="user" />
                  <List.Content>
                    <List.Header>Username</List.Header>
                    {user.username}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name="mail" />
                  <List.Content>
                    <List.Header>Email</List.Header>
                    {user.email}
                  </List.Content>
                </List.Item>
                {/* Add more profile details as needed */}
              </List>
              <Button as={Link} to="/profile" primary fluid style={{ marginTop: '1rem' }}>
                Edit Profile
              </Button>
            </Segment>
          </Grid.Column>
  
          {/* Favorite Movies Segment */}
          <Grid.Column>
            <Segment>
              <Header as="h3" dividing>
                Your Favorite Movies
              </Header>
              {favoriteMovies && favoriteMovies.length > 0 ? (
                <List divided relaxed>
                  {favoriteMovies.map((movie) => (
                    <List.Item key={movie._id}>
                      <Image
                        src={movie.poster || '/placeholder-movie.png'}
                        size="tiny"
                        floated="left"
                        verticalAlign="middle"
                        alt={`${movie.title} Poster`}
                      />
                      <List.Content>
                        <List.Header as={Link} to={`/movies/${movie._id}`}>
                          {movie.title}
                        </List.Header>
                        <List.Description>{movie.genre}</List.Description>
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              ) : (
                <Message info header="No Favorite Movies" content="You have not added any favorite movies yet." />
              )}
              <Button as={Link} to="/movies" primary fluid style={{ marginTop: '1rem' }}>
                View All Movies
              </Button>
            </Segment>
          </Grid.Column>
  
          {/* Upcoming Events Segment */}
          <Grid.Column>
            <Segment>
              <Header as="h3" dividing>
                Upcoming Events
              </Header>
              {recentEvents && recentEvents.length > 0 ? (
                <List divided relaxed>
                  {recentEvents.map((event) => (
                    <List.Item key={event._id}>
                      <Icon name="calendar alternate outline" size="large" verticalAlign="middle" />
                      <List.Content>
                        <List.Header>{event.title}</List.Header>
                        <List.Description>
                          {new Date(event.date).toLocaleDateString()} at {event.time || 'All Day'}
                          <br />
                          {event.description}
                        </List.Description>
                        {/* Optional: Add buttons to edit or delete events */}
                        <Button
                          as={Link}
                          to={`/calendar/${event._id}`}
                          size="small"
                          color="blue"
                          style={{ marginTop: '0.5rem' }}
                        >
                          View Details
                        </Button>
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              ) : (
                <Message info header="No Upcoming Events" content="You have no upcoming events scheduled." />
              )}
              <Button as={Link} to="/calendar" primary fluid style={{ marginTop: '1rem' }}>
                View All Events
              </Button>
            </Segment>
          </Grid.Column>
        </Grid>
  
        {/* Additional Dashboard Sections */}
        <Header as="h3" dividing style={{ marginTop: '3rem' }}>
          Quick Actions
        </Header>
        <Grid stackable columns={2}>
          {/* Add New Movie */}
          <Grid.Column>
            <Segment placeholder textAlign="center">
              <Header icon>
                <Icon name="plus circle" />
                Add a New Movie
              </Header>
              <Button primary as={Link} to="/movies/add">
                Add Movie
              </Button>
            </Segment>
          </Grid.Column>
  
          {/* Add New Event */}
          <Grid.Column>
            <Segment placeholder textAlign="center">
              <Header icon>
                <Icon name="calendar plus" />
                Add a New Event
              </Header>
              <Button primary as={Link} to="/calendar/add">
                Add Event
              </Button>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  };
  
  export default Dashboard;
  