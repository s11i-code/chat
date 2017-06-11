import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import { RouterMixin } from 'react-mini-router';
import _ from 'lodash';
import HomePage from '../components/home/page';
import RoomPage from '../components/room/page';

const App = createReactClass({

  mixins: [RouterMixin],

  routes: {
    '/': 'home',
    '/rooms/:roomId': 'room',
  },

  storeUserName(username) {
    this.setState({ username });
  },

  home() {
    return <HomePage storeUserName={this.storeUserName} username={this.state.username} />;
  },

  room(roomId) {
      // generating username when user doesn't not start from home page (e. g. they're sent a link)
      // TODO: maybe open up a form instead
    const username = this.state.username || `Anonymous${_.random(1, 10000)}`;
    return <RoomPage roomId={roomId} username={username} />;
  },

  notFound(path) {
    return <div className='not-found'>Page Not Found: {path}</div>;
  },

  render() {
    return this.renderCurrentRoute();
  },

});
/* global document */
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App history />,
    document.getElementById('react-handle').appendChild(document.createElement('div')),
  );
});
