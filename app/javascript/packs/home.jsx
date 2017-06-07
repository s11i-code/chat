import React from 'react';
import ReactDOM from 'react-dom';
import Page from '../components/home/page';

/* global document */
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Page />,
    document.body.appendChild(document.createElement('div')),
  );
});
