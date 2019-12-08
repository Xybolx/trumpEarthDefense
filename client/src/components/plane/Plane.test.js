import React from 'react';
import ReactDOM from 'react-dom';
import Plane from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Plane />, div);
  ReactDOM.unmountComponentAtNode(div);
});
