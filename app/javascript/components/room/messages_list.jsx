import React from 'react';
import PropTypes from 'prop-types';
import MessagePresenter from './message_presenter';

export default React.createClass({

  propTypes: {
    username: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
      user: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })),
  },

  render() {
    const { username, messages } = this.props;

    if (!messages) {
      return <div className='text-center'><i className='fa fa-spinner spin' /> </div>;
    } else if (messages.length === 0) {
      return (
        <p className='no-messages'>
          There are no messages yet. Be the first and say something.
        </p>);
    }
    return (
      <ul className='messages-list'>
        { messages.map(msg => (
          <li key={msg.id}>
            <MessagePresenter username={username} message={msg} />
          </li>))}
      </ul>
    );
  },
});
