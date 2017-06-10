import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { getRoomsSource } from '../../data_sources';
import { getChatRoomUrl } from '../../utils/urls';

export default React.createClass({

  getInitialState() {
    return { rooms: [] };
  },

  componentWillMount() {
    /* global window, alert*/
    /* TODO: fix this when react router added */
    const roomId = window.location.href.split('/').slice(-1)[0];
    const dataSource = getRoomsSource(roomId);
    const subscription = dataSource.subscribe(data => this.setState({ rooms: data }));
    this.setState({ subscription });
  },

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
  },

  render() {
    const { rooms, selectedRoomId, username } = this.state;
    console.log('TODO: fix tab indexing');
    console.log(this.state);

    return (
      <div className='home-page'>
        <h1>Chat app</h1>
        <Row>
          <Col sm={4} smOffset={2}>
            <select
              defaultValue={selectedRoomId}
              onChange={event => this.selectRoom(event.target.value)}
              className='form-control input-lg'
              tabIndex={0}
            >
              <option value=''>Select a room</option>
              { rooms.map(room => (
                <option
                  value={room.id}
                  key={`room-${room.id}`}
                >{ room.name }
                </option>))}
            </select>
          </Col>
          <Col sm={3}>
            <input
              className='form-control input-lg'
              type='text'
              placeholder='username'
              tabIndex={-1}
              value={username}
              onChange={event => this.setUserName(event.target.value)}
            />
          </Col>
          <Col sm={1}>
            <button onClick={this.joinRoom} className='btn btn-lg' tabIndex={-2}>Join</button>
          </Col>
        </Row>
      </div>);
  },

  selectRoom(selectedRoomId) {
    this.setState({ selectedRoomId });
  },

  setUserName(username) {
    this.setState({ username });
  },

  joinRoom() {
    const { selectedRoomId, username } = this.state;

    if (selectedRoomId) {
      const usernameWithFallback = username || `Anonymous${_.random(1, 10000)}`;
      // TODO: remove when react router added
      window.location.replace(getChatRoomUrl(selectedRoomId, usernameWithFallback));
    } else {
      alert('Please select a chat room');
      console.log('TODO: Nicer notification than an alert ');
    }
  },
});
