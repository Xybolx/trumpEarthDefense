import React from 'react';
import ReactDOM from 'react-dom';
import { Enemy } from '../components/enemies';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Enemy />, div);
  ReactDOM.unmountComponentAtNode(div);
});
