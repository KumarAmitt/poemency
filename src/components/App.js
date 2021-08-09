import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header/Header';
import Home from '../containers/Home/Home';
import PoetryDetails from '../containers/Details/PoetryDetails';
import Footer from './Footer/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/poetry/:author/:title" component={PoetryDetails} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
