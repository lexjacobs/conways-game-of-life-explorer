import { initializeArray, randomizeArray, wraparound } from './arrayMethods';

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
