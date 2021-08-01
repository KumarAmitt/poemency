import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureAppStore from './store/configureStore';
import App from './components/App';
import './index.css';

const store = configureAppStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

//-------------------

// import configureAppStore from './store/configureStore';
// import { random20 } from './store/poetry';
//
// const store = configureAppStore();
//
// // store.dispatch(loadTitles())
// // store.dispatch(loadAuthors())
// store.dispatch(random20());
