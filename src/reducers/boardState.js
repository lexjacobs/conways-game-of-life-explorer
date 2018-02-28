import * as constants from '../constants/constants';
import {extractValues, initializeBoard, iterateBoard, populateBoard, updateCellValues} from '../helpers/boardMethods';

const defaultState = {
  previousBoards: [],
  board: [],
  chance: 50,
  width: 20,
  height: 20,
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

  case constants.SET_HEIGHT:{

    const newBoard = initializeBoard(state.width, action.height, state.chance);

    return {
      ...state,
      board: populateBoard(newBoard),
      height: action.height
    };

  }

  case constants.SET_WIDTH:{

    const newBoard = initializeBoard(action.width, state.height, state.chance);

    return {
      ...state,
      board: populateBoard(newBoard),
      width: action.width
    };

  }
  case constants.SET_DEFAULT_RULES:{
    return {
      ...state,
      over: 3,
      under: 2,
      lazarus: 3,

    };
  }

  case constants.SET_PREVIOUS_BOARD:

    // if the board is no longer evolving, stop pushing to history
    if(JSON.stringify(state.previousBoards.slice(-1)) === JSON.stringify([state.board])) {
      return state;
    }

    return {
      ...state,
      previousBoards: state.previousBoards.concat([state.board])
    };

  case constants.UPDATE_ATTRIBUTE:

    return {
      ...state,
      [action.name]: +action.value
    };

  default:
    return state;

  }
}
