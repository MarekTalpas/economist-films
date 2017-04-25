// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/app/app';
import HomeContainer from './components/home-container/home-container';
import VideoPlayerContainer from './components/video-player-container/video-player-container';
import './index.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/home" component={HomeContainer} />
    <Route path="/watch/:id" component={VideoPlayerContainer} />
  </Router>
), document.getElementById('root'));
