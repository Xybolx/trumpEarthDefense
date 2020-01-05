import React from 'react';
import ReactDOM from 'react-dom';
import SpecialMissle from '../components/specialMissle';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SpecialMissle />, div);
  ReactDOM.unmountComponentAtNode(div);
});
