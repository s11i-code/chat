import React from 'react';
import { getMessagesSource } from '../../data_sources';
import MessagePresenter from './message_presenter';

export default React.createClass({

  getInitialState() {
    return { messages: [] };
  },

  componentWillMount() {
    /* global window*/
    const roomId = window.location.href.split('/').slice(-1)[0];

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
      <div>
        <ul className='messages-list'>
          { this.state.messages.map(msg => (
            <li key={msg.id}><MessagePresenter message={msg}>{ msg.user }</MessagePresenter></li>))}
        </ul>
      </div>
    );
  },
});
