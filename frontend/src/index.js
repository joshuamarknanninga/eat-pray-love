// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Create this file based on CRA's PWA setup
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorkerRegistration.register();
