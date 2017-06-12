import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import { RouterMixin } from 'react-mini-router';
import _ from 'lodash';
import HomePage from '../components/home/page';
import RoomPage from '../components/room/page';
import { getRoomsSource } from '../data_sources';
import {
  getUsername as getStoredUserName,
  storeUsername,
  storeLastVisitedRoomId,
  getLastVisitedRoomId,
} from '../utils/secondary_storage';

const App = createReactClass({

  mixins: [RouterMixin],

  getInitialState() {
    return {
      rooms: [],
      username: getStoredUserName(),
    };
  },

  componentWillMount() {
    const dataSource = getRoomsSource();
    const subscription = dataSource.subscribe(data => this.setState({ rooms: data }));
    this.setState({ subscription });

    const { username } = this.state;
    if (!username) {
      this.handleUserNameSelect(`Anonymous${_.random(1, 10000)}`);
    }
  },

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
  },

  handleUserNameSelect(username) {
    this.setState({ username });
    storeUsername(username);
  },

  routes: {
    '/rooms/:roomId': 'room',
  },

  room(roomId) {
    storeLastVisitedRoomId(roomId);
    const { username, rooms } = this.state;
    const props = { username, roomId, rooms };

    return <RoomPage {...props} />;
  },

  notFound(path) {
    const preselectedRoomId = getLastVisitedRoomId();
    const { rooms, username } = this.state;
    const props = {
      rooms,
      username,
      preselectedRoomId,
      onSelectUsername: this.handleUserNameSelect,
    };

    return <HomePage {...props} />;
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
