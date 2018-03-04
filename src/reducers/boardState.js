import * as constants from '../constants/constants';
import {arrayFromWidthHeightWeight, iterateBoard} from '../helpers/boardMethods';
import {flipLivingDead, returnDead} from '../helpers/livingDeadDefinitions';

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
    let deadCell = returnDead();
    return {
      ...state,
      board: state.board.map(x => deadCell)
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
      throw new Error('NUDGE_BOARD threw rogue direction');
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

    // if new height is equivalent, noop
    if (action.height === state.height) {
      return state;
    }

    let oldBoard = state.board.slice();
    let newBoard;

    // if new height is greater, just add cells
    if (action.height > state.height) {
      let difference = action.height - state.height;
      let newCells = arrayFromWidthHeightWeight(state.width, difference, 0);
      newBoard = oldBoard.concat(newCells);
    }

    // if new height is less, slice off cells
    if (action.height < state.height) {
      oldBoard.length = (action.height * state.width);
      newBoard = oldBoard;
    }

    return {
      ...state,
      board: newBoard,
      height: action.height
    };

  }

  case constants.SET_WIDTH:{

    // if new width is equivalent, noop
    if (action.width === state.width) {
      return state;
    }

    let oldBoard = state.board.slice();
    let newBoard = [];

    // if new width is greater, add cells
    if (action.width > state.width) {

      // determine number of cells to add to every interval
      let difference = action.width - state.width;

      for(let i = 0; i < state.height; i++) {

        // splice off 1 row at a time and insert into newBoard
        let startIndex = i * state.width;
        let endIndex = startIndex + state.width;
        newBoard = newBoard.concat(oldBoard.slice(startIndex, endIndex));

        // create new cells to insert
        let newCells = arrayFromWidthHeightWeight(difference, 1, 0);

        newBoard = newBoard.concat(newCells);
      }

    }

    // if new width is less, trim cells from each row
    if (action.width < state.width) {

      for(let i = 0; i < state.height; i++) {

        // trim 1 row at a time and insert into newBoard
        let startIndex = i * state.width;
        let endIndex = startIndex + action.width;
        newBoard = newBoard.concat(oldBoard.slice(startIndex, endIndex));
      }

    }

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
