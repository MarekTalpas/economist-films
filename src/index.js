// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/app/app';
import About from './components/about/about';
import HomeContainer from './components/home-container/home-container';
import EpisodeDetail from './components/episode-detail/episode-detail';
import './index.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/home" component={HomeContainer} />
    <Route path="/about" component={About} />
    <Route path="/episode" component={EpisodeDetail} />
  </Router>
), document.getElementById('root'));
