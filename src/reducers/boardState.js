import * as constants from '../constants/constants';
import {changeBoardHeight, changeBoardWidth, iterateBoard, nudgeCells} from '../helpers/boardMethods';
import {flipLivingDead, returnDead} from '../helpers/livingDeadDefinitions';

const defaultState = {
  board: [],
  chance: 15,
  height: 99,
  lazarus: 3,
  over: 3,
  previousBoards: [],
  shouldIterate: true,
  under: 2,
  width: 99
};

export function boardState(state = defaultState, action) {
  switch (action.type) {

  case constants.CLEAR_BOARD: {
    let deadCell = returnDead();
    return {
      ...state,
      board: state.board.map(x => {
        x;
        return deadCell;
      })
    };
  }

  case constants.FLIP_CELL: {
    let len = state.board.length;
    let position = parseInt(action.position, 10);

    // if len is 0, or position >= len, throw range error
    if (len === 0 || position >= len) {
      throw new RangeError('trying to flip nonexistent cell');
    }

    let newBoard = state.board.slice();
    let oldValue = newBoard[position];
    let newValue = flipLivingDead(oldValue);
    newBoard[position] = newValue;

    return {
      ...state,
      board: newBoard
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
    return {
      ...state,
      board: nudgeCells(state.board, state.width, action.direction)
    };

  case constants.SET_BOARD:

    // action.board should be a simple integer array
    return {
      ...state,
      board: action.board
    };

  case constants.SET_HEIGHT:{
    return {
      ...state,
      board: changeBoardHeight(state.board, state.height, action.height),
      height: action.height
    };
  }

  case constants.SET_WIDTH:{
    return {
      ...state,
      board: changeBoardWidth(state.board, state.width, action.width),
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
