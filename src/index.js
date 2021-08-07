import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureAppStore from './store/configureStore';
import App from './components/App';
import './stylesheets/index.css';

const store = configureAppStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
