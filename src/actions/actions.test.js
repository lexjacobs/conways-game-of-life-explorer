/* global test expect */
import * as actions from './actions';

test('flipCell returns object as expected', () => {
  expect(actions.flipCell(42)).toEqual({
    type: 'FLIP_CELL',
    position: 42
  });
});

test('iterateBoard returns object as expected', () => {
  expect(actions.iterateBoard()).toEqual({
    type: 'ITERATE_BOARD'
  });
});

test('nudgeBoard returns object as expected', () => {
  expect(actions.nudgeBoard('haywire')).toEqual({
    type: 'NUDGE_BOARD',
    direction: 'haywire'
  });
});

test('setBoard returns object as expected', () => {
  expect(actions.setBoard([1,2,42])).toEqual({
    type: 'SET_BOARD',
    board: [1,2,42]
  });
});

test('setHeight returns object as expected', () => {
  expect(actions.setHeight(111)).toEqual({
    type: 'SET_HEIGHT',
    height: 111
  });
});

test('setWidth returns object as expected', () => {
  expect(actions.setWidth(456)).toEqual({
    type: 'SET_WIDTH',
    width: 456
  });
});

test('setDefaultRules returns object as expected', () => {
  expect(actions.setDefaultRules()).toEqual({
    type: 'SET_RULES',
    rules: {
      under: 2,
      over: 3,
      lazarus: 3
    }
  });
});

test('testing the setRules action', () => {
  var result = actions.setRules(2,3,3);
  expect(result).toEqual({
    type: 'SET_RULES',
    rules: {
      under: 2,
      over: 3,
      lazarus: 3
    }
  });
  result = actions.setRules(7,8,9);
  expect(result).toEqual({
    type: 'SET_RULES',
    rules: {
      under: 7,
      over: 8,
      lazarus: 9
    }
  });
});

test('updateNumericalAttribute returns object as expected', () => {
  expect(actions.updateNumericalAttribute('mergatroid', 1320)).toEqual({
    type: 'UPDATE_NUMERICAL_ATTRIBUTE',
    name: 'mergatroid',
    value: 1320
  });
});

test('setShouldIterate returns object as expected', () => {
  expect(actions.setShouldIterate('value')).toEqual({
    type: 'SET_SHOULD_ITERATE',
    value: 'value'
  });
});
