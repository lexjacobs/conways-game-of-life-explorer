/* global test expect */
import {
  boardState
} from './boardState';
import {InitializeCell, populateBoard} from '../helpers/boardMethods'
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
  expect(state.board).toEqual([new InitializeCell(3), new InitializeCell(2), new InitializeCell(1)]);
  action = {
    type: constants.SET_BOARD,
    board: [4, 5, 6]
  };
  state = boardState(state, action);
  expect(state.board).toEqual([new InitializeCell(4), new InitializeCell(5), new InitializeCell(6)]);
  expect(state.previousBoards).toEqual([]);
});

test('validates that boards can be put into previousBoards state, but only unique boards', () => {
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
    [1, 2, 3]
  ]);
});

test('validates that boards can be iterated', () => {
  var state = {
    board: populateBoard([0,1]),
    width: 3,
    under: 2,
    over: 3,
    lazarus: 3
  };
  expect(state.board).toEqual(populateBoard([0,1]));
  state = boardState(state, {type: 'ITERATE_BOARD'});
  expect(state.board).toEqual(      [{previousValue: 0, value: 1}, {previousValue: 1, value: 1}]);
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
  expect(state).toEqual( {'board': [{'previousValue': null, 'value': 0}, {'previousValue': null, 'value': 0}, {'previousValue': null, 'value': 0}, {'previousValue': null, 'value': 0}, {'previousValue': null, 'value': 0}, {'previousValue': null, 'value': 0}], 'height': 2, 'mickeyMouse': 39, 'width': 3});
});
