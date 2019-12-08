import React from 'react';
import ReactDOM from 'react-dom';
import Missle from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Missle />, div);
  ReactDOM.unmountComponentAtNode(div);
});
