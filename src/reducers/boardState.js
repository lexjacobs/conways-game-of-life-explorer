import * as constants from '../constants/constants';
import {arrayFromWidthHeightWeight, iterateBoard} from '../helpers/boardMethods';

const defaultState = {
  board: [],
  chance: 50,
  height: 32,
  lazarus: 3,
  over: 3,
  previousBoards: [],
  shouldIterate: true,
  under: 2,
  width: 74
};

export function boardState(state = defaultState, action) {
  switch (action.type) {

  case constants.CLEAR_BOARD: {

    return {
      ...state,
      board: state.board.map(x => 0)
    };
  }

  case constants.FLIP_CELL: {

    return {
      ...state,
      board: state.board.map((x, i) => {
        if (i === +action.position) {
          return Math.abs(x - 1);
        } else {
          return x;
        }
      })
    };
  }

  case constants.SET_SHOULD_ITERATE: {

    return {
      ...state,
      shouldIterate: action.value
    };
  }

  case constants.ITERATE_BOARD: {

    return {
      ...state,
      board: iterateBoard(state.board, state.width, state.under, state.over, state.lazarus)
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
      board: action.board
    };

  case constants.SET_HEIGHT:{

    const newBoard = arrayFromWidthHeightWeight(state.width, action.height, state.chance);

    return {
      ...state,
      board: newBoard,
      height: action.height
    };

  }

  case constants.SET_WIDTH:{

    const newBoard = arrayFromWidthHeightWeight(action.width, state.height, state.chance);

    return {
      ...state,
      board: newBoard,
      width: action.width
    };

  }
  case constants.SET_RULES:{
    return {
      ...state,
      under: action.rules.under,
      over: action.rules.over,
      lazarus: action.rules.lazarus,

    };
  }

  case constants.UPDATE_NUMERICAL_ATTRIBUTE:

    return {
      ...state,
      [action.name]: +action.value
    };

  default:
    return state;

  }
}
