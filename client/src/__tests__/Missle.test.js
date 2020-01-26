import React from 'react';
import ReactDOM from 'react-dom';
import Missile from '../components/missile';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Missile />, div);
  ReactDOM.unmountComponentAtNode(div);
});
