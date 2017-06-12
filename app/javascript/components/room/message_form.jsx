import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'react-mini-router';
import { FormGroup } from 'react-bootstrap';
import { createMessage } from '../../forms';

export default React.createClass({

  propTypes: {
    roomId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  },

  getInitialState() {
    return {};
  },

  componentWillUnmount() {
    if (this.state.subscription) {
      this.state.subscription.unsubscribe();
    }
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <textarea
            className='form-control input-lg'
            onChange={event => this.setState({ content: event.target.value })}
            placeholder='Type your message here'
            required
            value={this.state.content}
          />
        </FormGroup>
        <p className='posting-as'>Posting as {this.props.username}. <a tabIndex={-1} role='link' onClick={() => navigate('/')}>Not you? </a></p>.
        <input type='submit' className='btn pull-right' value='Post message' />
      </form>
    );
  },

  handleSubmit(event) {
    event.preventDefault();
    const { content } = this.state;
    const { roomId, username } = this.props;

    if (content && content.trim().length > 0) {
      const dataSource = createMessage(roomId, content, username);
      const subscription = dataSource.subscribe(data => console.log('TODO: handle errors and saving better'));

      this.setState({ content: '', subscription });
    }
  },


});
