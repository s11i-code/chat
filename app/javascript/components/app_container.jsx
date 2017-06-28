import React from 'react';
import createReactClass from 'create-react-class';
import { RouterMixin } from 'react-mini-router';
import HomePage from '../components/home/page';
import RoomPage from '../components/room/page';
import { getRoomsSource } from '../data_sources';
import {
  getUsername as getStoredUserName,
  storeUsername,
  storeLastVisitedRoomId,
  getLastVisitedRoomId,
} from '../utils/secondary_storage';

export default createReactClass({

  mixins: [RouterMixin],

  getInitialState() {
    return {
      rooms: [],
      username: getStoredUserName(),
    };
  },

  componentWillMount() {
    const roomsSubscription = getRoomsSource().subscribe(data => this.setState({ rooms: data }));
    this.setState({ roomsSubscription });
  },

  componentWillUnmount() {
    this.state.roomsSubscription.unsubscribe();
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
    const props = {
      username,
      roomId,
      rooms,
      onVisitWithoutUsername: this.handleUserNameSelect,
    };

    return <RoomPage {...props} />;
  },

  notFound() {
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
