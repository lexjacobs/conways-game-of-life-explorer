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

/*
 create a board representation (just a flat array)
 inputs:
   width in columns
   height in rows
   randomness in whole number %
 */
export function createBoard(width, height, weight = 0) {
  var blankBoard = initializeArray(width * height);
  return randomizeArray(blankBoard, weight)
}
