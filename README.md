# Eat-Pray-Love

![Eat-Pray-Love Banner](public/images/banner.png)

**Eat-Pray-Love** is a comprehensive web application designed to help users manage their favorite movies, participate in engaging games, and organize their personal events seamlessly. Built with a modern tech stack, this application offers a user-friendly interface, robust backend functionalities, and ensures a smooth and enjoyable user experience.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Cloning the Repository](#cloning-the-repository)
    - [Setting Up Environment Variables](#setting-up-environment-variables)
    - [Installing Dependencies](#installing-dependencies)
    - [Running the Application](#running-the-application)
5. [Usage](#usage)
    - [Home Page](#home-page)
    - [Dashboard](#dashboard)
    - [Calendar](#calendar)
    - [Movies](#movies)
    - [Games](#games)
6. [API Endpoints](#api-endpoints)
7. [Deployment](#deployment)
8. [Testing](#testing)
9. [Contributing](#contributing)
10. [License](#license)
11. [Contact](#contact)

---

## Features

- **User Authentication**: Secure registration and login functionalities with JWT-based authentication.
- **Favorite Movies Management**: Users can explore, add, and organize their favorite movies.
- **Interactive Calendar**: Manage personal events with features to add, edit, and delete events.
- **Engaging Games**: Participate in fun and challenging games to test your skills.
- **Responsive Design**: Optimized for all devices, ensuring a seamless experience on desktops, tablets, and mobile phones.
- **Real-time Notifications**: Receive instant feedback on your actions through toast notifications.
- **Role-Based Access Control**: Different levels of access based on user roles to ensure security and proper resource management.
- **Centralized State Management**: Utilizes React's Context API for efficient and scalable state management across the application.
- **Comprehensive Error Handling**: Robust mechanisms to handle and display errors gracefully to users.

---

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces.
- **React Router DOM**: Enables dynamic routing in the React application.
- **Semantic UI React**: Provides a collection of pre-styled UI components.
- **Axios**: For making HTTP requests to the backend API.
- **React Calendar**: Interactive calendar component for event management.
- **React Toastify**: For displaying toast notifications.
- **Create React App**: Sets up the development environment quickly.

### Backend

- **Node.js**: JavaScript runtime for building the backend server.
- **Express.js**: Web framework for Node.js to create robust APIs.
- **MongoDB**: NoSQL database for storing user data, movies, and events.
- **Mongoose**: ODM for MongoDB, providing a schema-based solution.
- **JSON Web Tokens (JWT)**: For secure user authentication.
- **Cors**: Middleware to enable Cross-Origin Resource Sharing.
- **Dotenv**: Loads environment variables from a `.env` file.
- **Nodemon**: Utility that monitors for changes and automatically restarts the server.

### DevOps & Tools

- **Git & GitHub**: Version control and repository hosting.
- **Concurrently**: Runs multiple npm scripts simultaneously.
- **ESLint & Prettier**: For code linting and formatting.
- **Testing Libraries**:
  - **Jest**: JavaScript testing framework.
  - **React Testing Library**: For testing React components.

---

## Project Structure

```
eat-pray-love/
├── frontend/
│   ├── public/
│   │   └── images/
│   │       ├── banner.png
│   │       ├── user1.jpg
│   │       ├── user2.jpg
│   │       ├── user3.jpg
│   │       └── hero-background.jpg
│   ├── src/
│   │   ├── assets/
│   │   │   └── styles/
│   │   │       ├── CalendarPage.css
│   │   │       ├── DashboardPage.css
│   │   │       ├── HomePage.css
│   │   │       └── ... (other styles)
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── AuthContext.js
│   │   │   │   ├── Login.js
│   │   │   │   ├── Register.js
│   │   │   │   ├── Logout.js
│   │   │   │   └── PrivateRoute.js
│   │   │   ├── Movies/
│   │   │   │   ├── MoviesContext.js
│   │   │   │   └── ... (other Movies components)
│   │   │   ├── Calendar/
│   │   │   │   ├── CalendarContext.js
│   │   │   │   └── ... (other Calendar components)
│   │   │   ├── Navbar/
│   │   │   │   └── Navbar.js
│   │   │   └── ... (other components)
│   │   ├── contexts/
│   │   │   ├── GlobalState.js
│   │   │   └── ... (other context files if any)
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Home.js
│   │   │   ├── CalendarPage.js
│   │   │   ├── MoviesPage.js
│   │   │   ├── GamesPage.js
│   │   │   └── NotFound.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ... (other source files)
│   ├── .gitignore
│   ├── package.json
│   ├── README.md
│   └── ... (other frontend files)
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── ... (controller files)
│   │   ├── models/
│   │   │   └── ... (model files)
│   │   ├── routes/
│   │   │   └── ... (route files)
│   │   ├── middleware/
│   │   │   └── ... (middleware files)
│   │   ├── app.js
│   │   └── server.js
│   ├── .gitignore
│   ├── package.json
│   └── ... (other backend files)
├── .gitignore
├── .gitattributes
├── package.json
├── README.md
└── ... (other root files)
```

---

## Installation

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Ensure you have Node.js installed. You can download it [here](https://nodejs.org/).
- **MongoDB**: Set up a MongoDB database. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-based solution or install it locally.
- **Git**: Ensure Git is installed on your machine. Download it [here](https://git-scm.com/).

### Cloning the Repository

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/eat-pray-love.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd eat-pray-love
   ```

### Setting Up Environment Variables

Create `.env` files for both frontend and backend to manage environment-specific configurations.

#### Backend

1. **Navigate to the Backend Directory**:

   ```bash
   cd backend
   ```

2. **Create a `.env` File**:

   ```bash
   touch .env
   ```

3. **Add the Following Environment Variables**:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

   - **`PORT`**: The port number on which the backend server will run.
   - **`MONGO_URI`**: Your MongoDB connection string.
   - **`JWT_SECRET`**: A secret key for signing JWT tokens. Keep this secure!

#### Frontend

1. **Navigate to the Frontend Directory**:

   ```bash
   cd ../frontend
   ```

2. **Create a `.env` File**:

   ```bash
   touch .env
   ```

3. **Add the Following Environment Variables**:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

   - **`REACT_APP_API_URL`**: The base URL for your backend API.

### Installing Dependencies

#### Root Directory

1. **Navigate to the Root Directory**:

   ```bash
   cd ..
   ```

2. **Install Root Dependencies**:

   ```bash
   npm install
   ```

#### Backend

1. **Navigate to the Backend Directory**:

   ```bash
   cd backend
   ```

2. **Install Backend Dependencies**:

   ```bash
   npm install
   ```

#### Frontend

1. **Navigate to the Frontend Directory**:

   ```bash
   cd ../frontend
   ```

2. **Install Frontend Dependencies**:

   ```bash
   npm install
   ```

### Running the Application

1. **Navigate to the Root Directory**:

   ```bash
   cd ..
   ```

2. **Start Both Frontend and Backend Servers Concurrently**:

   ```bash
   npm start
   ```

   This command uses the `concurrently` package to run both the backend and frontend servers simultaneously.

3. **Access the Application**:

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## Usage

### Home Page

- **Landing Page**: Provides an overview of the application's purpose and features.
- **Call-to-Action**: Prompts users to log in or register to access personalized functionalities.
- **Feature Highlights**: Showcases key features like movie management, gaming, and event organization.
- **Testimonials**: Displays feedback from existing users to build credibility.

### Dashboard

- **User Profile Overview**: Displays user information such as username and email.
- **Favorite Movies**: Lists the user's favorite movies with options to view details.
- **Upcoming Calendar Events**: Shows events scheduled in the near future.
- **Quick Actions**: Provides shortcuts to frequently used functionalities like adding a new movie or event.

### Calendar

- **Interactive Calendar**: View and manage personal events.
- **Add Events**: Users can add new events by selecting a date and providing event details.
- **Edit & Delete Events**: Modify or remove existing events.
- **Visual Indicators**: Dates with events are highlighted for easy navigation.

### Movies

- **Explore Movies**: Browse through a list of movies.
- **Manage Favorites**: Add or remove movies from your favorites.
- **Movie Details**: View detailed information about each movie.

### Games

- **Play Games**: Engage in fun and challenging games.
- **Leaderboard**: Compete with friends or other users and view rankings.

---

## API Endpoints

The backend API provides various endpoints to manage users, movies, and events. Below is an overview of the primary endpoints:

### Authentication

- **Register User**
  - **Endpoint**: `POST /api/auth/register`
  - **Description**: Registers a new user.
  - **Body Parameters**:
    - `username` (string, required)
    - `email` (string, required)
    - `password` (string, required)

- **Login User**
  - **Endpoint**: `POST /api/auth/login`
  - **Description**: Authenticates a user and returns a JWT token.
  - **Body Parameters**:
    - `email` (string, required)
    - `password` (string, required)

- **Logout User**
  - **Endpoint**: `POST /api/auth/logout`
  - **Description**: Logs out the user by invalidating the JWT token.

### Movies

- **Get All Movies**
  - **Endpoint**: `GET /api/movies`
  - **Description**: Retrieves a list of all movies.

- **Get Movie Details**
  - **Endpoint**: `GET /api/movies/:id`
  - **Description**: Retrieves detailed information about a specific movie.

- **Add Movie to Favorites**
  - **Endpoint**: `POST /api/movies/favorites`
  - **Description**: Adds a movie to the user's favorites.
  - **Body Parameters**:
    - `movieId` (string, required)

- **Remove Movie from Favorites**
  - **Endpoint**: `DELETE /api/movies/favorites/:id`
  - **Description**: Removes a movie from the user's favorites.

### Events

- **Get All Events**
  - **Endpoint**: `GET /api/events`
  - **Description**: Retrieves all events for the authenticated user.

- **Create an Event**
  - **Endpoint**: `POST /api/events`
  - **Description**: Creates a new event.
  - **Body Parameters**:
    - `date` (ISO date string, required)
    - `title` (string, required)
    - `description` (string, optional)
    - `time` (string, optional)

- **Update an Event**
  - **Endpoint**: `PUT /api/events/:id`
  - **Description**: Updates an existing event.
  - **Body Parameters**:
    - `title` (string, optional)
    - `description` (string, optional)
    - `time` (string, optional)

- **Delete an Event**
  - **Endpoint**: `DELETE /api/events/:id`
  - **Description**: Deletes an event.

---

## Deployment

Deploying the **Eat-Pray-Love** application involves setting up both the frontend and backend on a hosting platform. Below are the steps to deploy using **Heroku** as an example.

### Prerequisites

- **Heroku Account**: Sign up for a free account at [Heroku](https://www.heroku.com/).
- **Heroku CLI**: Install the Heroku CLI from [here](https://devcenter.heroku.com/articles/heroku-cli).
- **Git**: Ensure Git is installed and your project is version-controlled.

### Steps to Deploy

1. **Login to Heroku**:

   ```bash
   heroku login
   ```

2. **Create a New Heroku App**:

   ```bash
   heroku create eat-pray-love-app
   ```

3. **Set Environment Variables on Heroku**:

   ```bash
   heroku config:set MONGO_URI=your_mongodb_connection_string
   heroku config:set JWT_SECRET=your_jwt_secret_key
   heroku config:set NODE_ENV=production
   ```

4. **Deploy the Application**:

   - **Push to Heroku**:

     ```bash
     git push heroku main
     ```

   - **Ensure the `heroku-postbuild` Script is Defined**:

     The root `package.json` includes a `heroku-postbuild` script to build the frontend after deployment.

5. **Open the Deployed App**:

   ```bash
   heroku open
   ```

### Notes

- **Serving Frontend from Backend**: For production, it's recommended to serve the React frontend from the Express backend to simplify deployment and avoid CORS issues.
- **Static Files**: Ensure that the backend is configured to serve static files from the frontend build directory.

---

## Testing

Ensuring the reliability and robustness of the **Eat-Pray-Love** application is crucial. Below are guidelines and tools used for testing both frontend and backend components.

### Frontend Testing

- **Tools Used**:
  - **Jest**: JavaScript testing framework.
  - **React Testing Library**: For testing React components in a user-centric manner.

- **Running Tests**:

  ```bash
  cd frontend
  npm test
  ```

- **Writing Tests**:
  - Create test files alongside your components, e.g., `Home.test.js`.
  - Use `describe`, `it`, and `expect` for structuring your tests.

### Backend Testing

- **Tools Used**:
  - **Jest**: Also used for backend testing.
  - **Supertest**: For testing HTTP endpoints.
  - **Mocha & Chai**: Alternative testing frameworks (optional).

- **Running Tests**:

  ```bash
  cd backend
  npm test
  ```

- **Writing Tests**:
  - Create a `tests` directory inside `backend/src/`.
  - Write test cases for controllers, models, and routes.

### Continuous Integration

Consider integrating Continuous Integration (CI) tools like **GitHub Actions** or **Travis CI** to automate testing on every push or pull request.

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### Steps to Contribute

1. **Fork the Repository**:

   Click on the **Fork** button at the top-right corner of the repository page.

2. **Clone Your Fork**:

   ```bash
   git clone https://github.com/yourusername/eat-pray-love.git
   ```

3. **Navigate to the Project Directory**:

   ```bash
   cd eat-pray-love
   ```

4. **Create a New Branch**:

   ```bash
   git checkout -b feature/YourFeatureName
   ```

5. **Make Your Changes**:

   Implement your feature or bug fix.

6. **Commit Your Changes**:

   ```bash
   git commit -m "Add your detailed commit message"
   ```

7. **Push to Your Fork**:

   ```bash
   git push origin feature/YourFeatureName
   ```

8. **Create a Pull Request**:

   Navigate to the original repository and click on **Compare & pull request**. Provide a detailed description of your changes.

### Code of Conduct

Please adhere to the [Code of Conduct](CODE_OF_CONDUCT.md) in all your interactions with the project.

---

## License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## Contact

**Your Name** - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/eat-pray-love](https://github.com/yourusername/eat-pray-love)

---

## Acknowledgements

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [Semantic UI React](https://react.semantic-ui.com/)
- [Axios](https://axios-http.com/)
- [React Calendar](https://github.com/wojtekmaj/react-calendar)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction)
- [Concurrently](https://github.com/open-cli-tools/concurrently)
- [Create React App](https://create-react-app.dev/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)
- [Heroku](https://www.heroku.com/)
- [GitHub](https://github.com/)

---

Feel free to reach out if you have any questions or need further assistance. Happy Coding! 🚀