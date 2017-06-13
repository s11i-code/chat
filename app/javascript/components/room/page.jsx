import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'react-mini-router';
import { Breadcrumb } from 'react-bootstrap';
import { getMessagesSource } from '../../data_sources';
import { setPageTitle } from '../../utils/dom';
import MessageForm from './message_form';
import MessagePresenter from './message_presenter';

export default React.createClass({

  propTypes: {
    roomId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    rooms: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })).isRequired,
  },

  getInitialState() {
    console.log('TODO: add signin?');

    return {
      messages: [],
    };
  },

  componentWillMount() {
    const { roomId } = this.props;
    const dataSource = getMessagesSource(roomId);
    const subscription = dataSource.subscribe(data => this.setState({ messages: data }));

    this.setState({ subscription, roomId });
  },

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
  },

  render() {
    console.log(this.state);
    const { messages } = this.state;
    const { username, rooms, roomId } = this.props;
    const roomName = rooms.filter(room => room.id.toString() === roomId)[0].name;
    setPageTitle(`Chat in ${roomName}`);

    return (
      <div className='room-page'>
        <Breadcrumb><a tabIndex={0} role='link' onClick={() => navigate('/')}>Back</a></Breadcrumb>
        <h1>Chat in {roomName}</h1>
        <ul className='messages-list'>
          { messages.map(msg => (
            <li key={msg.id}>
              <MessagePresenter username={username} message={msg} />
            </li>))}
        </ul>
        <MessageForm roomId={this.props.roomId} username={username} />
      </div>
    );
  },
});
