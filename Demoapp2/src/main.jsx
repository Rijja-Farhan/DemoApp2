
import App from './App.jsx';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './state/store'; // Import store only, no persistor



// index.js or App.js
import React from "react";
import ReactDOM from "react-dom";


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
