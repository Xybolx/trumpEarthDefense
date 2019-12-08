import React from 'react';
import ReactDOM from 'react-dom';
import { Enemy4 } from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Enemy4 />, div);
  ReactDOM.unmountComponentAtNode(div);
});
