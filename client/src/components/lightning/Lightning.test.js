import React from 'react';
import ReactDOM from 'react-dom';
import Lightning from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Lightning />, div);
  ReactDOM.unmountComponentAtNode(div);
});
