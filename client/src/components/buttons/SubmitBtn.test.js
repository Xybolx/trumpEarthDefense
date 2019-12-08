import React from 'react';
import ReactDOM from 'react-dom';
import SubmitBtn from './SubmitBtn';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SubmitBtn />, div);
  ReactDOM.unmountComponentAtNode(div);
});
