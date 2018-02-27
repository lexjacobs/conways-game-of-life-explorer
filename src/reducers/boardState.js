import * as constants from '../constants/constants';
import {extractValues, iterateBoard, populateBoard, updateCellValues} from '../helpers/boardMethods';

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

  case constants.ITERATE_BOARD: {
    const oldBoard = extractValues(state.board);
    const iteratedValues = iterateBoard(oldBoard, state.width, state.under, state.over, state.lazarus);
    const iteratedBoard = updateCellValues(state.board, iteratedValues);

    return {
      ...state,
      board: iteratedBoard
    };
  }

  case constants.SET_BOARD:

    // action.board should be a simple integer array
    return {
      ...state,
      board: populateBoard(action.board)
    };

  case constants.SET_HEIGHT:

    return {
      ...state,
      height: action.height
    };

  case constants.SET_WIDTH:

    return {
      ...state,
      width: action.width
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




  default:
    return state;

  }
}
