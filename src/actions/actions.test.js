/* global test expect */
import * as methods from './actions';

test('testing the setRules action', () => {
  var result = methods.setRules(2,3,3);
  expect(result).toEqual({
    type: 'SET_RULES',
    rules: {
      under: 2,
      over: 3,
      lazarus: 3
    }
  });
  result = methods.setRules(7,8,9);
  expect(result).toEqual({
    type: 'SET_RULES',
    rules: {
      under: 7,
      over: 8,
      lazarus: 9
    }
  });
});
