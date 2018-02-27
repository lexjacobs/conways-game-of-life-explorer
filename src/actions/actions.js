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

export function setHeight(height) {
  return {
    type: constants.SET_HEIGHT,
    height
  };
}

export function setWidth(width) {
  return {
    type: constants.SET_WIDTH,
    width
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
