import * as constants from '../constants/constants';

export function clearBoard() {
  return {
    type: constants.CLEAR_BOARD
  };
}

export function flipCell(position) {
  return {
    type: constants.FLIP_CELL,
    position
  };
}

export function setShouldIterate(value) {
  return {
    type: constants.SET_SHOULD_ITERATE,
    value
  };
}

export function iterateBoard() {
  return {
    type: constants.ITERATE_BOARD
  };
}

export function nudgeBoard(direction) {
  return {
    type: constants.NUDGE_BOARD,
    direction
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

export function setDefaultRules() {
  // default rules: 2, 3, 3
  return setRules.call(null, 2, 3, 3);
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

export function updateNumericalAttribute(name, value) {
  return {
    type: constants.UPDATE_NUMERICAL_ATTRIBUTE,
    name,
    value
  };
}
