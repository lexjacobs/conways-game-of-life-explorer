/* global test expect */
import {
  boardState
} from './boardState';
import * as constants from '../constants/constants';
import * as actions from '../actions/actions';

test('validates that boards can be put into state', () => {
  var state = {
    board: [],
    previousBoards: []
  };
  var action = {
    type: constants.SET_BOARD,
    board: [3, 2, 1]
  };
  expect(state.board).toEqual([]);
  expect(state.previousBoards).toEqual([]);
  state = boardState(state, action);
  expect(state.previousBoards).toEqual([]);
  expect(state.board).toEqual([3, 2, 1]);
  action = {
    type: constants.SET_BOARD,
    board: [4, 5, 6]
  };
  state = boardState(state, action);
  expect(state.board).toEqual([4, 5, 6]);
  expect(state.previousBoards).toEqual([]);
});

test('validates that boards can be iterated', () => {
  var state = {
    board: [0,1],
    width: 3,
    under: 2,
    over: 3,
    lazarus: 3
  };
  expect(state.board).toEqual([0, 1]);
  state = boardState(state, {type: 'ITERATE_BOARD'});
  expect(state.board).toEqual([1, 1]);
  state = boardState(state, {type: 'ITERATE_BOARD'});
});

test('setHeight, setWidth will effectively change height / width', () => {
  var state = {
    width: 3,
    height: 3,
    mickeyMouse: 39
  };
  var action = actions.setHeight(2);
  state = boardState(state, action);
  expect(state).toEqual( {'board': [0, 0, 0, 0, 0, 0], 'height': 2, 'mickeyMouse': 39, 'width': 3});

  action = actions.setWidth(2);
  state = boardState(state, action);
  expect(state).toEqual( {'board': [0, 0, 0, 0], 'height': 2, 'mickeyMouse': 39, 'width': 2});
});

test('NUDGE_BOARD will effectively move the board around', () => {
  var state = {
    width: 3,
    board: [0,1,2,3,4,5,6,7,8]
  };
  var action = actions.nudgeBoard('up');
  state = boardState(state, action);
  expect(state).toEqual({
    width: 3,
    board: [3,4,5,6,7,8,0,1,2]
  });

  state = {
    width: 3,
    board: [0,1,2,3,4,5,6,7,8]
  };
  action = actions.nudgeBoard('down');
  state = boardState(state, action);
  expect(state).toEqual({
    width: 3,
    board: [6,7,8,0,1,2,3,4,5]
  });

  state = {
    width: 3,
    board: [0,1,2,3,4,5,6,7,8]
  };
  action = actions.nudgeBoard('right');
  state = boardState(state, action);
  expect(state).toEqual({
    width: 3,
    board: [2,0,1,5,3,4,8,6,7]
  });

  state = {
    width: 3,
    board: [0,1,2,3,4,5,6,7,8]
  };
  action = actions.nudgeBoard('left');
  state = boardState(state, action);
  expect(state).toEqual({
    width: 3,
    board: [1,2,0,4,5,3,7,8,6]
  });

  // testing noop
  state = {
    width: 3,
    board: [0,1,2,3,4,5,6,7,8]
  };
  action = actions.nudgeBoard('overThere');
  state = boardState(state, action);
  expect(state).toEqual({
    width: 3,
    board: [0,1,2,3,4,5,6,7,8]
  });
});

test('setRules will put rules in place', () => {
  var state = {
    under: 5,
    over: 10,
    lazarus: 33,
    somethingElse: 'biscuit'
  };
  var action = actions.setRules(1,2,3);
  state = boardState(state, action);
  expect(state).toEqual({
    under: 1,
    over: 2,
    lazarus: 3,
    somethingElse: 'biscuit'
  });
});

test('updateNumericalAttribute will do what it promises', () => {
  var state = {
    under: 5,
    over: 10,
    lazarus: 33,
    somethingElse: 18
  };
  var action = actions.updateNumericalAttribute('somethingElse', '35');
  state = boardState(state, action);
  expect(state).toEqual({
    under: 5,
    over: 10,
    lazarus: 33,
    somethingElse: 35
  });
});
