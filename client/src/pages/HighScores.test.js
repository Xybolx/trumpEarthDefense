import React from 'react';
import ReactDOM from 'react-dom';
import HighScores from './HighScores';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HighScores />, div);
  ReactDOM.unmountComponentAtNode(div);
});