import React from 'react';
import ReactDOM from 'react-dom';
import Initials from '../pages/initials';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Initials />, div);
  ReactDOM.unmountComponentAtNode(div);
});