import React from 'react';
import PropTypes from 'prop-types';
import { getMessagesSource } from '../../data_sources';
import MessageForm from './message_form';
import MessagePresenter from './message_presenter';

export default React.createClass({

  propTypes: {
    roomId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
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
    const { username } = this.props;

    return (
      <div className='room-page'>
        <ul className='messages-list'>
          { messages.map(msg => (
            <li key={msg.id}>
              <MessagePresenter username={username} message={msg}>{ msg.user }</MessagePresenter>
            </li>))}
        </ul>
        <MessageForm roomId={this.props.roomId} username={username} />
      </div>
    );
  },
});
