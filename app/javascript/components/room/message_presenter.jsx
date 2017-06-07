import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default React.createClass({

  propTypes: {
    message: PropTypes.shape({
      name: PropTypes.string,
      content: PropTypes.string,
      created_at: PropTypes.string,
    }).isRequired,
  },

  render() {
    const { message } = this.props;
    const time = moment(message.created_at).fromNow('s');

    return (
      <div className='message'>
        <div className='content'>{ message.content }</div>
        <div className='metadata'> By { message.user } { time } ago</div>
      </div>
    );
  },
});
