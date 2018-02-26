import * as constants from '../constants/constants';
import {iterateBoard} from '../helpers/boardMethods';

const defaultState = {
  previousBoards: [],
  board: [],
  width: 8,
  height: 8,
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

    // if the board is no longer evolving, stop pushing to history
    if(JSON.stringify(state.previousBoards.slice(-1)) === JSON.stringify([state.board])) {
      return state;
    }

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
