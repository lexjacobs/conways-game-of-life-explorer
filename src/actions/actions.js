import * as constants from '../constants/constants';

export function iterateBoard() {
  return {
    type: constants.ITERATE_BOARD
  };
}

export function setBoard(board) {
  return {
    type: constants.SET_BOARD,
    board
  };
}

export function setPreviousBoard() {
  return {
    type: constants.SET_PREVIOUS_BOARD
  };
}

export function setRules(under, over, lazarus) {
  return {
    type: constants.SET_RULES,
    rules: {
      under,
      over,
      lazarus
    }
  };
}
