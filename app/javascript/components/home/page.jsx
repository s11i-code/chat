import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'react-mini-router';
import { Row, Col } from 'react-bootstrap';
import { getRoomUrl } from '../../utils/urls';

export default React.createClass({

  propTypes: {
    onSelectUsername: PropTypes.func.isRequired,
    preselectedRoomId: PropTypes.string,
    rooms: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })).isRequired,
  },

  getInitialState() {
    return {
      selectedRoomId: this.props.preselectedRoomId,
    };
  },

  render() {
    const { onSelectUsername, username, rooms } = this.props;
    const { selectedRoomId } = this.state;
    console.log('TODO: fix tab indexing');
    console.log(this.state);

    return (
      <div className='home-page'>
        <h1>Chat app</h1>
        <Row>
          <Col sm={4} smOffset={2}>
            <select
              defaultValue={selectedRoomId || ''}
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
              value={username || ''}
              onChange={event => onSelectUsername(event.target.value)}
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

  joinRoom() {
    const { selectedRoomId } = this.state;

    if (selectedRoomId) {
      navigate(getRoomUrl(selectedRoomId));
    } else {
      alert('Please select a chat room');
      console.log('TODO: Nicer notification than an alert ');
    }
  },
});
