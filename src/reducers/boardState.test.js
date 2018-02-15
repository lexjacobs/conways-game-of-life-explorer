/* global test expect */
import {
  boardState
} from './boardState';
import * as constants from '../constants/constants';

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

test('validates that boards can be put into previousBoards state', () => {
  var state = {
    board: [1, 2, 3],
    previousBoards: []
  };
  var action = {
    type: constants.SET_PREVIOUS_BOARD
  };
  expect(state.board).toEqual([1, 2, 3]);
  expect(state.previousBoards).toEqual([]);

  state = boardState(state, action);
  expect(state.previousBoards).toEqual([
    [1, 2, 3]
  ]);

  expect(state.board).toEqual([1, 2, 3]);
  action = {
    type: constants.SET_PREVIOUS_BOARD
  };
  state = boardState(state, action);
  expect(state.board).toEqual([1, 2, 3]);
  expect(state.previousBoards).toEqual([
    [1, 2, 3],
    [1, 2, 3]
  ]);
});

test('validates that boards can be iterated', () => {
  var state = {
    board: [0,0,1,0,0,0,0,0,0],
    width: 3,
    under: 2,
    over: 3,
    lazarus: 3
  };
  expect(state.board).toEqual([0,0,1,0,0,0,0,0,0]);
  state = boardState(state, {type: 'ITERATE_BOARD'});
  expect(state.board).toEqual([0,0,0,0,0,0,0,0,0]);
});
