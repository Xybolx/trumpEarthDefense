import React from 'react';
import { render, cleanup } from '@testing-library/react';
import useCounter from '../hooks/useCounter';
// import { act } from 'react-dom/test-utils';

const Counter = ({ children, ...rest }) => children(useCounter(rest));

function setup(props) {
  let returnVal;
render(<Counter>{val => {
  returnVal = val;
  return null;
}}</Counter>);
  return returnVal;
}

afterEach(cleanup);

test('useCounter', () => {
  const [value, setValue, increment1, increment100, increment400, decrement1, clear] = setup();
  console.log(value, setValue, increment1, increment100, increment400, decrement1, clear);
});