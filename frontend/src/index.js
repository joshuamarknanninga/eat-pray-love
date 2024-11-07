// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css'; // Import Semantic UI CSS
import 'react-toastify/dist/ReactToastify.css'; // Import React Toastify CSS
import './assets/styles/main.scss'; // Import your custom styles

import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
