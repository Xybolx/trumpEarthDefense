import React from 'react';
import ReactDOM from 'react-dom';
import CenteredColumn from '../components/centeredColumn';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CenteredColumn />, div);
  ReactDOM.unmountComponentAtNode(div);
});
