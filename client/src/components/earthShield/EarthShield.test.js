import React from 'react';
import ReactDOM from 'react-dom';
import EarthShield from './EarthShield';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EarthShield />, div);
  ReactDOM.unmountComponentAtNode(div);
});
