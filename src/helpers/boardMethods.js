import {
  initializeBlankArray,
  randomizeArray,
  wrapSide,
  wrapTopBottom
} from './arrayMethods';

import {isLiving, isDead, returnDead, returnLiving} from './livingDeadDefinitions';

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
    if (isLiving(currentState)) {
      total++;
    }
  });

  return total;
}

/*
 changeBoardHeight
 inputs:
  board: original board
  width: original board width
  newWidth: desired new width
 output: updated board
 */
export function changeBoardHeight(board, height, newHeight) {
  // if new height is equivalent, noop
  if (newHeight === height) {
    return board;
  }

  let oldBoard = board.slice();
  let newBoard;
  let width = board.length / height;

  // if new height is greater, just add cells
  if (newHeight > height) {
    let difference = newHeight - height;
    let newCells = arrayFromWidthHeightWeight(width, difference, 0);
    newBoard = oldBoard.concat(newCells);
  }

  // if new height is less, slice off cells
  if (newHeight < height) {
    oldBoard.length = (newHeight * width);
    newBoard = oldBoard;
  }
  return newBoard;
}

/*
 changeBoardWidth
 inputs:
  board: original board
  width: original board width
  newWidth: desired new width
 output: updated board
 */
export function changeBoardWidth(board, width, newWidth) {
  // if new width is equivalent, noop
  if (newWidth === width) {
    return board;
  }

  let oldBoard = board.slice();
  let newBoard = [];
  let height = board.length / width;

  // if new width is greater, add cells
  if (newWidth > width) {

    // determine number of cells to add to every interval
    let difference = newWidth - width;

    for(let i = 0; i < height; i++) {

      // splice off 1 row at a time and insert into newBoard
      let startIndex = i * width;
      let endIndex = startIndex + width;
      newBoard = newBoard.concat(oldBoard.slice(startIndex, endIndex));

      // create new cells to insert
      let newCells = arrayFromWidthHeightWeight(difference, 1, 0);

      newBoard = newBoard.concat(newCells);
    }

  }

  // if new width is less, trim cells from each row
  if (newWidth < width) {

    for(let i = 0; i < height; i++) {

      // trim 1 row at a time and insert into newBoard
      let startIndex = i * width;
      let endIndex = startIndex + newWidth;
      newBoard = newBoard.concat(oldBoard.slice(startIndex, endIndex));
    }

  }
  return newBoard;
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
  let deadCell = returnDead();
  let livingCell = returnLiving();

  for(var i = 0; i < board.length; i++) {
    let cell = board[i];
    let count = cellCount(board, width, i);

    // if cell is alive
    if (isLiving(cell)) {

      // live cell over / underpopulation
      if (count < under || count > over) {
        result.push(deadCell);
      } else {
        // otherwise it remains alive
        result.push(livingCell);
      }

    // cell is dead
    } else if (isDead(cell)) {
      if (count === lazarus) {
        result.push(livingCell);
      } else {
        // otherwise it remains dead
        result.push(deadCell);
      }

    } else {
      throw new Error('unhandled cell value passed into iterateBoard');
    }
  }
  return  result;
}

/*
 nudgeCells
 inputs:
   board: original board array
   width: board width
   direction: string, up/down/left/right
 output:
   nudged board
 */
export function nudgeCells(board, width, direction) {
  var updatedBoard;
  var little;
  var big;

  if (direction === 'up') {
    little = board.slice(0, width);
    big = board.slice(width);
    updatedBoard = big.concat(little);
  }
  if (direction === 'down') {
    little = board.slice(-width);
    big = board.slice(0, board.length - width);
    updatedBoard = little.concat(big);
  }
  if (direction === 'right') {

    let result = [];

    // little will be the result of every (index + 1) being equal to 'width'
    little = board.filter((x, i) => {
      return (i + 1) % width === 0;
    });

    // big will be equal to everything else
    big = board.filter((x, i) => {
      return (i + 1) % width !== 0;
    });

    // shuffle the 2 together
    big.forEach((x,i) => {
      if (i % (width - 1) === 0) {
        result.push(little.shift());
      }
      result.push(x);
    });

    updatedBoard = result;
  }
  if (direction === 'left') {
    let result = [];

    // little will be equal to every 'width' interval of the board
    little = board.filter((x, i) => {
      return i % width === 0;
    });

    // big will be equal to everything else
    big = board.filter((x, i) => {
      return i % width !== 0;
    });

    // shuffle the 2 together
    big.forEach((x,i) => {
      result.push(x);
      if ((i + 1) % (width - 1) === 0) {
        result.push(little.shift());
      }
    });

    updatedBoard = result;

  }

  // noop, just in case
  if (updatedBoard === undefined) {
    throw new Error('NUDGE_BOARD threw rogue direction: ' + direction);
  }
  return updatedBoard;
}
