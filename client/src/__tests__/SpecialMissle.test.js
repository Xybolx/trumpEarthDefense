import React from 'react';
import ReactDOM from 'react-dom';
import SpecialMissile from '../components/specialMissile';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SpecialMissile />, div);
  ReactDOM.unmountComponentAtNode(div);
});
