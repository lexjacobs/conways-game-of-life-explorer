import * as constants from '../constants/constants';
import {iterateBoard} from '../boardMethods';

const defaultState = {
  previousBoards: [],
  board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  width: 3,
  under: 2,
  over: 3,
  lazarus: 3
};

export function boardState(state = defaultState, action) {
  switch (action.type) {

  case constants.SET_BOARD:

    return {
      ...state,
      board: action.board
    };

  case constants.SET_PREVIOUS_BOARD:
    return {
      ...state,
      previousBoards: state.previousBoards.concat([state.board])
    };

  case constants.ITERATE_BOARD:
    return {
      ...state,
      board: iterateBoard(state.board, state.width, state.under, state.over, state.lazarus)
    };

  default:
    return state;

  }
}
