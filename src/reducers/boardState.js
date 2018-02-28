import * as constants from '../constants/constants';
import {extractValues, initializeBoard, iterateBoard, populateBoard, updateCellValues} from '../helpers/boardMethods';

const defaultState = {
  previousBoards: [],
  board: [],
  chance: 50,
  width: 74,
  height: 32,
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

  case constants.NUDGE_BOARD:

    var updatedBoard;
    var little;
    var big;

    if (action.direction === 'up') {
      little = state.board.slice(0, state.width);
      big = state.board.slice(state.width);
      updatedBoard = big.concat(little);
    }
    if (action.direction === 'down') {
      little = state.board.slice(-state.width);
      big = state.board.slice(0, state.board.length - state.width);
      updatedBoard = little.concat(big);
    }
    if (action.direction === 'right') {

      let result = [];

      // little will be the result of every (index + 1) being equal to 'width'
      little = state.board.filter((x, i) => {
        return (i + 1) % state.width === 0;
      });

      // big will be equal to everything else
      big = state.board.filter((x, i) => {
        return (i + 1) % state.width !== 0;
      });

      // shuffle the 2 together
      big.forEach((x,i) => {
        if (i % (state.width - 1) === 0) {
          result.push(little.shift());
        }
        result.push(x);
      });

      updatedBoard = result;
    }
    if (action.direction === 'left') {
      let result = [];

      // little will be equal to every 'width' interval of the board
      little = state.board.filter((x, i) => {
        return i % state.width === 0;
      });

      // big will be equal to everything else
      big = state.board.filter((x, i) => {
        return i % state.width !== 0;
      });

      // shuffle the 2 together
      big.forEach((x,i) => {
        result.push(x);
        if ((i + 1) % (state.width - 1) === 0) {
          result.push(little.shift());
        }
      });

      updatedBoard = result;

    }

    // noop, just in case
    if (updatedBoard === undefined) {
      return state;
    }

    return {
      ...state,
      board: updatedBoard
    };

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
