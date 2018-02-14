import { initializeArray, randomizeArray, wraparound } from './arrayMethods';

/*
 returns the number of living (1) cells surrounding cell at index
 inputs:
  board: flat array board
  width: columns
  index: current cell of interest
 */
export function cellCount(board, width, index) {
  var total = 0;

  // for each of the living surrounding cells, increment total
  [(index - width - 1), (index - width), (index - width + 1), (index - 1), (index + 1), (index + width - 1), (index + width), (index + width + 1)].forEach(position => {
    var living = board[wraparound(index, (position - index), board.length)];
    if(living) {
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
