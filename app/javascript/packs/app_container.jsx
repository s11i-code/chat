import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import { RouterMixin } from 'react-mini-router';
import _ from 'lodash';
import HomePage from '../components/home/page';
import RoomPage from '../components/room/page';
import { getRoomsSource } from '../data_sources';


const App = createReactClass({

  mixins: [RouterMixin],

  getInitialState() {
    return { rooms: [] };
  },

  componentWillMount() {
    const dataSource = getRoomsSource();
    const subscription = dataSource.subscribe(data => this.setState({ rooms: data }));
    this.setState({ subscription });
  },

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
  },

  routes: {
    '/': 'home',
    '/rooms/:roomId': 'room',
  },

  storeUserName(username) {
    this.setState({ username });
  },

  home() {
    const { rooms, username } = this.state;

    return <HomePage rooms={rooms} storeUserName={this.storeUserName} username={username} />;
  },

  room(roomId) {
      // generating username when user doesn't not start from home page (e. g. they're sent a link)
      // TODO: maybe open up a form instead
    const { rooms } = this.state;
    const username = this.state.username || `Anonymous${_.random(1, 10000)}`;
    const props = { username, roomId, rooms };

    return <RoomPage {...props} />;
  },

  notFound(path) {
    return <div className='not-found'>Page Not Found: {path}</div>;
  },

  render() {
    const { rooms } = this.state;

    if (rooms && rooms.length) {
      return this.renderCurrentRoute();
    }
    return <div />;
  },

});
/* global document */
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App history />,
    document.getElementById('react-handle').appendChild(document.createElement('div')),
  );
});
