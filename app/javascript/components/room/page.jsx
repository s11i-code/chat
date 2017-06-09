import React from 'react';
import { getMessagesSource } from '../../data_sources';
import MessagePresenter from './message_presenter';

export default React.createClass({

  getInitialState() {
    console.log('TODO: add username to a better place than the url (in case user wants to send link to friend) or add proper signin');
    return { messages: [] };
  },

  componentWillMount() {
    /* global window*/
    // TODO: remove when react router added
    const roomId = window.location.href.split('/').slice(-1)[0].split('?')[0];
    const dataSource = getMessagesSource(roomId);
    const subscription = dataSource.subscribe(data => this.setState({ messages: data }));
    this.setState({ subscription });
  },

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
  },

  render() {
    console.log(this.state)
    return (
      <div className='room-page'>
        <ul className='messages-list'>
          { this.state.messages.map(msg => (
            <li key={msg.id}><MessagePresenter message={msg}>{ msg.user }</MessagePresenter></li>))}
        </ul>
      </div>
    );
  },
});
