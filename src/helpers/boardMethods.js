import {
  initializeBlankArray,
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
    var currentState = board[position];
    if (currentState === 1) {
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
export function arrayFromWidthHeightWeight(width, height, weight = 0) {
  var blankBoard = initializeBlankArray(width * height);
  var randomArray = randomizeArray(blankBoard, weight);
  return randomArray;
}

/*
 Default rules:
 Any live cell with fewer than 2 live neighbours dies, as if caused by underpopulation.
 Any live cell with 2 or 3 live neighbours lives on to the ext generation.
 Any live cell with more than 3 live neighbours dies, as if by overpopulation.
 Any dead cell with exactly 3 live neighbours becomes a live cell, as if by reproduction.
 */
export function iterateBoard(board, width, under = 2, over = 3, lazarus = 3) {

  let result = [];

  for(var i = 0; i < board.length; i++) {
    let cell = board[i];
    let count = cellCount(board, width, i);

    // if cell is alive
    if (cell === 1) {

      // live cell over / underpopulation
      if (count < under || count > over) {
        result.push(0);
      } else {
        // otherwise it remains alive
        result.push(1);
      }

    // cell is dead
    } else {
      if (count === lazarus) {
        result.push(1);
      } else {
        // otherwise it remains dead
        result.push(0);
      }

    }
  }

  return  result;

}
