import React from 'react';
import ReactDOM from 'react-dom';
import { Enemy2 } from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Enemy2 />, div);
  ReactDOM.render(<Enemy2 />, div);
  ReactDOM.unmountComponentAtNode(div);
});
