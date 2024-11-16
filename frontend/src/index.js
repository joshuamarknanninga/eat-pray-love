// frontend/src/index.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'semantic-ui-css/semantic.min.css'; // Import Semantic UI CSS
import 'react-toastify/dist/ReactToastify.css'; // Import React Toastify CSS
import './assets/styles/main.scss'; // Import your custom styles
import * as serviceWorker from './serviceWorker';
import './index.css';

// import { ToastContainer } from 'react-toastify';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<App />);

// Register service worker for PWA
serviceWorker.register();
