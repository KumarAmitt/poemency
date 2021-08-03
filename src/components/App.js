import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import PoetryDetails from './PoetryDetails';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/poetry/:author/:title" component={PoetryDetails} exact />
      </Switch>
    </Router>
  );
}

export default App;
