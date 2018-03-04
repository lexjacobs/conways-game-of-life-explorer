/* global test expect */
import {
  boardState
} from './boardState';
import * as constants from '../constants/constants';
import * as actions from '../actions/actions';

test('validates FLIP_CELL can change the value of a single cell', () => {
  var state = {
    board: [],
  };
  var action = {
    type: constants.FLIP_CELL,
    position: 0
  };
  expect(() => state = boardState(state, action)).toThrow('trying to flip nonexistent cell');
  state = {
    board: [0],
  };
  action = {
    type: constants.FLIP_CELL,
    position: 1
  };
  expect(() => state = boardState(state, action)).toThrow('trying to flip nonexistent cell');
  state = {
    board: [0],
  };
  action = {
    type: constants.FLIP_CELL,
    position: 0
  };
  state = boardState(state, action);
  expect(state.board).toEqual([1]);
  state = {
    board: [1],
  };
  action = {
    type: constants.FLIP_CELL,
    position: 0
  };
  state = boardState(state, action);
  expect(state.board).toEqual([0]);
  state = {
    // don't actually put a 9 in there, just making sure it is left alone
    board: [1,0,9],
  };
  action = {
    type: constants.FLIP_CELL,
    position: 1
  };
  state = boardState(state, action);
  expect(state.board).toEqual([1,1,9]);
  state = {
    // don't actually put a 9 in there, just making sure it is left alone
    board: [1,0,9],
  };
  action = {
    type: constants.FLIP_CELL,
    position: 0
  };
  state = boardState(state, action);
  expect(state.board).toEqual([0,0,9]);
});


test('validates that boards can be put into state', () => {
  var state = {
    board: [],
  };
  var action = {
    type: constants.SET_BOARD,
    board: [3, 2, 1]
  };
  expect(state.board).toEqual([]);
  state = boardState(state, action);
  expect(state.board).toEqual([3, 2, 1]);
  action = {
    type: constants.SET_BOARD,
    board: [4, 5, 6]
  };
  state = boardState(state, action);
  expect(state.board).toEqual([4, 5, 6]);
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

test('setHeight will effectively change height', () => {
  var state = {
    width: 3,
    height: 3,
    board: [0,1,1,0,0,1,0,1,0]
  };
  var action = actions.setHeight(3);
  state = boardState(state, action);
  expect(state).toEqual( {'board': [0,1,1,0,0,1,0,1,0], 'height': 3, 'width': 3});
  action = actions.setHeight(2);
  state = boardState(state, action);
  expect(state).toEqual( {'board': [0,1,1,0,0,1], 'height': 2, 'width': 3});
  action = actions.setHeight(4);
  state = boardState(state, action);
  expect(state).toEqual( {'board': [0,1,1,0,0,1,0,0,0,0,0,0], 'height': 4, 'width': 3});
});

test('setWidth will effectively change width', () => {
  var state = {
    width: 3,
    height: 3,
    board: [0,1,1,0,0,1,1,0,0]
  };
  var action = actions.setWidth(3);
  state = boardState(state, action);
  expect(state).toEqual( {'board': [0,1,1,0,0,1,1,0,0], 'height': 3, 'width': 3});
  action = actions.setWidth(2);
  state = boardState(state, action);
  expect(state).toEqual( {'board': [0,1,0,0,1,0], 'height': 3, 'width': 2});
  action = actions.setWidth(4);
  state = boardState(state, action);
  expect(state).toEqual( {'board': [0,1,0,0,0,0,0,0,1,0,0,0], 'height': 3, 'width': 4});
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

  // testing rogue direction should throw
  state = {
    width: 3,
    board: [0,1,2,3,4,5,6,7,8]
  };
  action = actions.nudgeBoard('overThere');
  expect(() => boardState(state, action)).toThrow();
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

test('validates CLEAR_BOARD returns an array of all zeros', () => {
  var state = {
    board: [1,0,1,0,0,1,0]
  };
  var action = actions.clearBoard();
  state = boardState(state, action);
  expect(state).toEqual({
    board: [0,0,0,0,0,0,0]
  });
});

test('validates SET_SHOULD_ITERATE sets the proper value', () => {
  var state = {
    gonzo: 'clownSchool',
    shouldIterate: true
  };
  var action = actions.setShouldIterate(false);
  state = boardState(state, action);
  expect(state).toEqual({
    gonzo: 'clownSchool',
    shouldIterate: false
  });
  action = actions.setShouldIterate(true);
  state = boardState(state, action);
  expect(state).toEqual({
    gonzo: 'clownSchool',
    shouldIterate: true
  });
  action = actions.setShouldIterate(!state.shouldIterate);
  state = boardState(state, action);
  expect(state).toEqual({
    gonzo: 'clownSchool',
    shouldIterate: false
  });
});
