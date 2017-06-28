import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/app_container';

/* global document */
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App history />,
    document.getElementById('react-handle').appendChild(document.createElement('div')),
  );
});
