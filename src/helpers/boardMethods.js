import {
  initializeArray,
  randomizeArray,
  wrapSide,
  wrapTopBottom
} from './arrayMethods';

/*
 returns the number of living (1) cells surrounding cell at index
 inputs:
  board: flat array board
  width: columns
  index: current cell of interest
 */
export function cellCount(board, width, index) {
  var total = 0;

  var indexLeft = wrapSide(index, -1, width);
  var indexRight = wrapSide(index, 1, width);

  // for each of the living surrounding cells, increment total
  [
    indexLeft, //left
    indexRight, //right
    // top left
    wrapTopBottom(indexLeft, -1, width, board.length),
    // top middle
    wrapTopBottom(index, -1, width, board.length),
    // top right
    wrapTopBottom(indexRight, -1, width, board.length),
    // bottom left
    wrapTopBottom(indexLeft, 1, width, board.length),
    // bottom middle
    wrapTopBottom(index, 1, width, board.length),
    // bottom right
    wrapTopBottom(indexRight, 1, width, board.length)

  ].forEach((position) => {
    var living = board[position];
    if (living) {
      total++;
    }
  });

  return total;
}

/* extract only the values from an array of complex cell objects */
export function extractValues(board) {
  return board.map(x => x.getValue());
}

/* create a board with complex cell objects from a simple integer array */
export function populateBoard(board) {
  return board.map(x => new InitializeCell(x));
}

/* return complex cell objects with new integer values (pure) */
export function updateCellValues(oldBoard, newValues) {
  if (oldBoard.length !== newValues.length) {
    throw new Error('Attempting to update oldBoard with new values of different length');
  }
  var updatedBoard = oldBoard.slice();
  newValues.forEach(function(value, i) {
    updatedBoard[i].setValue(value);
  });
  return updatedBoard;
}

/*
 create a board representation (just a flat array)
 inputs:
   width in columns
   height in rows
   randomness in whole number %
 */
export function initializeBoard(width, height, weight = 0) {
  var blankBoard = initializeArray(width * height);
  var randomArray = randomizeArray(blankBoard, weight);
  return randomArray;
}

/* Cells have the ability to store their own value, as well as keep a record of their last value. Getters and setters included */

export function InitializeCell(value = 0) {
  this.value = value;
  this.previousValue = null;
}

InitializeCell.prototype.getValue = function() {
  return this.value;
};

InitializeCell.prototype.getPreviousValue = function() {
  return this.previousValue;
};

InitializeCell.prototype.setValue = function(value) {
  this.previousValue = this.value;
  this.value = value;
};

/*
 Default rules:
 Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
 Any live cell with two or three live neighbours lives on to the next generation.
 Any live cell with more than three live neighbours dies, as if by overpopulation.
 Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */
export function iterateBoard(board, width, under = 2, over = 3, lazarus = 3) {
  return board.map((cell, i) => {
    let count = cellCount(board, width, i);

    // if cell is alive
    if (cell === 1) {

      // live cell over / underpopulation
      if (count < under || count > over) {
        return 0;
      }

      // otherwise it lives
      return cell;

    // cell is dead
    } else {
      if (count === lazarus) {
        return 1;
      }

      // otherwise it remains dead
      return cell;

    }

  });
}
